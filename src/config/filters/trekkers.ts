"use client";

import { FaStar } from "react-icons/fa6";
import { PiHeartFill, PiSwordFill } from "react-icons/pi";
import { TbBowFilled } from "react-icons/tb";

import type { FilterOptions, SortType } from "@/typings/filter";
import type { Trekker } from "@/typings/trekker";

export const sortOptions: SortType[] = [
    { label: "Default", value: "default" },
    { label: "Name", value: "name" },
    { label: "ID", value: "id" },
    { label: "Rarity", value: "rarity", icon: FaStar },
    {
        title: "Stats",
        section: true,
        items: [
            { label: "HP", value: "hp", icon: PiHeartFill },
            { label: "ATK", value: "atk", icon: PiSwordFill },
        ],
    },
];

export const filterOptions: FilterOptions[] = [
    {
        label: "Attack Range",
        items: [
            { label: "Melee", value: "range:Melee", icon: PiSwordFill },
            { label: "Ranged", value: "range:Ranged", icon: TbBowFilled },
        ],
    },
    {
        label: "Element",
        items: [
            { label: "Aqua", value: "element:Aqua", img: "/elements/Aqua.png" },
            { label: "Ignis", value: "element:Ignis", img: "/elements/Ignis.png" },
            { label: "Terra", value: "element:Terra", img: "/elements/Terra.png" },
            { label: "Ventus", value: "element:Ventus", img: "/elements/Ventus.png" },
            { label: "Umbra", value: "element:Umbra", img: "/elements/Umbra.png" },
            { label: "Lux", value: "element:Lux", img: "/elements/Lux.png" },
        ],
    },
    {
        label: "Rarity",
        items: [
            { label: "4", value: "rarity:4", icon: FaStar },
            { label: "5", value: "rarity:5", icon: FaStar },
        ],
    },
    {
        label: "Role",
        items: [
            { label: "Vanguard", value: "role:Vanguard" },
            { label: "Support", value: "role:Support" },
            { label: "Versatile", value: "role:Versatile" },
        ],
    },
    {
        label: "Style",
        items: [
            { label: "Collector", value: "style:Collector" },
            { label: "Steady", value: "style:Steady" },
            { label: "Adventurous", value: "style:Adventurous" },
            { label: "Creative", value: "style:Creative" },
            { label: "Inquisitive", value: "style:Inquisitive" },
        ],
    },
    {
        label: "Faction",
        items: [
            { label: "Yunji Studio", value: "faction:Yunji Studio" },
            { label: "Moonaworks", value: "faction:Moonaworks" },
            { label: "Scarlet Sights Media", value: "faction:Scarlet Sights Media" },
            { label: "Grace Imperium", value: "faction:Grace Imperium" },
            { label: "New Star Guild", value: "faction:New Star Guild" },
            { label: "Petal Bloom", value: "faction:Petal Bloom" },
            { label: "Imperial Guard", value: "faction:Imperial Guard" },
            { label: "Ashwind Clan", value: "faction:Ashwind Clan" },
            { label: "Post Haste", value: "faction:Post Haste" },
            { label: "Baize Bureau", value: "faction:Baize Bureau" },
            { label: "United Harvest", value: "faction:United Harvest" },
            { label: "Freelance Trekker", value: "faction:Freelance Trekker" },
            { label: "Geography Society", value: "faction:Geography Society" },
            { label: "Goodwind Homecare", value: "faction:Goodwind Homecare" },
            { label: "Fenghuang Diner", value: "faction:Fenghuang Diner" },
            { label: "White Cat Troupe", value: "faction:White Cat Troupe" },
        ],
    },
];

export const filterFn: Record<string, (value: string, trekker: Trekker) => boolean> = {
    role: (value, trekker) => trekker.class === value,
    style: (value, trekker) => trekker.style === value,
    faction: (value, trekker) => trekker.force === value,
    rarity: (value, trekker) => trekker.star === Number(value),
    range: (value, trekker) => trekker.attackType === value,
    element: (value, trekker) => trekker.element === value,
    class: (value, trekker) => trekker.class === value,
};

export const sortFn: Record<string, (a: Trekker, b: Trekker) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => a.star - b.star,
    id: (a, b) => a.id - b.id,
    hp: (a, b) => {
        return a.stat[a.stat.length - 1].hp - b.stat[b.stat.length - 1].hp;
    },
    atk: (a, b) => {
        return a.stat[a.stat.length - 1].atk - b.stat[b.stat.length - 1].atk;
    },
};
