"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { startTransition, use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

import { Tab, TabPanel, Tabs } from "@/components/ui/tabs";
import SkillsTab from "@/components/ui/trekkers/skills-tab";
import { handleClassStyle } from "@/config/styles";
import { cn } from "@/lib/utils";
import { useDataStore } from "@/store";
import { Trekker } from "@/typings/trekker";

type Props = {
    params: Promise<{ id: string }>;
};

const Page: NextPage<Props> = ({ params }) => {
    const pathParams = use(params);
    const { trekkers, totalTrekkers, fetchTrekkers, fetchItems, fetchWords } = useDataStore();
    const [currentTrekker, setCurrentTrekker] = useState<Trekker | null>(null);

    useEffect(() => {
        startTransition(() => {
            fetchTrekkers();
            fetchItems();
            fetchWords();
        });
    }, []);

    useEffect(() => {
        if (totalTrekkers !== 0) {
            startTransition(() => setCurrentTrekker(trekkers[pathParams.id]));
        }
    }, [totalTrekkers]);

    return (
        <div className="flex flex-col lg:flex-row lg:gap-3 min-h-[calc(100vh-3.5rem)] py-3 px-6">
            {currentTrekker ? (
                <>
                    <div className="flex justify-center lg:w-2/5 w-full lg:sticky lg:top-20 lg:self-start lg:h-fit"></div>
                    <div className="self-start space-y-3 py-4 w-full flex-1">
                        <div className="space-y-5">
                            <h1 className="lg:text-5xl text-3xl font-exo italic tracking-wide text-foreground">
                                {currentTrekker.name}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                <div className="inline-flex py-1 px-3 rounded-2xl items-center bg-content1/40 backdrop-blur-xl">
                                    {Array.from({ length: currentTrekker.star }, (_, i) => (
                                        <FaStar size={18} key={i} />
                                    ))}
                                </div>
                                <div className="inline-flex bg-[#36a] py-1 px-3 rounded-2xl items-center justify-center gap-1.5">
                                    <Image
                                        src={`/attack-types/${currentTrekker.attackType}.png`}
                                        alt={currentTrekker.attackType}
                                        loading="eager"
                                        height={16}
                                        width={16}
                                    />
                                    <span className="font-medium mb-0.5 text-white">{currentTrekker.attackType}</span>
                                </div>
                                <div
                                    className={cn(
                                        "inline-flex py-1 px-3 rounded-2xl items-center text-white",
                                        handleClassStyle(currentTrekker.class),
                                    )}
                                >
                                    {currentTrekker.class}
                                </div>
                                <div className="inline-flex bg-content1/40 backdrop-blur-xl py-1 px-3 rounded-2xl items-center justify-center gap-1">
                                    <Image
                                        src={`/elements/${currentTrekker.element}.png`}
                                        alt={currentTrekker.element}
                                        loading="eager"
                                        height={24}
                                        width={24}
                                    />
                                    <span className="font-medium mb-0.5">{currentTrekker.element}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <Tabs defaultTab="attributes">
                                <div className="flex">
                                    <Tab value="attributes" title="Attributes" />
                                    <Tab value="skills" title="Skills" />
                                    <Tab value="potential" title="Potential" />
                                    <Tab value="talent" title="Talent" />
                                    <Tab value="profile" title="Profile" />
                                </div>
                                <TabPanel value="attributes">a</TabPanel>
                                <SkillsTab trekker={currentTrekker} />
                                <TabPanel value="potential">c</TabPanel>
                                <TabPanel value="talent">d</TabPanel>
                                <TabPanel value="profile">e</TabPanel>
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
