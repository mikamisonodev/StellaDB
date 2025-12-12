"use client";

import Image from "next/image";
import Link from "next/link";

import { ASSET_URL } from "@/config/constant";
import { handleRarityColor } from "@/config/styles";
import { cn } from "@/lib/utils";
import type { Disc } from "@/typings/discs";

type DiscCardProps = {
    disc: Disc;
};

const DiscCard = ({ disc }: DiscCardProps) => {
    return (
        <div className="relative">
            <div
                className={cn("rounded-lg p-1.5 bg-linear-to-r", handleRarityColor(disc.star))}
                style={{
                    mask: "linear-gradient(transparent 0 0) content-box, linear-gradient(#000 0 0)",
                    maskComposite: "exclude",
                }}
            >
                <Link className="block relative aspect-square overflow-hidden rounded-md" href={`/discs/${disc.id}`}>
                    <div className="absolute inset-0">
                        <Image
                            src={`${ASSET_URL}/Assets/assetbundles/icon/outfit/outfit_${disc.id.toString().replace(/^.{2}/, "")}.png`}
                            className="object-cover object-top"
                            alt={disc.name}
                            loading="eager"
                            sizes="100%"
                            fill
                        />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 to-transparent px-1.5">
                        <p className="font-semibold pt-3 pb-1">{disc.name}</p>
                    </div>
                </Link>
            </div>
            <Image
                className="absolute -top-2 -left-2 w-12 h-12"
                src={`/elements/${disc.element}.png`}
                alt={disc.element}
                height={48 * 2}
                width={48 * 2}
            />
        </div>
    );
};

export default DiscCard;
