import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type tabValue = "dashboard" | "explore" | "builds" | null;

export function getTabValue(pathname: string): tabValue {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
    return "dashboard";

  if (pathname === "/builds/explore" || pathname.startsWith("/builds/explore"))
    return "explore";

  if (pathname === "/builds" || pathname.startsWith("/builds")) return "builds";

  return null;
}
