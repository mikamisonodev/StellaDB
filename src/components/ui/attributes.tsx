"use client";

import { IconType } from "react-icons";
import { PiHeartFill, PiMusicNoteFill, PiSwordFill } from "react-icons/pi";

import { cn } from "@/lib/utils";

const icons: Record<string, IconType> = {
    ATK: PiSwordFill,
    HP: PiHeartFill,
    "Ventus DMG": PiSwordFill,
    "Aqua DMG": PiSwordFill,
    "Ignis DMG": PiSwordFill,
    "Terra DMG": PiSwordFill,
    "Umbra DMG": PiSwordFill,
    "Lux DMG": PiSwordFill,
};

type AttributesProps = {
    attr: Record<string, number | string>;
    buff?: Record<string, number>;
    doubleRows?: boolean;
};

const Attributes = ({ attr, buff, doubleRows }: AttributesProps) => {
    return (
        <div
            className={cn(
                "py-2 px-3 bg-content1/40 backdrop-blur-xl rounded-md",
                doubleRows ? "grid grid-cols-2 gap-4" : "flex flex-col gap-2",
            )}
        >
            {Object.entries(attr).map(([key, value]) => {
                const buffValue = buff ? (key in buff ? buff[key] : 0) : 0;

                // Use a default icon if the key is not found in the icons mapping
                const Icon = icons[key as keyof typeof icons] ?? PiMusicNoteFill;

                return (
                    <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Icon size={18} className="h-4.5" />
                            <span className="mb-0.5">{key.startsWith("Melody") ? `Support: ${key}` : key}</span>
                        </div>
                        <p className="mb-0.5 font-semibold">
                            {typeof value === "number" ? (value + buffValue).toLocaleString() : value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Attributes;
