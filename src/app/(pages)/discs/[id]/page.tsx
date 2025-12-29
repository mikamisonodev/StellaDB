"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { startTransition, use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

import AttributesTab from "@/components/ui/discs/attributes-tab";
import DiscImage from "@/components/ui/discs/image";
import SkillsTab from "@/components/ui/discs/skills-tab";
import { Tab, Tabs } from "@/components/ui/tabs";
import { useDataStore } from "@/store";
import type { Disc } from "@/typings/discs";

type Props = {
    params: Promise<{ id: string }>;
};

const Page: NextPage<Props> = ({ params }) => {
    const pathParams = use(params);
    const { discs, totalDiscs, fetchDiscs, fetchItems } = useDataStore();
    const [currentDisc, setCurrentDisc] = useState<Disc | null>(null);

    useEffect(() => {
        startTransition(() => {
            fetchDiscs();
            fetchItems();
        });
    }, []);

    useEffect(() => {
        if (totalDiscs !== 0) {
            startTransition(() => setCurrentDisc(discs[pathParams.id]));
        }
    }, [totalDiscs]);

    return (
        <div className="flex flex-col lg:flex-row lg:gap-3 min-h-[calc(100vh-3.5rem)] py-3 px-6">
            {currentDisc ? (
                <>
                    <div className="flex justify-center lg:w-1/2 w-full lg:sticky lg:top-20 lg:self-start lg:h-fit">
                        <DiscImage id={currentDisc.id.toString()} name={currentDisc.name} />
                    </div>
                    <div className="self-start space-y-3 py-4 w-full flex-1">
                        <div className="space-y-5">
                            <h1 className="lg:text-5xl text-3xl font-exo italic tracking-wide text-foreground">
                                {currentDisc.name}
                            </h1>
                            <div className="flex gap-2">
                                <div className="inline-flex py-1 px-3 rounded-2xl items-center bg-content1/40 backdrop-blur-xl">
                                    {Array.from({ length: currentDisc.star }, (_, i) => (
                                        <FaStar size={18} key={i} />
                                    ))}
                                </div>
                                <div className="inline-flex bg-content1/40 backdrop-blur-xl py-1 px-3 rounded-2xl items-center justify-center gap-1">
                                    <Image
                                        src={`/elements/${currentDisc.element}.png`}
                                        alt={currentDisc.element}
                                        loading="eager"
                                        height={24}
                                        width={24}
                                    />
                                    <span className="font-medium mb-0.5">{currentDisc.element}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <Tabs defaultTab="attributes">
                                <div className="flex">
                                    <Tab value="attributes" title="Attributes" />
                                    <Tab value="skills" title="Skills" />
                                </div>
                                <AttributesTab disc={currentDisc} />
                                <SkillsTab disc={currentDisc} />
                            </Tabs>
                        </div>
                    </div>
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
