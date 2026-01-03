"use client";

import { Checkbox } from "@heroui/checkbox";
import Image from "next/image";
import { useMemo, useState } from "react";

import { ASSET_URL } from "@/config/constant";
import { imageOptimize } from "@/lib/utils";
import { useDataStore } from "@/store";
import { Item } from "@/typings/item";

type MaterialsProps = {
    upgrades: Record<string, number>[];
    upgradeLevel: number;
    startLevel?: number;
};

const Materials = ({ upgrades, upgradeLevel, startLevel = 0 }: MaterialsProps) => {
    const [accumulate, setAccumulate] = useState(false);
    const { itemSearch, item } = useDataStore();

    const caclulateMaterials = useMemo(() => {
        if (upgradeLevel === startLevel || upgradeLevel > upgrades.length + 1) {
            return { Dorra: 0, materials: [] };
        }

        if (!accumulate) {
            const { Dorra: requiredDorra, ...rest } = upgrades[upgradeLevel - startLevel - 1];
            return { Dorra: requiredDorra, materials: Object.entries(rest) };
        }

        const accumulatedMaterials: Record<string, number> = {};

        // Some upgrades might using emlem to upgrade, so we need to limit the range
        const accumulatedRange = Math.min(upgradeLevel - startLevel, upgrades.length);

        for (let i = 0; i < accumulatedRange; i++) {
            for (const [key, value] of Object.entries(upgrades[i])) {
                accumulatedMaterials[key] = accumulatedMaterials[key] ? accumulatedMaterials[key] + value : value;
            }
        }

        const { Dorra, ...materials } = accumulatedMaterials;
        return { Dorra, materials: Object.entries(materials) };
    }, [accumulate, upgradeLevel]);

    return (
        <div className="bg-content1/40 backdrop-blur-xl rounded-xl py-2 px-3 text-center">
            <div className="flex items-center justify-between">
                <div className="bg-content1/40 px-4 py-1 rounded-2xl">
                    <Checkbox
                        isSelected={accumulate}
                        classNames={{ wrapper: "before:border-content1-foreground/30" }}
                        onValueChange={checked => setAccumulate(checked)}
                    >
                        Accumulate
                    </Checkbox>
                </div>
                <div className="flex items-center bg-content1/40 pl-2 pr-4 rounded-2xl">
                    <Image src="/icons/Dorra.png" width={32} height={32} alt="Dorra" />
                    <span>x{caclulateMaterials.Dorra.toLocaleString()}</span>
                </div>
            </div>
            {upgradeLevel !== startLevel && upgradeLevel <= upgrades.length + 1 ? (
                <div className="flex items-center justify-center gap-4 py-4">
                    {caclulateMaterials.materials.map(([key, value]) => {
                        // I know this is weird, fix soon
                        const itemSearchResult = itemSearch.search(key);
                        const fullitem: Item = item[itemSearchResult[0].id];

                        return (
                            <div
                                style={{
                                    backgroundImage: `url(${imageOptimize(`/rarity/${fullitem.rarity}.png`, 64, 64)})`,
                                }}
                                className="size-16 flex items-center justify-center relative"
                                key={key}
                            >
                                <Image
                                    src={ASSET_URL + `/Assets/assetbundles/icon/item/item_${fullitem.id}.png`}
                                    alt={fullitem.name}
                                    height={48}
                                    width={48}
                                />
                                <div className="absolute -bottom-3 -right-4 px-2 bg-default rounded-2xl">
                                    x{value.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="py-4">No materials required.</p>
            )}
        </div>
    );
};

export default Materials;
