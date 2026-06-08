import { twMerge } from "tailwind-merge";

export function cn(...classNames: Array<string | undefined | false | null>) {
  return twMerge(classNames.filter(Boolean).join(" "));
}
