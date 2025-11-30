"use client";

import axios from "axios";
import { create } from "zustand";

import { checkEmptyObject } from "@/lib/utils";
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
    trekkers: Record<string, Trekker>;
    fetchTrekkers: () => Promise<void>;
};

export const useDataStore = create<DataStore>((set, store) => ({
    trekkers: {},
    fetchTrekkers: async () => {
        if (!checkEmptyObject(store().trekkers)) return;

        const response = await axios.get<Record<string, Trekker>>("/api/characters");
        set({ trekkers: response.data });
    },
}));
