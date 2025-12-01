"use client";

import Image from "next/image";
import Link from "next/link";

import { ASSET_URL } from "@/config/constant";
import { cn } from "@/lib/utils";
import { Trekker } from "@/typings/trekker";

type TrekkerCardProps = {
    char: Trekker;
};

const TrekkerCard = ({ char }: TrekkerCardProps) => {
    return (
        <div className="relative">
            <div
                className={cn(
                    char.star === 4 ? "from-[#fd5] to-[#efc]" : "from-[#d8e] to-[#7ff]",
                    "rounded-lg pt-1 pb-2 bg-linear-to-r",
                )}
                style={{
                    mask: "linear-gradient(transparent 0 0) content-box, linear-gradient(#000 0 0)",
                    maskComposite: "exclude",
                }}
            >
                <Link className="block relative aspect-[1/1.3] overflow-hidden" href={`/trekkers/${char.id}`}>
                    <div className="absolute -inset-3">
                        <Image
                            src={`${ASSET_URL}/Assets/assetbundles/icon/head/head_${char.id}01_XL.png`}
                            className="object-cover object-top"
                            alt={char.name}
                            loading="eager"
                            fill
                        />
                    </div>
                    <div
                        className="absolute inset-0 bg-white scale-[1.4] mix-blend-screen"
                        style={{ filter: "contrast(8) invert(100%) opacity(.77) blur(.5px)" }}
                    >
                        <div
                            style={{ background: "linear-gradient(to top, black, transparent 33%)" }}
                            className="absolute inset-0"
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at center, black 10%, transparent 75%), radial-gradient(circle at center, black 10%, transparent 75%)",
                                maskImage: "linear-gradient(to top, #000, #0000 60%)",
                                backgroundPosition: "0 0, 2px 2px",
                                backgroundSize: "4px 4px",
                            }}
                        />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-transparent px-1.5">
                        <p className="text-lg font-semibold text-[#247] text-right">{char.name}</p>
                    </div>
                    <div
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 7% 100%)" }}
                        className={cn("flex absolute top-0 right-0 items-center", {
                            "bg-[#78e]": char.class === "Versatile",
                            "bg-[#d69]": char.class === "Vanguard",
                            "bg-[#4ca]": char.class === "Support",
                        })}
                    >
                        <div className="pr-1 pl-3 pb-0.5 text-sm text-white">{char.class}</div>
                        <div
                            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%)" }}
                            className="bg-[#36a] py-1 pr-2.5 pl-2.5"
                        >
                            <Image
                                src={`/attack-types/${char.attackType}.png`}
                                alt={char.attackType}
                                className="w-4 h-4"
                                height={16 * 2}
                                width={16 * 2}
                            />
                        </div>
                    </div>
                </Link>
            </div>
            <Image
                className="absolute -top-2 -left-2 w-12 h-12"
                src={`/elements/${char.element}.png`}
                alt={char.element}
                height={48 * 2}
                width={48 * 2}
            />
        </div>
    );
};

export default TrekkerCard;
