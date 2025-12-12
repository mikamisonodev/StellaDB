"use client";

import type MiniSearch from "minisearch";
import { useMemo, useState } from "react";

import type { FilterOption, SortType } from "@/typings/filter";

import FilterSection from "./filter-section";

export type FilterProps<T> = {
    render: (item: T) => React.ReactNode;
    filterOptions: FilterOption[];
    search: MiniSearch;
    sortOptions: SortType[];
    filterFn: Record<string, (value: string, item: T) => boolean>;
    sortFn: Record<string, (a: T, b: T) => number>;
    items: Record<string, T>;
    count: number;
};

function Filter<T>({ items, search, sortFn, filterFn, filterOptions, sortOptions, count, render }: FilterProps<T>) {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortType, setSortType] = useState("default");
    const [selectedSet] = useState(new Set<string>());
    const [filterCount, setFilterCount] = useState(0);
    const [searchInput, setSearchInput] = useState("");

    const searchResults = useMemo(() => {
        if (searchInput.length === 0) return Object.values(items);

        const results = search.search(searchInput);
        return results.map(result => items[result.id]);
    }, [searchInput, count]);

    const list = useMemo(() => {
        if (selectedSet.size === 0) return searchResults;

        const selected = Array.from(selectedSet.values());
        return searchResults.filter(trekker => {
            return selected.every(filter => {
                const [type, value] = filter.split(":");
                return filterFn[type as keyof typeof filterFn](value, trekker);
            });
        });
    }, [filterCount, searchInput, count]);

    const sorted = useMemo(() => {
        if (sortType === "default") return list;

        return list.toSorted((a, b) => {
            return sortFn[sortType as keyof typeof sortFn](a, b) * (sortOrder === "asc" ? 1 : -1);
        });
    }, [sortType, sortOrder, filterCount, searchInput, count]);

    return (
        <>
            <div className="lg:w-xl w-full">
                <div className="flex sticky top-[calc(3.5rem+12px)] h-[calc(100vh-3.5rem-24px)] rounded-lg bg-default-100/40 flex-col py-4 px-3">
                    <FilterSection
                        filterOptions={filterOptions}
                        sortOptions={sortOptions}
                        selectedSet={selectedSet}
                        setFilterCount={setFilterCount}
                        onSearchInput={setSearchInput}
                        onSortOrderChange={setSortOrder}
                        onSortTypeChange={setSortType}
                        sortOrder={sortOrder}
                        sortType={sortType}
                        filterCount={filterCount}
                        displayCount={sorted.length}
                        searchInput={searchInput}
                        count={count}
                    />
                </div>
            </div>
            <div className="min-h-screen w-full">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
                    {sorted.map(item => render(item))}
                </div>
            </div>
        </>
    );
}

export default Filter;
