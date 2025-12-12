"use client";

import { FaHeart, FaStar } from "react-icons/fa6";
import { LuSword } from "react-icons/lu";
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
            { label: "HP", value: "hp", icon: FaHeart },
            { label: "ATK", value: "atk", icon: LuSword },
        ],
    },
];

export const filterOptions: FilterOptions[] = [
    {
        label: "Attack Range",
        items: [
            { label: "Melee", value: "range:Melee", icon: LuSword },
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
        label: "Class",
        items: [
            { label: "Vanguard", value: "class:Vanguard" },
            { label: "Support", value: "class:Support" },
            { label: "Versatile", value: "class:Versatile" },
        ],
    },
    {
        label: "Tag",
        items: [
            { label: "Collector", value: "tag:Collector" },
            { label: "New Star Guild", value: "tag:New Star Guild" },
            { label: "Steady", value: "tag:Steady" },
            { label: "Imperial Guard", value: "tag:Imperial Guard" },
            { label: "Adventurous", value: "tag:Adventurous" },
            { label: "White Cat Troupe", value: "tag:White Cat Troupe" },
            { label: "Creative", value: "tag:Creative" },
            { label: "Inquisitive", value: "tag:Inquisitive" },
            { label: "Baize Bureau", value: "tag:Baize Bureau" },
            { label: "United Harvest", value: "tag:United Harvest" },
            { label: "Fenghuang Diner", value: "tag:Fenghuang Diner" },
            { label: "Freelance Trekker", value: "tag:Freelance Trekker" },
            { label: "Goodwind Homecare", value: "tag:Goodwind Homecare" },
            { label: "Grace Imperium", value: "tag:Grace Imperium" },
            { label: "Post Haste", value: "tag:Post Haste" },
            { label: "Ashwind Clan", value: "tag:Ashwind Clan" },
            { label: "Petal Bloom Guild", value: "tag:Petal Bloom Guild" },
            { label: "Scarlet Sights Media", value: "tag:Scarlet Sights Media" },
            { label: "Yunji Studio", value: "tag:Yunji Studio" },
        ],
    },
];

export const filterFn: Record<string, (value: string, trekker: Trekker) => boolean> = {
    tag: (value, trekker) => trekker.tag.includes(value),
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
