"use client";

import { useState } from "react";

import Materials from "@/components/ui/materials";
import Slider from "@/components/ui/slider";
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
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.normalAtk} label="Normal Attack" />
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.skill} label="Main Skill" />
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.supportSkill} label="Support Skill" />
            <TrekkerSkill level={level} upgrade={upgradeLevel} skill={trekker.ultimate} label="Ultimate Skill" />
            <Slider
                onChange={value => setUpgradeLevel(value)}
                value={upgradeLevel}
                maxValue={8}
                minValue={0}
                label={`Upgrade Lv.${upgradeLevel}`}
                step={1}
            />
            <Slider
                onChange={value => setLevel(value)}
                value={level}
                minValue={1}
                maxValue={13}
                label={`Lv.${level}`}
                step={1}
            />
            <Materials upgrades={trekker.skillUpgrade} upgradeLevel={level} startLevel={1} />
        </TabPanel>
    );
};

export default SkillsTab;
