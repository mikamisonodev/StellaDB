"use client";

import { FaStar } from "react-icons/fa6";

import type { Disc } from "@/typings/discs";
import type { FilterOptions, SortType } from "@/typings/filter";

export const sortOptions: SortType[] = [
    { label: "Default", value: "default" },
    { label: "Name", value: "name" },
    { label: "ID", value: "id" },
    { label: "Rarity", value: "rarity" },
];

export const filterOptions: FilterOptions[] = [
    {
        label: "Element",
        items: [
            { label: "Aqua", value: "element:Aqua", img: "/elements/Aqua.png" },
            { label: "Ignis", value: "element:Ignis", img: "/elements/Ignis.png" },
            { label: "Terra", value: "element:Terra", img: "/elements/Terra.png" },
            { label: "Ventus", value: "element:Ventus", img: "/elements/Ventus.png" },
            { label: "Umbra", value: "element:Umbra", img: "/elements/Umbra.png" },
            { label: "Lux", value: "element:Lux", img: "/elements/Lux.png" },
            { label: "None", value: "element:None", img: "/elements/None.png" },
        ],
    },
    {
        label: "Rarity",
        items: [
            { label: "3", value: "rarity:3", icon: FaStar },
            { label: "4", value: "rarity:4", icon: FaStar },
            { label: "5", value: "rarity:5", icon: FaStar },
        ],
    },
];

export const filterFn: Record<string, (value: string, disc: Disc) => boolean> = {
    element: (value, disc) => disc.element === value,
    rarity: (value, disc) => disc.star === Number(value),
};

export const sortFn: Record<string, (a: Disc, b: Disc) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => a.star - b.star,
    id: (a, b) => a.id - b.id,
};
