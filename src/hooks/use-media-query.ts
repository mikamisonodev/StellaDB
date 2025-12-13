"use client";

import { startTransition, useEffect } from "react";

import { useGlobalStore } from "@/store";

export const useMediaQuery = (query: string) => {
    const { matches, setMatches } = useGlobalStore();

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            startTransition(() => setMatches(media.matches));
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
};
