"use client";

import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";

import { ASSET_URL } from "@/config/constant";
import { cn } from "@/lib/utils";
import { Word } from "@/typings/word";

const Effect = ({ word }: { word: Word }) => {
    const tooltipContent = (
        <div className="max-w-sm pb-2">
            <h1 className="text-lg font-medium">{word.name}</h1>
            <p className="text-sm italic mb-2">Mark</p>
            <p className="bg-content2 px-2 py-1 rounded-md">{word.desc.replace(/\u000b/g, "\n")}</p>
        </div>
    );

    return (
        <Tooltip placement="top" content={tooltipContent} as="span">
            <span
                className={cn(
                    "bg-primary/50 text-white font-medium pr-2 rounded-lg inline-flex items-center align-bottom",
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
