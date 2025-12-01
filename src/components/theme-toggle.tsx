"use client";

import { Button } from "@heroui/button";
import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();

    const handleChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button variant="flat" className="text-foreground bg-default-100/40" onPress={handleChange} isIconOnly>
            {!isSSR && theme === "dark" ? <FaRegMoon /> : <FaRegSun />}
        </Button>
    );
};

export default ThemeToggle;
