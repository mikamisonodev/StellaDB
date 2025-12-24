"use client";

import { Slider } from "@heroui/slider";
import { useState } from "react";

import Attributes from "@/components/ui/attributes";
import { TabPanel } from "@/components/ui/tabs";
import { Disc } from "@/typings/discs";

type AttributesTabProps = {
    disc: Disc;
};

const AttributesTab = ({ disc }: AttributesTabProps) => {
    const [potentialLevel, setPotentialLevel] = useState(9);
    const [level, setLevel] = useState(90);

    const handlePotentialLevelChange = (value: number) => {
        const remaining = +(level !== 1) * (level % 10);

        setLevel(Math.max(10 * (value - 1) + remaining, 1));
        setPotentialLevel(value);
    };

    return (
        <TabPanel className="space-y-2" value="attributes">
            <Attributes attr={disc.stat[level - 1] as unknown as Record<string, number>} />
            <div className="flex items-center w-full gap-4">
                <Slider
                    onChange={value => setLevel(value as number)}
                    renderThumb={props => (
                        <div {...props} className="size-5 rounded-full bg-default-foreground top-1/2" />
                    )}
                    minValue={Math.max(10 * (potentialLevel - 1), 1)}
                    classNames={{
                        track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-2",
                        filler: "bg-transparent",
                    }}
                    maxValue={10 * potentialLevel}
                    className="w-full"
                    aria-label="Level"
                    value={level}
                    step={1}
                />
                <p className="bg-content1/40 backdrop-blur-xl whitespace-nowrap font-medium py-1 px-4 rounded-2xl">
                    Lv.{level}
                </p>
            </div>
            <div className="flex items-center w-full gap-4">
                <Slider
                    onChange={value => handlePotentialLevelChange(value as number)}
                    renderThumb={props => (
                        <div {...props} className="size-5 rounded-full bg-default-foreground top-1/2" />
                    )}
                    classNames={{
                        track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-2",
                        filler: "bg-transparent",
                    }}
                    value={potentialLevel}
                    className="w-full"
                    aria-label="Level"
                    maxValue={9}
                    minValue={1}
                    step={1}
                />
                <p className="bg-content1/40 backdrop-blur-xl whitespace-nowrap font-medium py-1 px-4 rounded-2xl">
                    Potential Lv.{potentialLevel}
                </p>
            </div>
        </TabPanel>
    );
};

export default AttributesTab;
