"use client";

import type { NextPage } from "next";
import { startTransition, useEffect } from "react";

import Filter from "@/components/ui/filter";
import TrekkerCard from "@/components/ui/trekker-card";
import * as filters from "@/config/filters/trekkers";
import { useDataStore, useGlobalStore } from "@/store";
import type { Trekker } from "@/typings/trekker";

const Page: NextPage = () => {
    const { setBgImage } = useGlobalStore();
    const { trekkers, totalTrekkers, trekkerSearch, fetchTrekkers } = useDataStore();

    useEffect(() => {
        startTransition(() => {
            setBgImage("/backgrounds/Trekkers.png");
            fetchTrekkers();
        });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-4 py-3 px-6 min-h-[calc(100vh-3.5rem)]">
            <Filter<Trekker>
                items={trekkers}
                count={totalTrekkers}
                search={trekkerSearch}
                render={item => <TrekkerCard key={item.id} char={item} />}
                {...filters}
            />
        </div>
    );
};

export default Page;
