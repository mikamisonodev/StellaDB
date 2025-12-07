"use client";

import type { NextPage } from "next";
import { startTransition, useEffect, useMemo, useState } from "react";

import TrekkerCard from "@/components/ui/trekker-card";
import TrekkersSearch from "@/components/ui/trekkers-search";
import { filterFn, sortFn } from "@/config/filters/trekkers";
import { throttle } from "@/lib/throttle";
import { useDataStore, useGlobalStore } from "@/store";

const Page: NextPage = () => {
    const { setBgImage } = useGlobalStore();
    const { trekkers, totalTrekkers, trekkerSearch, fetchTrekkers } = useDataStore();

    useEffect(() => {
        startTransition(() => {
            setBgImage("Trekkers");
            fetchTrekkers();
        });
    }, []);

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortType, setSortType] = useState("default");
    const [selectedSet] = useState(new Set<string>());
    const [filterCount, setFilterCount] = useState(0);
    const [searchInput, setSearchInput] = useState("");

    const searchResults = useMemo(() => {
        if (searchInput.length === 0) return Object.values(trekkers);

        return trekkerSearch.search(searchInput, { prefix: true }).map(result => trekkers[result.id]);
    }, [searchInput, trekkerSearch, trekkers]);

    // Filtered trekkers based on selected filters
    // TODO: Make OR logic when multiple filters of same type are selected
    const trekkersList = useMemo(() => {
        // No filters selected, return all trekkers
        if (selectedSet.size === 0) return searchResults;

        const selected = Array.from(selectedSet.values());
        return searchResults.filter(trekker => {
            return selected.every(filter => {
                const [type, value] = filter.split(":");
                return filterFn[type as keyof typeof filterFn](value, trekker);
            });
        });
    }, [filterCount, trekkers, selectedSet, searchResults]);

    // Sorted trekkers based on sort type and order after filtering to improve performance
    const sortedTrekkers = useMemo(() => {
        // Default sorting, return as is
        if (sortType === "default") return trekkersList;

        return trekkersList.toSorted((a, b) => {
            // Reverse the order if descending by multiplying by -1
            return sortFn[sortType as keyof typeof sortFn](a, b) * (sortOrder === "asc" ? 1 : -1);
        });
    }, [sortType, sortOrder, filterCount, trekkersList]);

    return (
        <div className="flex min-h-screen gap-4 py-3 px-6">
            <div className="w-xl lg:col-span-2 hidden lg:block">
                <div className="flex sticky top-[calc(3.5rem+12px)] h-[calc(100vh-3.5rem-24px)] rounded-lg bg-default-100/40 flex-col py-4 px-3">
                    <TrekkersSearch
                        sortType={sortType}
                        sortOrder={sortOrder}
                        selectedSet={selectedSet}
                        filterCount={filterCount}
                        onSearchInput={throttle(setSearchInput, 1000)}
                        displayCount={trekkersList.length}
                        onSortOrderChange={setSortOrder}
                        onSortTypeChange={setSortType}
                        setFilterCount={setFilterCount}
                        count={totalTrekkers}
                    />
                </div>
            </div>
            <div className="min-h-screen w-full">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
                    {sortedTrekkers.map(char => (
                        <TrekkerCard key={char.id} char={char} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
