"use client";

import axios from "axios";
import MiniSearch from "minisearch";
import { create } from "zustand";

import type { Disc } from "@/typings/discs";
import type { Trekker } from "@/typings/trekker";

import { checkEmptyObject } from "./lib/utils";

type GlobalStore = {
    bgImage: string;
    setBgImage: (image: string) => void;
    matches: boolean;
    setMatches: (matches: boolean) => void;
};

export const useGlobalStore = create<GlobalStore>(set => ({
    bgImage: "/backgrounds/MainMenu.png",
    setBgImage: (image: string) => set({ bgImage: image }),
    matches: false,
    setMatches: (matches: boolean) => set({ matches }),
}));

type DataStore = {
    totalTrekkers: number;
    trekkers: Record<string, Trekker>;
    trekkerSearch: MiniSearch<Trekker>;
    fetchTrekkers: () => Promise<void>;
    totalDiscs: number;
    discs: Record<string, Disc>;
    discSearch: MiniSearch<Disc>;
    fetchDiscs: () => Promise<void>;
};

export const useDataStore = create<DataStore>((set, store) => ({
    trekkers: {},
    totalTrekkers: 0,
    trekkerSearch: new MiniSearch<Trekker>({
        searchOptions: { prefix: true },
        storeFields: ["id", "name"],
        fields: ["name"],
        idField: "id",
    }),
    fetchTrekkers: async () => {
        const data = store();

        if (!checkEmptyObject(data.trekkers)) return;

        const response = await axios.get<Record<string, Trekker>>("/api/characters");
        const list = Object.values(response.data);

        if (data.trekkerSearch.documentCount === 0) {
            data.trekkerSearch.addAll(list);
        }

        set({
            totalTrekkers: list.length,
            trekkers: response.data,
        });
    },
    discs: {},
    totalDiscs: 0,
    discSearch: new MiniSearch<Disc>({
        searchOptions: { prefix: true },
        storeFields: ["id", "name"],
        fields: ["name"],
        idField: "id",
    }),
    fetchDiscs: async () => {
        const data = store();

        if (!checkEmptyObject(data.discs)) return;

        const response = await axios.get<Record<string, Disc>>("/api/discs");
        const list = Object.values(response.data);

        if (data.discSearch.documentCount === 0) {
            data.discSearch.addAll(list);
        }

        set({
            totalDiscs: list.length,
            discs: response.data,
        });
    },
}));
