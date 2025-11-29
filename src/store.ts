"use client";

import { create } from "zustand";

type GlobalStore = {
    backgroundImage: string;
    setBackgroundImage: (image: string) => void;
};

export const useGlobalStore = create<GlobalStore>(set => ({
    backgroundImage: "MainMenu",
    setBackgroundImage: (image: string) => set({ backgroundImage: image }),
}));
