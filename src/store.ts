"use client";

import axios from "axios";
import { create } from "zustand";

import { Trekker } from "@/typings/trekker";

type GlobalStore = {
    bgImage: string;
    setBgImage: (image: string) => void;
};

export const useGlobalStore = create<GlobalStore>(set => ({
    bgImage: "MainMenu",
    setBgImage: (image: string) => set({ bgImage: image }),
}));

type DataStore = {
    totalTrekkers: number;
    trekkers: Record<string, Trekker>;
    fetchTrekkers: () => Promise<void>;
};

export const useDataStore = create<DataStore>((set, store) => ({
    trekkers: {},
    totalTrekkers: 0,
    fetchTrekkers: async () => {
        if (store().totalTrekkers !== 0) return;

        const response = await axios.get<Record<string, Trekker>>("/api/characters");
        set({
            totalTrekkers: Object.keys(response.data).length,
            trekkers: response.data,
        });
    },
}));
