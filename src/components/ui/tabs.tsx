"use client";

import { Button } from "@heroui/button";
import { createContext, type Dispatch, type SetStateAction, useContext, useState } from "react";

import { cn } from "@/lib/utils";

const TabsContext = createContext<{
    setActive: Dispatch<SetStateAction<string>>;
    active: string;
}>({
    setActive: () => void 0,
    active: "",
});

type TabsProps = {
    children: React.ReactNode;
    defaultTab: string;
};

const useTab = () => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error("useTab must be used within a TabsProvider");
    }

    return context;
};

export const Tabs = ({ children, defaultTab }: TabsProps) => {
    const [active, setActive] = useState(defaultTab);

    return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
};

type TabProps = {
    title: string;
    value: string;
};

export const Tab = ({ title, value }: TabProps) => {
    const { active, setActive } = useTab();

    const handleClick = () => {
        setActive(value);
    };

    return (
        <Button
            className={cn("text-medium! rounded-3xl", active === value && "bg-foreground text-background")}
            variant={active === value ? "solid" : "light"}
            onPress={handleClick}
        >
            {title}
        </Button>
    );
};

type TabPanelProps = {
    children: React.ReactNode;
    className?: string;
    value: string;
};

export const TabPanel = ({ value, children, className }: TabPanelProps) => {
    const { active } = useTab();

    if (active !== value) {
        return null;
    }

    return (
        <div role="tabpanel" className={className}>
            {children}
        </div>
    );
};
