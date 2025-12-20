"use client";

import { cn } from "@/lib/utils";

import { FilterSection, type FilterSectionProps } from "./filter-section";

const DesktopFilter = (props: FilterSectionProps) => {
    return (
        <div
            className={cn(
                "w-xl flex sticky rounded-lg flex-col bg-content1/70 backdrop-blur-md",
                "top-[calc(3.5rem+12px)] h-[calc(100vh-3.5rem-24px)] p-3",
            )}
        >
            <FilterSection {...props} />
        </div>
    );
};

export default DesktopFilter;
