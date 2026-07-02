import { execSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const landingRoot = resolve(scriptDir, "..");
const mainSiteRoot = resolve(landingRoot, "../cyberlabs-india-mainwebsite-latest");
const generatedDir = join(landingRoot, "src/data/generated");
const publicAssetsDir = join(landingRoot, "public/synced-from-main-site");
const generatedCatalogFile = join(generatedDir, "main-website-catalog.ts");
const generatedWebinarFile = join(generatedDir, "webinar-schedule.ts");

function ensureMainSiteRepo() {
  if (!existsSync(mainSiteRoot)) {
    if (existsSync(generatedCatalogFile) && existsSync(generatedWebinarFile)) {
      console.warn(
        `Main website repo not found at ${mainSiteRoot}. Using existing generated catalog.`,
      );
      return false;
    }

    throw new Error(
      `Main website repo not found at ${mainSiteRoot}. Keep cyberlabs-india-mainwebsite-latest as a sibling folder, or commit src/data/generated files first.`,
    );
  }

  return true;
}

function bundleMainSiteEntry(entryFileName, buildEntrySource) {
  const tempDir = mkdtempSync(join(landingRoot, ".catalog-sync-"));
  const entryPath = join(tempDir, entryFileName);
  const entrySource = buildEntrySource((relativeMainSiteModulePath) =>
    relative(tempDir, join(mainSiteRoot, relativeMainSiteModulePath)).replace(/\\/g, "/"),
  );

  writeFileSync(entryPath, entrySource, "utf8");

  const outfile = join(tempDir, "bundle.mjs");
  const mainSiteAlias = join(mainSiteRoot, "src").replace(/\\/g, "/");

  execSync(
    [
      "npx",
      "esbuild",
      JSON.stringify(entryPath),
      "--bundle",
      "--format=esm",
      "--platform=node",
      `--alias:@=${mainSiteAlias}`,
      "--loader:.webp=file",
      "--loader:.svg=file",
      "--loader:.png=file",
      "--loader:.jpg=file",
      "--loader:.jpeg=file",
      `--outfile=${JSON.stringify(outfile)}`,
    ].join(" "),
    { cwd: landingRoot, stdio: "pipe" },
  );

  return { tempDir, outfile };
}

function bundleMainSiteModule(relativeMainSiteModulePath, entryFileName) {
  return bundleMainSiteEntry(entryFileName, (resolveMainSiteModulePath) => {
    const mainSiteModulePath = resolveMainSiteModulePath(relativeMainSiteModulePath);

    if (relativeMainSiteModulePath.endsWith("bootcampData.ts")) {
      return `export { bootcamps } from "${mainSiteModulePath}";`;
    }

    return `import { courses } from "${mainSiteModulePath}";
export const programImages = courses.map((course) => ({
  slug: course.slug,
  image: course.image,
}));`;
  });
}

async function loadBundledModule(outfile) {
  const moduleUrl = new URL(`file:///${outfile.replace(/\\/g, "/")}`).href;
  return import(moduleUrl);
}

function copyBundledAsset(assetPath, bundleOutfile, destinationDir, preferredName) {
  const bundleDir = dirname(bundleOutfile);
  const sourcePath = resolve(bundleDir, assetPath);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing synced asset: ${sourcePath}`);
  }

  mkdirSync(destinationDir, { recursive: true });
  const destinationPath = join(destinationDir, preferredName);
  copyFileSync(sourcePath, destinationPath);
  return `/synced-from-main-site/${relative(publicAssetsDir, destinationPath).replace(/\\/g, "/")}`;
}

function syncIllustrations() {
  const illustrations = [
    {
      source: join(
        mainSiteRoot,
        "src/assets/img/ProgramPageImage/elitbootcamp.svg",
      ),
      target: join(publicAssetsDir, "illustrations/elitbootcamp.svg"),
      exportName: "eliteBootcampIllustration",
    },
    {
      source: join(
        mainSiteRoot,
        "src/assets/img/ProgramPageImage/flagshipProgram.svg",
      ),
      target: join(publicAssetsDir, "illustrations/flagshipProgram.svg"),
      exportName: "flagshipProgramIllustration",
    },
  ];

  const paths = {};

  for (const illustration of illustrations) {
    mkdirSync(dirname(illustration.target), { recursive: true });
    copyFileSync(illustration.source, illustration.target);
    paths[illustration.exportName] =
      `/synced-from-main-site/illustrations/${basename(illustration.target)}`;
  }

  return paths;
}

function toTsString(value) {
  return JSON.stringify(value, null, 2);
}

async function main() {
  if (!ensureMainSiteRepo()) {
    return;
  }

  mkdirSync(generatedDir, { recursive: true });
  mkdirSync(publicAssetsDir, { recursive: true });

  const bootcampBundle = bundleMainSiteModule(
    "src/config/constants/bootcampData.ts",
    "bootcamp-entry.ts",
  );

  const programImagesBundle = bundleMainSiteModule(
    "src/config/constants/programData.ts",
    "program-images-entry.ts",
  );

  const bootcampModule = await loadBundledModule(bootcampBundle.outfile);
  const programImagesModule = await loadBundledModule(programImagesBundle.outfile);

  const flagshipJson = execSync(
    `npx tsx -e "import { flagshipProgramCards } from './src/config/constants/flagshipProgramData.ts'; console.log(JSON.stringify(flagshipProgramCards));"`,
    { cwd: mainSiteRoot, encoding: "utf8" },
  ).trim();

  const flagshipProgramCards = JSON.parse(flagshipJson);
  const bootcampAssetsDir = join(publicAssetsDir, "bootcamps");
  const programAssetsDir = join(publicAssetsDir, "programs");

  const bootcamps = bootcampModule.bootcamps.map((bootcamp) => {
    const extension = bootcamp.image.split(".").pop() || "webp";
    const preferredName = `${bootcamp.slug}.${extension}`;
    const publicPath = copyBundledAsset(
      bootcamp.image,
      bootcampBundle.outfile,
      bootcampAssetsDir,
      preferredName,
    );

    return {
      id: bootcamp.id,
      slug: bootcamp.slug,
      title: bootcamp.title,
      duration: bootcamp.duration,
      date: bootcamp.date,
      language: bootcamp.language,
      originalPrice: bootcamp.originalPrice,
      launchPrice: bootcamp.launchPrice,
      currency: bootcamp.currency,
      description: bootcamp.description,
      image: publicPath,
      ...(bootcamp.phase ? { phase: bootcamp.phase } : {}),
      ...(bootcamp.launchNote ? { launchNote: bootcamp.launchNote } : {}),
    };
  });

  const programImages = programImagesModule.programImages.map((program) => {
    const extension = program.image.split(".").pop() || "webp";
    const preferredName = `${program.slug}.${extension}`;
    const publicPath = copyBundledAsset(
      program.image,
      programImagesBundle.outfile,
      programAssetsDir,
      preferredName,
    );

    return {
      slug: program.slug,
      image: publicPath,
    };
  });

  const illustrations = syncIllustrations();

  const catalogFileContents = `/* eslint-disable */
// AUTO-GENERATED by scripts/sync-main-website-catalog.mjs
// Source: ../cyberlabs-india-mainwebsite-latest
// Do not edit manually. Run \`yarn sync:main-site\` after main website catalog changes.

import type { Bootcamp } from "@/types/bootcamp";

export type FlagshipProgramCard = {
  id: number;
  slug: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  originalPrice: number;
  launchPrice: number;
  currency: string;
};

export const bootcamps = ${toTsString(bootcamps)} as const satisfies readonly Bootcamp[];

export const flagshipProgramCards = ${toTsString(
    flagshipProgramCards,
  )} as const satisfies readonly FlagshipProgramCard[];

export const flagshipProgramImages = ${toTsString(programImages)} as const;

export const eliteBootcampIllustration = ${JSON.stringify(
    illustrations.eliteBootcampIllustration,
  )};

export const flagshipProgramIllustration = ${JSON.stringify(
    illustrations.flagshipProgramIllustration,
  )};

export function getFlagshipProgramImage(slug: string): string {
  return flagshipProgramImages.find((program) => program.slug === slug)?.image ?? "";
}
`;

  writeFileSync(generatedCatalogFile, catalogFileContents, "utf8");

  const webinarBundle = bundleMainSiteEntry("webinar-entry.ts", (resolveMainSiteModulePath) => {
    const webinarSchedulePath = resolveMainSiteModulePath("src/config/data/webinar-schedule.ts");

    return `import {
  upcomingWebinars,
  webinarScheduleContent,
  defaultWebinarSpeakers,
  backgroundOptions,
  webinarWhatsappNumber,
} from "${webinarSchedulePath}";

export {
  upcomingWebinars,
  webinarScheduleContent,
  defaultWebinarSpeakers,
  backgroundOptions,
  webinarWhatsappNumber,
};`;
  });

  const webinarModule = await loadBundledModule(webinarBundle.outfile);

  const webinarFileContents = `/* eslint-disable */
// AUTO-GENERATED by scripts/sync-main-website-catalog.mjs
// Source: ../cyberlabs-india-mainwebsite-latest/src/config/data/webinar-schedule.ts
// Do not edit manually. Run \`yarn sync:main-site\` after main website webinar changes.

export type WebinarSpeaker = {
  name: string;
  title: string;
};

export type WebinarSession = {
  id: string;
  scheduledAt: string;
  topic: string;
  speakers: WebinarSpeaker[];
  registrationOpen?: boolean;
};

export const defaultWebinarSpeakers = ${toTsString(
    webinarModule.defaultWebinarSpeakers,
  )} as const satisfies readonly WebinarSpeaker[];

export const webinarScheduleContent = ${toTsString(
    webinarModule.webinarScheduleContent,
  )} as const;

export const backgroundOptions = ${toTsString(
    webinarModule.backgroundOptions,
  )} as const;

export type BackgroundOption = (typeof backgroundOptions)[number];

export const upcomingWebinars = ${toTsString(
    webinarModule.upcomingWebinars,
  )} as const satisfies readonly WebinarSession[];

export const webinarWhatsappNumber = ${JSON.stringify(
    webinarModule.webinarWhatsappNumber,
  )};
`;

  writeFileSync(generatedWebinarFile, webinarFileContents, "utf8");

  rmSync(bootcampBundle.tempDir, { recursive: true, force: true });
  rmSync(programImagesBundle.tempDir, { recursive: true, force: true });
  rmSync(webinarBundle.tempDir, { recursive: true, force: true });

  console.log(
    `Synced ${bootcamps.length} bootcamps, ${flagshipProgramCards.length} flagship programs, and ${webinarModule.upcomingWebinars.length} webinars from main website.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
