"use client";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useMemo, useState } from "react";
import { FaCompactDisc } from "react-icons/fa";
import { FaAnglesUp, FaEllipsis } from "react-icons/fa6";

import Attributes from "@/components/ui/attributes";
import Materials from "@/components/ui/materials";
import Slider from "@/components/ui/slider";
import { TabPanel } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Disc } from "@/typings/discs";

type AttributesTabProps = {
    disc: Disc;
};

const AttributesTab = ({ disc }: AttributesTabProps) => {
    const [upgradeLevel, setUpgradeLevel] = useState(0);
    const [level, setLevel] = useState(1);
    const [dupe, setDupe] = useState(1);

    const attributes = useMemo(() => {
        return Object.assign(disc.stat[level + upgradeLevel - 1], disc.supportNote[upgradeLevel]);
    }, [level, upgradeLevel]);

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
            <Attributes attr={attributes} buff={{ ATK: dupe > 1 ? disc.dupe[dupe - 2].ATK : 0 }} />
            <Slider
                onChange={value => handleUpgradeLevelChange(value as number)}
                value={upgradeLevel}
                maxValue={8}
                minValue={0}
                label={`Upgrade Lv.${upgradeLevel}`}
                step={1}
            />
            <Slider
                onChange={value => setLevel(value)}
                value={level}
                minValue={Math.max(10 * upgradeLevel, 1)}
                maxValue={10 * (upgradeLevel + 1)}
                label={`Lv.${level}`}
                step={1}
            />
            <Materials upgrades={disc.upgrade} upgradeLevel={upgradeLevel} />
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
