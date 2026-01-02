"use client";

import { Slider } from "@heroui/slider";
import { useState } from "react";

import { TabPanel } from "@/components/ui/tabs";
import TrekkerSkill from "@/components/ui/trekkers/trekker-skill";
import { Trekker } from "@/typings/trekker";

type SkillsTabProps = {
    trekker: Trekker;
};

const SkillsTab = ({ trekker }: SkillsTabProps) => {
    const [level, setLevel] = useState(1);
    const [upgradeLevel, setUpgradeLevel] = useState(0);

    return (
        <TabPanel className="space-y-4" value="skills">
            <div className="flex items-center w-full gap-4">
                <Slider
                    onChange={value => setUpgradeLevel(value as number)}
                    renderThumb={props => (
                        <div {...props} className="size-5 rounded-full bg-default-foreground top-1/2" />
                    )}
                    minValue={0}
                    classNames={{
                        track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-2",
                        filler: "bg-transparent",
                    }}
                    maxValue={8}
                    className="w-full"
                    aria-label="Level"
                    value={upgradeLevel}
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
                    minValue={1}
                    classNames={{
                        track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-2",
                        filler: "bg-transparent",
                    }}
                    maxValue={13}
                    className="w-full"
                    aria-label="Level"
                    value={level}
                    step={1}
                />
                <p className="bg-content1/40 backdrop-blur-xl whitespace-nowrap font-medium py-1 px-4 rounded-2xl">
                    Lv.{level}
                </p>
            </div>
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.normalAtk} label="Normal Attack" />
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.skill} label="Main Skill" />
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.supportSkill} label="Support Skill" />
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.ultimate} label="Ultimate Skill" />
        </TabPanel>
    );
};

export default SkillsTab;
