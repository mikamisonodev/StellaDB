"use client";

import Image from "next/image";

import { ASSET_URL } from "@/config/constant";
import { imageOptimize } from "@/lib/utils";
import { useDataStore } from "@/store";
import { Item } from "@/typings/item";

type MaterialsProps = {
    materials: [string, number][];
};

const Materials = ({ materials }: MaterialsProps) => {
    const { itemSearch, item } = useDataStore();

    return (
        <div className="flex items-center justify-center gap-4 py-4">
            {materials.map(([key, value]) => {
                // I know this is weird, fix soon
                const itemSearchResult = itemSearch.search(key);
                const fullitem: Item = item[itemSearchResult[0].id];

                return (
                    <div
                        style={{ backgroundImage: `url(${imageOptimize(`/rarity/${fullitem.rarity}.png`, 64, 64)})` }}
                        className="size-16 flex items-center justify-center relative"
                        key={key}
                    >
                        <Image
                            src={ASSET_URL + `/Assets/assetbundles/icon/item/item_${fullitem.id}.png`}
                            alt={fullitem.name}
                            height={48}
                            width={48}
                        />
                        <div className="absolute -bottom-3 -right-4 px-2 bg-content1 rounded-2xl">
                            x{value.toLocaleString()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Materials;
