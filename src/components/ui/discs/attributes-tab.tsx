"use client";

import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Slider } from "@heroui/slider";
import { useState } from "react";
import { FaCompactDisc } from "react-icons/fa";
import { FaAnglesUp, FaEllipsis } from "react-icons/fa6";

import Attributes from "@/components/ui/attributes";
import Materials from "@/components/ui/materials";
import { TabPanel } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Disc } from "@/typings/discs";

type AttributesTabProps = {
    disc: Disc;
};

const AttributesTab = ({ disc }: AttributesTabProps) => {
    const [convertToT1, setConvertToT1] = useState(false);
    const [upgradeLevel, setUpgradeLevel] = useState(0);
    const [accumulate, setAccumulate] = useState(false);
    const [level, setLevel] = useState(1);
    const [dupe, setDupe] = useState(1);

    const handleUpgradeLevelChange = (value: number) => {
        const remaining = +(level !== 1) * (level % 10);

        setLevel(Math.max(10 * value + remaining, 1));
        setUpgradeLevel(value);
    };

    const handleMaximum = () => {
        setUpgradeLevel(8);
        setLevel(90);
        setDupe(6);
    };

    return (
        <TabPanel className="space-y-2" value="attributes">
            <Attributes
                attr={disc.stat[level + upgradeLevel - 1] as unknown as Record<string, number>}
                buff={{ ATK: dupe > 1 ? disc.dupe[dupe - 2].ATK : 0 }}
            />
            <div className="flex items-center w-full gap-4">
                <Slider
                    onChange={value => handleUpgradeLevelChange(value as number)}
                    renderThumb={props => (
                        <div {...props} className="size-5 rounded-full bg-default-foreground top-1/2" />
                    )}
                    classNames={{
                        track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-2",
                        filler: "bg-transparent",
                    }}
                    value={upgradeLevel}
                    className="w-full"
                    aria-label="Level"
                    maxValue={8}
                    minValue={0}
                    step={1}
                />
                <p className="bg-content1/40 backdrop-blur-xl whitespace-nowrap font-medium py-1 px-4 rounded-2xl">
                    Upgrade Lv.{upgradeLevel}
                </p>
            </div>
            <div className="flex items-center w-full gap-4">
                <Slider
                    onChange={value => setLevel(value as number)}
                    renderThumb={props => (
                        <div {...props} className="size-5 rounded-full bg-default-foreground top-1/2" />
                    )}
                    minValue={Math.max(10 * upgradeLevel, 1)}
                    classNames={{
                        track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-2",
                        filler: "bg-transparent",
                    }}
                    maxValue={10 * (upgradeLevel + 1)}
                    className="w-full"
                    aria-label="Level"
                    value={level}
                    step={1}
                />
                <p className="bg-content1/40 backdrop-blur-xl whitespace-nowrap font-medium py-1 px-4 rounded-2xl">
                    Lv.{level}
                </p>
            </div>
            <div className="bg-content1/40 backdrop-blur-xl rounded-xl py-2 px-3 text-center">
                <div className="flex items-center gap-3">
                    <div className="bg-content1/40 px-4 py-1 rounded-2xl">
                        <Checkbox
                            isSelected={accumulate}
                            classNames={{ wrapper: "before:border-content1-foreground/30" }}
                            onValueChange={checked => setAccumulate(checked)}
                        >
                            <span className="text-foreground">Accumulate</span>
                        </Checkbox>
                    </div>
                    <div className="bg-content1/40 px-4 py-1 rounded-2xl">
                        <Checkbox
                            isSelected={convertToT1}
                            classNames={{ wrapper: "before:border-content1-foreground/30" }}
                            onValueChange={checked => setConvertToT1(checked)}
                        >
                            <span className="text-foreground">Convert to Tier 1</span>
                        </Checkbox>
                    </div>
                </div>
                {upgradeLevel !== 0 ? (
                    <Materials disc={disc} upgradeLevel={upgradeLevel} accumulate={accumulate} />
                ) : (
                    <p className="py-4">No materials required.</p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center bg-content1/40 backdrop-blur-xl rounded-2xl py-2 px-3 gap-1">
                    {Array.from({ length: disc.dupe.length + 1 }, (_, i) => (
                        <FaCompactDisc
                            onClick={() => setDupe(i + 1)}
                            className={cn(dupe <= i && "opacity-40")}
                            size={20}
                            key={i}
                        />
                    ))}
                </div>
                <Dropdown placement="left" classNames={{ content: "bg-default-100" }}>
                    <DropdownTrigger>
                        <Button className="bg-content1/40 backdrop-blur-xl rounded-full" isIconOnly>
                            <FaEllipsis />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="max" onPress={handleMaximum} startContent={<FaAnglesUp />}>
                            Set all to maximum
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </TabPanel>
    );
};

export default AttributesTab;
