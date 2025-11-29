"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export type ProvidersProps = {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
};

export const HeroProviders = ({ children, themeProps }: ProvidersProps) => {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </HeroUIProvider>
    );
};
