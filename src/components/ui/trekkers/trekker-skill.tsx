"use client";

import Image from "next/image";
import { JSX, useMemo } from "react";

import Effect from "@/components/ui/effect";
import { ASSET_URL, COLOR_REGEX, MARK_REGEX, MARK_VAR_REGEX } from "@/config/constant";
import { useDataStore } from "@/store";
import type { Skill } from "@/typings/trekker";

type DiscSkillProps = {
    level: number;
    upgrade?: number;
    skill: Skill;
    label: string;
};

const VARIABLE_REGEX = /(&Param\d+&)/g;
const SPLIT_REGEX = /(&Param\d+&)|\u000b/g;

const TrekkerSkill = ({ level, upgrade = 0, skill, label }: DiscSkillProps) => {
    const { word } = useDataStore();

    const descriptionWithVar = useMemo(() => {
        const rawDesc = skill.desc.replace(COLOR_REGEX, "$2");
        const parts = rawDesc.split(SPLIT_REGEX);

        const result: (string | JSX.Element)[] = [];

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (!part) {
                result.push(<br key={i} />);
                continue;
            }

            if (VARIABLE_REGEX.test(part)) {
                const paramIndex = parseInt(part.slice(6, -1)) - 1;
                const param = skill.params[paramIndex];

                if (typeof param === "string") {
                    const formatedParam = param.split("/");
                    let index: number;

                    switch (formatedParam.length) {
                        // Determine index based on upgrade level
                        case 9:
                            index = upgrade;
                            break;
                        // Determine index based on level
                        case 13:
                            index = level - 1;
                            break;
                        default:
                            index = 0;
                    }

                    result.push(
                        <span className="font-medium" key={i}>
                            {formatedParam[index]}
                        </span>,
                    );
                } else {
                    result.push(
                        <span className="font-medium" key={i}>
                            {param.toLocaleString()}
                        </span>,
                    );
                }
            } else {
                const subParts = part.split(MARK_REGEX);

                for (const subPart of subParts) {
                    const match = MARK_VAR_REGEX.exec(subPart);

                    if (match) {
                        const effect = word[match[2]];

                        result.push(<Effect word={effect} key={subPart} />);
                    } else {
                        result.push(subPart);
                    }
                }
            }
        }

        return result;
    }, [level, upgrade]);

    return (
        <div className="bg-content1/40 backdrop-blur-xl rounded-xl p-4 space-y-2">
            <div className="flex">
                <div className="bg-[#36a] rounded-md">
                    <Image
                        src={ASSET_URL + `/Assets/assetbundles/icon/skill/${skill.icon}.png`}
                        className="size-16"
                        alt={skill.name}
                        height={64}
                        width={64}
                    />
                </div>
                <div className="ml-3">
                    <h1 className="font-medium text-xl">{skill.name}</h1>
                    <p className="italic">{label}</p>
                </div>
            </div>
            <p>{descriptionWithVar}</p>
        </div>
    );
};

export default TrekkerSkill;
