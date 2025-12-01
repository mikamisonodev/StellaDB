"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect } from "react";

import TrekkersSearch from "@/components/ui/trekkers-search";
import { ASSET_URL } from "@/config/constant";
import { cn } from "@/lib/utils";
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
            <div className="min-h-screen overflow-auto w-full">
                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
                    {Object.values(trekkers).map(char => (
                        <Link
                            key={char.id}
                            href={`/trekkers/${char.id}`}
                            className={cn(
                                "relative rounded-lg overflow-hidden bg-default-100 bg-linear-to-br pt-2",
                                char.star === 5 ? "from-[#d8e] to-[#7ff]" : "from-[#fd5] to-[#efc]",
                            )}
                        >
                            <Image
                                className="absolute top-0 left-0 z-10"
                                src={`/elements/${char.element}.png`}
                                alt={char.element}
                                height={32}
                                width={32}
                            />
                            <Image
                                src={ASSET_URL + `/Assets/assetbundles/icon/head/head_${char.id}01_XL.png`}
                                className="w-full scale-[1.075]"
                                alt={char.name}
                                loading="eager"
                                height={137}
                                width={100}
                            />
                            <p className="absolute bottom-0 w-full from-background to-transparent bg-linear-to-t text-center pt-3 mb-1">
                                {char.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
