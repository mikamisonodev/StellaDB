import { FaBox, FaCompactDisc, FaCrosshairs, FaHouse, FaRegIdCard, FaUserGroup } from "react-icons/fa6";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "StellaDB",
    description: "A database for the game Stella Sora.",
    navItems: [
        { label: "Trekkers", href: "/trekkers", icon: FaUserGroup },
        { label: "Discs", href: "/discs", icon: FaCompactDisc },
        { label: "Items", href: "/items", icon: FaBox },
        { label: "Raids", href: "/raids", icon: FaCrosshairs },
        { label: "Badges", href: "/badges", icon: FaRegIdCard },
    ],
    navMenuItems: [
        { label: "Home", href: "/", icon: FaHouse },
        { label: "Trekkers", href: "/trekkers", icon: FaUserGroup },
        { label: "Discs", href: "/discs", icon: FaCompactDisc },
        { label: "Items", href: "/items", icon: FaBox },
        { label: "Raids", href: "/raids", icon: FaCrosshairs },
        { label: "Badges", href: "/badges", icon: FaRegIdCard },
    ],
    links: {
        github: "https://github.com/mikamisonodev/StellaDB",
    },
    features: [
        {
            title: "Trekkers",
            description: "View stats, skills, emblems, potentials, and more for all playable Trekkers.",
            logo: "/features/Trekkers.png",
            href: "/trekkers",
        },
        {
            title: "Discs",
            description: "Browse through the various Discs available in the game.",
            logo: "/features/Discs.png",
            href: "/discs",
        },
        {
            title: "Items",
            description: "Explore a detailed catalog of items found in Stella Sora.",
            logo: "/features/Items.png",
            href: "/items",
        },
        {
            title: "Raids",
            description: "Get information on Raids, including strategies and weaknesses.",
            logo: "/features/Raids.png",
            href: "/raids",
        },
        {
            title: "Badges",
            description: "Discover the different Badges you can earn in Stella Sora.",
            logo: "/features/Badges.png",
            href: "/badges",
        },
        {
            title: "Record Simulator",
            description: "Simulate and analyze your Record setups for optimal performance.",
            logo: "/features/RecordSimulator.png",
            href: "/records",
        },
    ],
};
