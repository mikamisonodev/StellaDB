"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";

import { siteConfig } from "@/config/sites";
import { useGlobalStore } from "@/store";

const Home = () => {
    const { setBgImage } = useGlobalStore();

    useEffect(() => {
        startTransition(() => setBgImage("/backgrounds/MainMenu.png"));
    }, []);

    const getRemainingTime = () => {
        const now = new Date();

        // Next server reset time at 20:00 UTC
        const serverResetTime = new Date(now);
        serverResetTime.setUTCHours(20, 0, 0, 0);

        if (now.getTime() > serverResetTime.getTime()) {
            serverResetTime.setUTCDate(serverResetTime.getUTCDate() + 1);
        }

        let remaining = (serverResetTime.getTime() - now.getTime()) / 1000;
        const hours = Math.floor(remaining / 3600)
            .toString()
            .padStart(2, "0");

        remaining %= 3600;

        const minutes = Math.floor(remaining / 60)
            .toString()
            .padStart(2, "0");

        const seconds = Math.floor(remaining % 60)
            .toString()
            .padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    };

    const [remainingTime, setRemainingTime] = useState("00:00:00");
    const formatedResetTime = useMemo(() => {
        // Server resets at 20:00 UTC every day
        return format(new Date().setUTCHours(20, 0, 0, 0), "p O");
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setRemainingTime(getRemainingTime()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="container mx-auto max-w-7xl py-3 px-6">
            <div className="text-center text-foreground">
                <h1 className="text-4xl font-bold my-6">Logo</h1>
                <p>
                    <strong>{siteConfig.name}</strong> is an unofficial database for the game{" "}
                    <strong>Stella Sora</strong> developed by Yostar.
                </p>
                <p>
                    This site is <span className="font-bold">still in active development</span>. If you have any
                    suggestions or feedback, please feel free to reach out our{" "}
                    <Link
                        href={siteConfig.links.github}
                        rel="noopener noreferrer"
                        className="font-bold text-foreground transition-colors"
                        target="_blank"
                    >
                        GitHub
                    </Link>
                    .
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 my-6">
                {siteConfig.features.map((item, i) => (
                    <Link
                        className="flex items-center bg-content1/40 hover:bg-content2/60 backdrop-blur-xl transition-all duration-200 rounded-lg py-2.5 px-3"
                        href={item.href}
                        key={i}
                    >
                        <Image
                            className="object-contain mr-2"
                            alt={item.title}
                            src={item.logo}
                            height={64}
                            width={64}
                        />
                        <div>
                            <h2 className="font-semibold text-lg text-foreground">{item.title}</h2>
                            <p className="text-sm text-foreground/60">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="text-center space-y-2 text-foreground">
                <h3 className="text-2xl font-bold">
                    <FaRegCalendar className="inline mb-1 mr-2" />
                    Current Events
                </h3>
                <p className="text-foreground/60">
                    Server reset in{" "}
                    <strong className="text-foreground">
                        {remainingTime} ({formatedResetTime})
                    </strong>
                </p>
            </div>
        </div>
    );
};

export default Home;
