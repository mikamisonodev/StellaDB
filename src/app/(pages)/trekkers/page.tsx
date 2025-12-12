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
            setBgImage("Trekkers");
            fetchTrekkers();
        });
    }, []);

    return (
        <div className="flex min-h-screen gap-4 py-3 px-6">
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
