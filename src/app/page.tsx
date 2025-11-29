"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";

import { siteConfig } from "@/config/sites";

const Home = () => {
    const serverResetTime = useMemo(() => {
        const now = new Date();
        const dayOfWeek = now.getUTCDay();

        const resetTime = new Date(now);

        // Calculate days until next Tuesday
        let daysUntilReset = 2 - dayOfWeek;

        // If today is Tuesday or later in the week, calculate days until next week's reset
        if (daysUntilReset <= 0) {
            daysUntilReset += 7;
        }

        // Server resets every Tuesday at 20:00 UTC-7 (which is 03:00 UTC on Wednesday)
        resetTime.setUTCDate(now.getUTCDate() + daysUntilReset);
        resetTime.setUTCHours(20, 0, 0, 0);

        return resetTime;
    }, []);

    const getRemainingTime = () => {
        const now = new Date();
        let remaining = (serverResetTime.getTime() - now.getTime()) / 1000;

        const days = Math.floor(remaining / 86400)
            .toString()
            .padStart(2, "0");

        remaining %= 86400;

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

        return `${days} days ${hours}:${minutes}:${seconds}`;
    };

    const [remainingTime, setRemainingTime] = useState("00 days 00:00:00");
    const formatedResetTime = useMemo(() => {
        return format(serverResetTime, "p, O");
    }, [serverResetTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remainingTime]);

    return (
        <div className="container mx-auto max-w-7xl py-16 px-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold my-6">Logo</h1>
                <p>
                    <strong>{siteConfig.name}</strong> is an unofficial database for the game{" "}
                    <strong>Stella Sora</strong> developed by Yostar.
                </p>
                <p>
                    This site is <strong>still in active development</strong>. If you have any suggestions or feedback,
                    please feel free to reach out our{" "}
                    <Link className="font-semibold" href="/github">
                        GitHub
                    </Link>
                    .
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 my-6">
                {siteConfig.features.map((item, i) => (
                    <Link
                        className="flex items-center bg-background/20 hover:bg-background/30 transition-background rounded-lg py-2.5 px-3"
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
                            <h2 className="font-semibold text-lg">{item.title}</h2>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">
                    <FaRegCalendar className="inline mb-1 mr-2" />
                    Current Events
                </h3>
                <p>
                    Server reset in{" "}
                    <span className="font-semibold">
                        {remainingTime} ({formatedResetTime})
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Home;
