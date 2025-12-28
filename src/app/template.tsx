"use client";

import Navbar from "@/components/navbar";
import { cn, imageOptimize } from "@/lib/utils";
import { useGlobalStore } from "@/store";

const Template = ({ children }: { children: React.ReactNode }) => {
    const { bgImage } = useGlobalStore();

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-center bg-cover bg-no-repeat blur-2xl scale-[1.1]",
                    "transition-background duration-100 delay-75",
                )}
                style={{
                    // Image aspect ratio is 24:17 so we want 80% it so 24 * 80 x 17 * 80 = 1920x1360 (idk)
                    background: `url(${imageOptimize(bgImage, 1920, 1360)})`,
                }}
            />
            {/* Overlay with dark/light mode support */}
            <div className="fixed top-0 h-screen w-screen bg-background/40 backdrop-blur-md" />
            <div className="relative top-14">
                <Navbar />
                {children}
            </div>
        </>
    );
};

export default Template;
