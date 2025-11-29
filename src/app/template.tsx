"use client";

import { imageOptimize } from "@/lib/utils";
import { useGlobalStore } from "@/store";

const Template = ({ children }: { children: React.ReactNode }) => {
    const { backgroundImage } = useGlobalStore();

    return (
        <>
            <div
                className="fixed inset-0 bg-center bg-cover bg-no-repeat blur-2xl scale-[1.1]"
                style={{
                    // Image aspect ratio is 24:17 so we want 80% it so 24 * 80 x 17 * 80 = 1920x1360 (idk)
                    backgroundImage: `url(${imageOptimize(`/backgrounds/${backgroundImage}.png`, 1920, 1360)})`,
                }}
            />
            <div className="relative min-h-screen bg-background/55">{children}</div>
        </>
    );
};

export default Template;
