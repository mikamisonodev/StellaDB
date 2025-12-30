"use client";

import Image from "next/image";
import { type JSX, useMemo } from "react";

import Effect from "@/components/ui/effect";
import { ASSET_URL } from "@/config/constant";
import { imageOptimize } from "@/lib/utils";
import { useDataStore } from "@/store";
import type { Skill } from "@/typings/discs";

type DiscSkillProps = {
    dupe: number;
    skill: Skill;
    label: string;
};

const VARIABLE_REGEX = /(\{\d+\})/g;
const COLOR_REGEX = /<color=#ec6d21>(.*?)<\/color>/g;
const MARK_REGEX = /(##.*?#\d{1,4}#)/g;
const MARK_VAR_REGEX = /##(.*?)#(\d{1,4})#/;

const DiscSkill = ({ dupe, skill, label }: DiscSkillProps) => {
    const { word } = useDataStore();

    const descriptionWithVar = useMemo(() => {
        const rawDesc = skill.desc.replace(COLOR_REGEX, "$1").split(VARIABLE_REGEX);
        const params = skill.params.split("/")[dupe - 1].split(",");

        const result: (string | JSX.Element)[] = [];

        for (const part of rawDesc) {
            if (VARIABLE_REGEX.test(part)) {
                const index = part.slice(1, -1);
                result.push(
                    <span className="font-medium" key={part}>
                        {params[parseInt(index) - 1]}
                    </span>,
                );
            } else {
                const cleanedPart = part.replace(/\u000b/g, "\n");
                const subParts = cleanedPart.split(MARK_REGEX);

                for (const subPart of subParts) {
                    if (MARK_REGEX.test(subPart)) {
                        const match = MARK_VAR_REGEX.exec(subPart)!;
                        const effect = word[match[2]];

                        result.push(<Effect word={effect} key={subPart} />);
                    } else {
                        result.push(subPart);
                    }
                }
            }
        }

        return result;
    }, [dupe]);

    return (
        <div className="bg-content1/40 backdrop-blur-xl rounded-xl p-4 space-y-2">
            <div className="flex">
                <div
                    className="size-16 bg-center bg-no-repeat bg-contain"
                    style={{
                        backgroundImage: `url(${imageOptimize(ASSET_URL + `/Assets/assetbundles/icon/discskill/${skill.iconBg}.png`, 64, 64)})`,
                    }}
                >
                    <Image
                        src={ASSET_URL + `/Assets/assetbundles/icon/discskill/${skill.icon}.png`}
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

export default DiscSkill;
