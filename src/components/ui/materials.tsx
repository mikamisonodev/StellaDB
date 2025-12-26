"use client";

import { Disc } from "@/typings/discs";

type MaterialsProps = {
    disc: Disc;
    upgradeLevel: number;
    accumulate: boolean;
};

const Materials = ({ disc, upgradeLevel, accumulate }: MaterialsProps) => {
    const caclulateMaterials = () => {
        if (!accumulate) return disc.upgrade[upgradeLevel - 1];

        const accumulatedMaterials: Record<string, number> = {};

        for (let i = 0; i < upgradeLevel; i++) {
            const materials = disc.upgrade[i];

            for (const [key, value] of Object.entries(materials)) {
                accumulatedMaterials[key] = accumulatedMaterials[key] ? accumulatedMaterials[key] + value : value;
            }
        }

        return accumulatedMaterials;
    };

    return (
        <div className="py-4">
            {Object.entries(caclulateMaterials())
                .map(([key, value]) => `${key}: ${value.toLocaleString()}`)
                .join(" | ")}
        </div>
    );
};

export default Materials;
