"use client";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useMemo, useState } from "react";
import { FaAnglesUp, FaEllipsis } from "react-icons/fa6";

import Attributes from "@/components/ui/attributes";
import Materials from "@/components/ui/materials";
import Slider from "@/components/ui/slider";
import { TabPanel } from "@/components/ui/tabs";
import { Trekker } from "@/typings/trekker";

type AttributesTabProps = {
    trekker: Trekker;
};

const AttributesTab = ({ trekker }: AttributesTabProps) => {
    const [upgradeLevel, setUpgradeLevel] = useState(0);
    const [level, setLevel] = useState(1);

    const stats = useMemo(() => {
        const basicStat = trekker.stat[level + upgradeLevel - 1];
        const formattedStat: Record<string, string | number> = {
            "Max HP": basicStat.hp,
            ATK: basicStat.atk,
            DEF: basicStat.def,
            Crit: basicStat.critRate,
            "Crit DMG": basicStat.critDmg,
            "Resilience Break DMG": basicStat.resilienceBreakEfficiency,
            "VUL Exploit": basicStat.vul,
            "Charge Efficiency (Main)": "100%",
            "Charge Efficiency (Support)": "75%",
            "Max Energy": trekker.ultimate.energy!,
            "DEF PEN": "0%",
            "Ignore DEF": "0%",
        };

        formattedStat[`${trekker.element} DMG`] = "100%";
        formattedStat[`${trekker.element} PEN`] = "0%";
        formattedStat[`Ignore ${trekker.element} RES`] = "0%";

        return formattedStat;
    }, [level, upgradeLevel]);

    const handleUpgradeLevelChange = (value: number) => {
        const remaining = +(level !== 1) * (level % 10);

        setLevel(Math.max(10 * value + remaining, 1));
        setUpgradeLevel(value);
    };

    const handleMaximum = () => {
        setUpgradeLevel(8);
        setLevel(90);
    };

    return (
        <TabPanel className="space-y-2" value="attributes">
            <Attributes doubleRows attr={stats} />
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
            <Materials upgradeLevel={upgradeLevel} upgrades={trekker.upgrade} />
            <Dropdown placement="right" classNames={{ content: "bg-default-100" }}>
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
        </TabPanel>
    );
};

export default AttributesTab;
