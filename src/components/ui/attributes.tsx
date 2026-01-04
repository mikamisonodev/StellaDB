"use client";

import { IconType } from "react-icons";
import { FaBolt } from "react-icons/fa6";
import { PiHeartFill, PiMusicNoteFill, PiShieldFill, PiSwordFill } from "react-icons/pi";

import { cn } from "@/lib/utils";

const icons: Record<string, IconType> = {
    // Basic stats
    ATK: PiSwordFill,
    HP: PiHeartFill,
    "Max HP": PiHeartFill,
    DEF: PiShieldFill,
    Crit: PiSwordFill,
    "Crit DMG": PiSwordFill,
    "Resilience Break DMG": PiShieldFill,
    "VUL Exploit": PiSwordFill,
    "Max Energy": FaBolt,
    "Charge Efficiency (Main)": FaBolt,
    "Charge Efficiency (Support)": FaBolt,
    "DEF PEN": PiShieldFill,
    "Ignore DEF": PiShieldFill,

    // Element DMG
    "Ventus DMG": PiSwordFill,
    "Ventus PEN": PiSwordFill,
    "Ignore Ventus RES": PiSwordFill,
    "Aqua DMG": PiSwordFill,
    "Aqua PEN": PiSwordFill,
    "Ignore Aqua RES": PiSwordFill,
    "Ignis DMG": PiSwordFill,
    "Ignis PEN": PiSwordFill,
    "Ignore Ignis RES": PiSwordFill,
    "Terra DMG": PiSwordFill,
    "Terra PEN": PiSwordFill,
    "Ignore Terra RES": PiSwordFill,
    "Umbra DMG": PiSwordFill,
    "Umbra PEN": PiSwordFill,
    "Ignore Umbra RES": PiSwordFill,
    "Lux DMG": PiSwordFill,
    "Lux PEN": PiSwordFill,
    "Ignore Lux RES": PiSwordFill,

    // General DMG types
    "Skill DMG": PiSwordFill,
    "Ultimate DMG": PiSwordFill,

    // Support Melodies
    "Melody of Pummel": PiMusicNoteFill,
    "Melody of Skill": PiMusicNoteFill,
    "Melody of Ultimate": PiMusicNoteFill,
    "Melody of Stamina": PiMusicNoteFill,
    "Melody of Focus": PiMusicNoteFill,
    "Melody of Ignis": PiMusicNoteFill,
    "Melody of Lux": PiMusicNoteFill,
    "Melody of Ventus": PiMusicNoteFill,
    "Melody of Aqua": PiMusicNoteFill,
    "Melody of Umbra": PiMusicNoteFill,
    "Melody of Terra": PiMusicNoteFill,
    "Melody of Burst": PiMusicNoteFill,
    "Melody of Luck": PiMusicNoteFill,
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
                const buffValue = buff && key in buff ? buff[key] : 0;

                // Use a default icon if the key is not found in the icons mapping
                const Icon = icons[key as keyof typeof icons];

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
