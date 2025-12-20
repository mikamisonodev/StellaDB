import "./globals.css";

import type { Metadata, Viewport } from "next";

import { HeroProviders } from "@/components/providers/hero-providers";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/sites";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html suppressHydrationWarning lang="en" dir="ltr">
            <body className={cn("text-foreground bg-background antialiased font-sans min-h-screen", fontSans.variable)}>
                <HeroProviders themeProps={{ attribute: "class", defaultTheme: "light" }}>{children}</HeroProviders>
            </body>
        </html>
    );
};

export default RootLayout;
