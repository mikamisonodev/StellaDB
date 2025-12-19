"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { startTransition, use, useEffect, useState } from "react";

import { ASSET_URL } from "@/config/constant";
import { useDataStore } from "@/store";
import type { Disc } from "@/typings/discs";

type Props = {
    params: Promise<{ id: string }>;
};

const Page: NextPage<Props> = ({ params }) => {
    const pathParams = use(params);
    const { discs, totalDiscs, fetchDiscs } = useDataStore();
    const [currentDisc, setCurrentDisc] = useState<Disc | null>(null);

    useEffect(() => {
        startTransition(() => {
            fetchDiscs();
        });
    }, []);

    useEffect(() => {
        if (totalDiscs !== 0) {
            startTransition(() => setCurrentDisc(discs[pathParams.id]));
        }
    }, [totalDiscs]);

    return (
        <div className="flex lg:gap-3 h-[calc(100vh-3.5rem-24px)] py-3 px-6">
            {currentDisc ? (
                <>
                    <div className="flex items-center justify-center h-full w-1/2 relative">
                        <Image
                            src={`${ASSET_URL}/Assets/assetbundles/icon/outfit/outfit_${currentDisc.id.toString().replace(/^.{2}/, "")}.png`}
                            className="object-cover object-top"
                            alt={currentDisc.name}
                            height={512}
                            width={512}
                        />
                    </div>
                    <div></div>
                </>
            ) : (
                <>
                    <div></div>
                    <div></div>
                </>
            )}
        </div>
    );
};

export default Page;
