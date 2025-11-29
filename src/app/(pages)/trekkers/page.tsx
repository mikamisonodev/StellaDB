"use client";

import type { NextPage } from "next";
import { startTransition, useEffect } from "react";

import TrekkersSearch from "@/components/ui/trekkers-search";
import { useGlobalStore } from "@/store";

const Page: NextPage = () => {
    const { setBgImage } = useGlobalStore();

    useEffect(() => {
        startTransition(() => {
            setBgImage("Trekkers");
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="grid grid-cols-6 min-h-screen gap-4 pt-18 pb-4 px-6">
            <div className="sticky lg:col-span-2 hidden lg:flex flex-col bg-background/20 rounded-lg py-4 px-3">
                <TrekkersSearch />
            </div>
            <div className="col-span-4"></div>
        </div>
    );
};

export default Page;
