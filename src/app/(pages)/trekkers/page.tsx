"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect } from "react";

import TrekkersSearch from "@/components/ui/trekkers-search";
import { ASSET_URL } from "@/config/constant";
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
            <div className="max-h-screen overflow-auto w-full">
                <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-3">
                    {Object.values(trekkers).map(char => (
                        <Link key={char.id} href={`/trekkers/${char.id}`}>
                            <Image
                                src={ASSET_URL + `/Assets/assetbundles/icon/head/head_${char.id}01_XL.png`}
                                className="size-auto"
                                alt={char.name}
                                loading="eager"
                                height={137}
                                width={100}
                            />
                            <div>{char.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
