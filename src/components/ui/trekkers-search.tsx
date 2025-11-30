"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import Image from "next/image";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { FaFilterCircleXmark, FaMagnifyingGlass } from "react-icons/fa6";

import { filterOptions, sortOptions } from "@/config/filters/trekkers";

const TrekkersSearch = () => {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Using a Set to track selected filters for efficient add/remove operations
    const [selectedSet] = useState(new Set<string>());

    // Using a separate state to trigger re-renders when filter count changes
    const [filterCount, setFilterCount] = useState(0);

    const handleSelect = (value: string) => {
        if (selectedSet.has(value)) {
            setFilterCount(prev => prev - 1);
            selectedSet.delete(value);
        } else {
            setFilterCount(prev => prev + 1);
            selectedSet.add(value);
        }
    };

    const handleClear = () => {
        setFilterCount(0);
        selectedSet.clear();
    };

    return (
        <>
            <div className="flex gap-3 pb-3">
                <Input
                    classNames={{ inputWrapper: "bg-default-100/70" }}
                    startContent={<FaMagnifyingGlass />}
                    placeholder="Search"
                    className="flex-1"
                    isClearable
                />
                <div className="flex flex-1">
                    <Button
                        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="bg-default-100/70 rounded-r-none"
                        isIconOnly
                    >
                        {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
                    </Button>
                    <Select
                        aria-label="Sorting"
                        defaultSelectedKeys={["default"]}
                        classNames={{
                            trigger: "rounded-l-none bg-default-100/70 data-[hover=true]:bg-default-100/50",
                        }}
                    >
                        {sortOptions.map(option => (
                            <SelectItem key={option.value}>{option.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex-1 space-y-2 h-full">
                <div className="thin-scrollbar overflow-auto space-y-3 max-h-[calc(100vh-3.5rem-196px)]">
                    {filterOptions.map((group, i) => (
                        <div key={i}>
                            <h3 className="text-lg mb-1">{group.label}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map(item => (
                                    <Button
                                        className={
                                            selectedSet.has(item.value)
                                                ? "bg-default-foreground text-background"
                                                : "bg-default-100/50"
                                        }
                                        onPress={() => handleSelect(item.value)}
                                        key={item.value}
                                        startContent={
                                            item.img ? (
                                                <Image
                                                    src={item.img}
                                                    alt={item.label}
                                                    width={24}
                                                    height={24}
                                                    priority
                                                />
                                            ) : item.icon ? (
                                                <item.icon size={18} />
                                            ) : null
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-3">
                <p className="text-center text-sm mb-2">0 / 0 trekkers displayed</p>
                <Button
                    startContent={<FaFilterCircleXmark />}
                    className="bg-default-100/70 w-full"
                    disabled={filterCount === 0}
                    onPress={handleClear}
                >
                    Clear {filterCount} filter(s)
                </Button>
            </div>
        </>
    );
};

export default TrekkersSearch;
