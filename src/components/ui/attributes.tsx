"use client";

import { IconType } from "react-icons";
import { PiHeartFill, PiSwordFill } from "react-icons/pi";

const icons: Record<string, IconType> = {
    ATK: PiSwordFill,
    HP: PiHeartFill,
};

type AttributesProps = {
    attr: Record<string, number>;
};

const Attributes = ({ attr }: AttributesProps) => {
    return (
        <div className="grid grid-cols-2 py-2 px-3 gap-4 bg-content1/40 backdrop-blur-xl rounded-md">
            {Object.entries(attr).map(([key, value]) => {
                const Icon = icons[key as keyof typeof icons];

                return (
                    <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Icon size={18} className="h-4.5" />
                            <span className="mb-0.5">{key}</span>
                        </div>
                        <p className="mb-0.5 font-semibold">{value.toLocaleString()}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Attributes;
