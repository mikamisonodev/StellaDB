"use client";

import { create } from "zustand";

type GlobalStore = {
    bgImage: string;
    setBgImage: (image: string) => void;
};

export const useGlobalStore = create<GlobalStore>(set => ({
    bgImage: "MainMenu",
    setBgImage: (image: string) => set({ bgImage: image }),
}));
