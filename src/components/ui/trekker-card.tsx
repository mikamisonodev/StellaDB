"use client";

import "./trekker-card.css";

import Image from "next/image";
import Link from "next/link";

import { ASSET_URL } from "@/config/constant";
import { Trekker } from "@/typings/trekker";

type TrekkerCardProps = {
    char: Trekker;
};

const TrekkerCard = ({ char }: TrekkerCardProps) => {
    return (
        <div className="card-wrapper">
            <div className={`card-border star${char.star}`}>
                <Link href={`/trekkers/${char.id}`} className="card">
                    <div className="image">
                        <Image
                            src={`${ASSET_URL}/Assets/assetbundles/icon/head/head_${char.id}01_XL.png`}
                            alt={char.name}
                            loading="eager"
                            fill
                            sizes="100vw"
                            style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                    </div>
                    <div className="halftone"></div>
                    <div className="text">
                        <p>{char.name}</p>
                    </div>
                    <div className={`char-info ${char.class.toLowerCase()}`}>
                        <div className="char-class">{char.class}</div>
                        <div className="attack-type">
                            <Image
                                src={`/attack-types/${char.attackType}.png`}
                                alt={char.attackType}
                                width={16 * 2}
                                height={16 * 2}
                                style={{ width: 16, height: 16 }}
                            />
                        </div>
                    </div>
                </Link>
            </div>
            <Image
                className="corner"
                src={`/elements/${char.element}.png`}
                alt={char.element}
                height={48 * 2}
                width={48 * 2}
                style={{ width: 48, height: 48 }}
            />
        </div>
    );
};

export default TrekkerCard;
