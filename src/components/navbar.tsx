"use client";

import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import SearchUI from "@/components/search-ui";
import ThemeToggle from "@/components/theme-toggle";
import { siteConfig } from "@/config/sites";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <HeroUINavbar maxWidth="full" height="3.5rem" className="fixed top-0 bg-content1/60 backdrop-blur-md">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-6 max-w-fit">
                    <NavbarMenuToggle className="lg:hidden h-6" />
                    <NextLink href="/">Logo</NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-8 justify-start ml-8">
                    {siteConfig.navItems.map((item, i) => (
                        <NavbarItem key={i}>
                            <NextLink
                                href={item.href}
                                className={cn(
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                    linkStyles({
                                        className: "text-foreground/65 hover:text-foreground transition-colors",
                                        color: "foreground",
                                    }),
                                )}
                            >
                                <item.icon className="mr-2 mb-0.5" />
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>
            <NavbarContent justify="end">
                <SearchUI />
                <ThemeToggle />
            </NavbarContent>

            <NavbarMenu className="bg-content1/80 backdrop-blur-lg px-3">
                <div className="mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, i) => (
                        <NavbarMenuItem key={i}>
                            <Link
                                className={cn(
                                    "py-1.5 px-3 rounded-lg text-foreground/80 hover:text-foreground transition-colors w-full",
                                    {
                                        "bg-foreground/10 text-foreground":
                                            item.href.length > 1
                                                ? pathname.startsWith(item.href)
                                                : pathname === item.href,
                                    },
                                )}
                                color="foreground"
                                href={item.href}
                                size="lg"
                            >
                                <item.icon className="mr-2 mb-0.5" />
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};

export default Navbar;
