"use client";

import Image from "next/image";
import { type JSX, useMemo } from "react";

import Effect from "@/components/ui/effect";
import { ASSET_URL, COLOR_REGEX, MARK_REGEX, MARK_VAR_REGEX } from "@/config/constant";
import { imageOptimize } from "@/lib/utils";
import { useDataStore } from "@/store";
import type { Skill } from "@/typings/discs";
import { Item } from "@/typings/item";

type DiscSkillProps = {
    dupe: number;
    skill: Skill;
    label: string;
};

const VARIABLE_REGEX = /(\{\d+\})/g;
const SPLIT_REGEX = /(\{\d+\})|\u000b/g;

const DiscSkill = ({ dupe, skill, label }: DiscSkillProps) => {
    const { word, item, itemSearch } = useDataStore();

    const descriptionWithVar = useMemo(() => {
        const rawDesc = skill.desc.replace(COLOR_REGEX, "$2");
        const params = skill.params.split("/")[dupe - 1].split(",");
        const result: (string | JSX.Element)[] = [];

        const parts = rawDesc.split(SPLIT_REGEX);

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (!part) {
                result.push(<br key={i} />);
                continue;
            }

            if (VARIABLE_REGEX.test(part)) {
                const index = part.slice(1, -1);

                result.push(
                    <span className="font-medium" key={i}>
                        {params[parseInt(index) - 1]}
                    </span>,
                );
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
    }, [dupe]);

    const requirements = useMemo(() => {
        if (!skill.requirements) return [];

        return Object.entries(skill.requirements[dupe - 1]).map(([key, value]) => {
            const noteItem = itemSearch.search(key);
            const note: Item = item[noteItem[0].id];

            return { note, value };
        });
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
            {skill.requirements && (
                <div className="flex items-center gap-3">
                    {requirements.map(req => (
                        <div className="flex items-center" key={req.note.id}>
                            <Image
                                src={ASSET_URL + `/Assets/assetbundles/icon/note/note_${req.note.id}_S.png`}
                                alt={req.note.name}
                                height={32}
                                width={32}
                            />
                            <span>{req.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiscSkill;
