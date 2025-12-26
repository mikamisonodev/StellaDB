"use client";

import type { NextPage } from "next";
import { startTransition, useEffect } from "react";

import DiscCard from "@/components/ui/cards/disc-card";
import Filter from "@/components/ui/filter";
import * as filters from "@/config/filters/discs";
import { useDataStore, useGlobalStore } from "@/store";
import { Disc } from "@/typings/discs";

const Page: NextPage = () => {
    const { setBgImage } = useGlobalStore();
    const { discs, totalDiscs, discSearch, fetchDiscs } = useDataStore();

    useEffect(() => {
        startTransition(() => {
            setBgImage("/backgrounds/Discs.png");
            fetchDiscs();
        });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-4 py-3 px-6 min-h-[calc(100vh-3.5rem)]">
            <Filter<Disc>
                items={discs}
                count={totalDiscs}
                search={discSearch}
                render={item => <DiscCard key={item.id} disc={item} />}
                {...filters}
            />
        </div>
    );
};

export default Page;
