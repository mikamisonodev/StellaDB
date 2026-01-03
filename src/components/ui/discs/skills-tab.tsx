"use client";

import { useState } from "react";
import { FaCompactDisc } from "react-icons/fa";

import DiscSkill from "@/components/ui/discs/disc-skill";
import Slider from "@/components/ui/slider";
import { TabPanel } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Disc } from "@/typings/discs";

type SkillsTabProps = {
    disc: Disc;
};

const SkillsTab = ({ disc }: SkillsTabProps) => {
    const [dupe, setDupe] = useState(1);
    const [harmonyLevel, setHarmonyLevel] = useState(1);

    return (
        <TabPanel className="space-y-4" value="skills">
            <DiscSkill dupe={dupe} skill={disc.mainSkill} label="Main Skill" />
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
            {disc.secondarySkill1 && (
                <DiscSkill dupe={harmonyLevel} skill={disc.secondarySkill1} label="Secondary Skill" />
            )}
            {disc.secondarySkill2 && (
                <DiscSkill dupe={harmonyLevel} skill={disc.secondarySkill2} label="Secondary Skill" />
            )}
            {(disc.secondarySkill1 || disc.secondarySkill2) && (
                <Slider
                    onChange={value => setHarmonyLevel(value)}
                    label={`Lv.${harmonyLevel}`}
                    value={harmonyLevel}
                    minValue={1}
                    maxValue={5}
                    step={1}
                />
            )}
        </TabPanel>
    );
};

export default SkillsTab;
