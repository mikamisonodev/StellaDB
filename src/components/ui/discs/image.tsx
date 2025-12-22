"use client";

import Image from "next/image";

import { ASSET_URL } from "@/config/constant";

type DiscImageProps = {
    name: string;
    id: string;
};

const DiscImage = ({ id, name }: DiscImageProps) => {
    const discId = id.toString().replace(/^.{2}/, "");

    return (
        <Image
            src={`${ASSET_URL}/Assets/assetbundles/disc/${discId}/${discId}_B.png`}
            className="object-cover object-top rounded-lg h-full"
            height={600}
            width={600}
            alt={name}
        />
    );
};

export default DiscImage;
