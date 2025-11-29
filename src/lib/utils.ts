import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function imageOptimize(url: string, width: number, height: number, quality: number = 75) {
    return "/_next/image?url=" + encodeURIComponent(url) + `&w=${width}&h=${height}&q=${quality}`;
}
