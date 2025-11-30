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
];
