"use client";

import axios from "axios";
import MiniSearch from "minisearch";
import { create } from "zustand";

import type { Trekker } from "@/typings/trekker";

import { checkEmptyObject } from "./lib/utils";

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
    trekkerSearch: MiniSearch<Trekker>;
    fetchTrekkers: () => Promise<void>;
};

export const useDataStore = create<DataStore>((set, store) => ({
    trekkers: {},
    totalTrekkers: 0,
    trekkerSearch: new MiniSearch<Trekker>({
        storeFields: ["id", "name"],
        fields: ["name"],
        idField: "id",
    }),
    fetchTrekkers: async () => {
        const data = store();

        if (!checkEmptyObject(data.trekkers)) return;

        const response = await axios.get<Record<string, Trekker>>("/api/characters");
        const list = Object.values(response.data);

        data.trekkerSearch.addAll(list);

        set({
            totalTrekkers: list.length,
            trekkers: response.data,
        });
    },
}));
