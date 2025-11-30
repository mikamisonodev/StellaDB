"use client";

import { IconType } from "react-icons";
import { LuSword } from "react-icons/lu";
import { TbBowFilled } from "react-icons/tb";

export const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Name", value: "name" },
    { label: "ID", value: "id" },
];

type FilterOptions = {
    label: string;
    items: {
        label: string;
        value: string;
        icon?: IconType;
        img?: string;
    }[];
};

export const filterOptions: FilterOptions[] = [
    {
        label: "Attack Range",
        items: [
            { label: "Melee", value: "range:melee", icon: LuSword },
            { label: "Ranged", value: "range:ranged", icon: TbBowFilled },
        ],
    },
    {
        label: "Element",
        items: [
            { label: "Aqua", value: "element:aqua", img: "/elements/Aqua.png" },
            { label: "Ignis", value: "element:ignis", img: "/elements/Ignis.png" },
            { label: "Terra", value: "element:terra", img: "/elements/Terra.png" },
            { label: "Ventus", value: "element:ventus", img: "/elements/Ventus.png" },
            { label: "Umbra", value: "element:nox", img: "/elements/Umbra.png" },
            { label: "Lux", value: "element:lux", img: "/elements/Lux.png" },
        ],
    },
    {
        label: "Tag",
        items: [
            { label: "Vanguard", value: "tag:vanguard" },
            { label: "Collector", value: "tag:collector" },
            { label: "New Star Guild", value: "tag:new_star_guild" },
            { label: "Support", value: "tag:support" },
            { label: "Steady", value: "tag:steady" },
            { label: "Imperial Guard", value: "tag:imperial_guard" },
            { label: "Versatile", value: "tag:versatile" },
            { label: "Adventurous", value: "tag:adventurous" },
            { label: "White Cat Troupe", value: "tag:white_cat_troupe" },
            { label: "Creative", value: "tag:creative" },
            { label: "Inquisitive", value: "tag:inquisitive" },
            { label: "Baize Bureau", value: "tag:baize_bureau" },
            { label: "United Harvest", value: "tag:united_harvest" },
            { label: "Fenghuang Diner", value: "tag:fenghuang_diner" },
            { label: "Freelance Trekker", value: "tag:freelance_trekker" },
            { label: "Goodwind Homecare", value: "tag:goodwind_homecare" },
            { label: "Grace Imperium", value: "tag:grace_imperium" },
            { label: "Post Haste", value: "tag:post_haste" },
            { label: "Ashwind Clan", value: "tag:ashwind_clan" },
            { label: "Petal Bloom Guild", value: "tag:petal_bloom_guild" },
            { label: "Scarlet Sights Media", value: "tag:scarlet_sights_media" },
            { label: "Yunji Studio", value: "tag:yunji_studio" },
        ],
    },
];
