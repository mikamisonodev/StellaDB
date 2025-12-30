"use client";

import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";

import { ASSET_URL } from "@/config/constant";
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
            <div className="bg-primary/20 text-primary font-medium pr-2 pl-1 rounded-lg inline-flex items-center align-bottom">
                {word.icon && (
                    <Image
                        src={ASSET_URL + `/Assets/assetbundles/icon/zzzother/${word.icon}.png`}
                        alt={word.name}
                        height={25}
                        width={25}
                    />
                )}
                {word.name}
            </div>
        </Tooltip>
    );
};

export default Effect;
