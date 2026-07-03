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

export type FlagshipProgramImage = {
  slug: string;
  image: string;
};

export type MainSiteCatalog = {
  bootcamps: Bootcamp[];
  flagshipProgramCards: FlagshipProgramCard[];
  flagshipProgramImages: FlagshipProgramImage[];
  eliteBootcampIllustration: string;
  flagshipProgramIllustration: string;
};

export function getFlagshipProgramImage(
  catalog: MainSiteCatalog,
  slug: string,
): string {
  return catalog.flagshipProgramImages.find((program) => program.slug === slug)?.image ?? "";
}
