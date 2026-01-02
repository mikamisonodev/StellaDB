"use client";

import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";
import { JSX, useMemo } from "react";

import { ASSET_URL, COLOR_REGEX } from "@/config/constant";
import { cn } from "@/lib/utils";
import { Word } from "@/typings/word";

const VARIABLE_REGEX = /(&Param\d+&)/g;
const SPLIT_REGEX = /(&Param\d+&)|\u000b/g;

const EfectContent = ({ word }: { word: Word }) => {
    const description = useMemo(() => {
        const rawDesc = word.desc.replace(COLOR_REGEX, "$2");
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

                result.push(
                    <span className="font-medium" key={i}>
                        {word.params[paramIndex]}
                    </span>,
                );
            } else {
                result.push(part);
            }
        }

        return result;
    }, []);

    return (
        <div className="max-w-sm pb-2">
            <h1 className="text-lg font-medium">{word.name}</h1>
            <p className="text-sm italic mb-2">Effect</p>
            <p className="bg-content2 px-2 py-1 rounded-md">{description}</p>
        </div>
    );
};

const Effect = ({ word }: { word: Word }) => {
    return (
        <Tooltip placement="top" content={<EfectContent word={word} />} as="span">
            <span
                className={cn(
                    "bg-primary-200 text-white font-medium pr-2 rounded-lg inline-flex items-center align-bottom",
                    word.icon ? "pl-1" : "px-2",
                )}
            >
                {word.icon && (
                    <Image
                        src={ASSET_URL + `/Assets/assetbundles/icon/zzzother/${word.icon}.png`}
                        alt={word.name}
                        height={25}
                        width={25}
                    />
                )}
                {word.name}
            </span>
        </Tooltip>
    );
};

export default Effect;
