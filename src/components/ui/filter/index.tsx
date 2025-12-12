"use client";

import type MiniSearch from "minisearch";
import { useMemo, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import type { FilterOption, SortType } from "@/typings/filter";

import DesktopFilter from "./desktop";
import MobileFilter from "./mobile";

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

    const isDesktop = useMediaQuery("(min-width: 64rem)");

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
            {isDesktop ? (
                <DesktopFilter
                    onSortOrderChange={setSortOrder}
                    onSortTypeChange={setSortType}
                    setFilterCount={setFilterCount}
                    onSearchInput={setSearchInput}
                    sortOptions={sortOptions}
                    filterOptions={filterOptions}
                    searchInput={searchInput}
                    sortOrder={sortOrder}
                    selectedSet={selectedSet}
                    filterCount={filterCount}
                    sortType={sortType}
                    displayCount={list.length}
                    count={count}
                />
            ) : (
                <MobileFilter
                    onSortOrderChange={setSortOrder}
                    onSortTypeChange={setSortType}
                    setFilterCount={setFilterCount}
                    onSearchInput={setSearchInput}
                    sortOptions={sortOptions}
                    filterOptions={filterOptions}
                    searchInput={searchInput}
                    sortOrder={sortOrder}
                    selectedSet={selectedSet}
                    filterCount={filterCount}
                    sortType={sortType}
                    displayCount={list.length}
                    count={count}
                />
            )}
            <div className="min-h-screen w-full">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
                    {sorted.map(item => render(item))}
                </div>
            </div>
        </>
    );
}

export default Filter;
