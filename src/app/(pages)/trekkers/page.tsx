"use client";

import type { NextPage } from "next";
import { startTransition, useEffect } from "react";

import TrekkerCard from "@/components/ui/trekker-card";
import TrekkersSearch from "@/components/ui/trekkers-search";
import { useDataStore, useGlobalStore } from "@/store";

const Page: NextPage = () => {
    const { setBgImage } = useGlobalStore();
    const { trekkers, totalTrekkers, fetchTrekkers } = useDataStore();

    useEffect(() => {
        startTransition(() => {
            setBgImage("Trekkers");
            fetchTrekkers();
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex min-h-screen gap-4 py-3 px-6">
            <div className="w-xl lg:col-span-2 hidden lg:block">
                <div className="flex sticky top-[calc(3.5rem+12px)] h-[calc(100vh-3.5rem-24px)] rounded-lg bg-default-100/40 flex-col py-4 px-3">
                    <TrekkersSearch displayCount={totalTrekkers} count={totalTrekkers} />
                </div>
            </div>
            <div className="min-h-screen w-full">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
                    {Object.values(trekkers).map(char => (
                        <TrekkerCard key={char.id} char={char} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
