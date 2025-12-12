import type { IconType } from "react-icons";

export type FilterOption = {
    label: string;
    items: {
        label: string;
        value: string;
        icon?: IconType;
        img?: string;
    }[];
};

type SortOption = {
    label?: string;
    value?: string;
    title?: string;
    section?: boolean;
    icon?: IconType;
};

export interface SortType extends SortOption {
    items?: SortOption[];
}

export type FilterOptions = {
    label: string;
    items: {
        label: string;
        value: string;
        icon?: IconType;
        img?: string;
    }[];
};
