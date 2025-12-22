"use client";

import type { NextPage } from "next";
import { startTransition, use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

import DiscImage from "@/components/ui/discs/image";
import { Tab, TabPanel, Tabs } from "@/components/ui/tabs";
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
                        <DiscImage id={currentDisc.id.toString()} name={currentDisc.name} />
                    </div>
                    <div className="space-y-6 py-2">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-exo italic tracking-wide text-foreground">
                                {currentDisc.name}
                            </h1>
                            <div className="inline-flex py-1 px-3 rounded-xl items-center bg-content1/40 backdrop-blur-xl">
                                {Array.from({ length: currentDisc.star }, (_, i) => (
                                    <FaStar size={18} key={i} />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Tabs defaultTab="attributes">
                                <div className="flex">
                                    <Tab value="attributes" title="Attributes" />
                                    <Tab value="skills" title="Skills" />
                                </div>
                                <TabPanel value="attributes">Attributes</TabPanel>
                                <TabPanel value="skills">Skills</TabPanel>
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
