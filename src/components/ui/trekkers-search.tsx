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
                <div className="overflow-auto max-h-[calc(100vh-3.5rem-196px)]">
                    {filterOptions.map((group, i) => (
                        <div className="space-y-1.5" key={i}>
                            <h3 className="text-lg">{group.label}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map(item => (
                                    <Button
                                        className="bg-default-100/50"
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
                <Button className="bg-default-100/70 w-full" startContent={<FaFilterCircleXmark />}>
                    Clear 0 filter(s)
                </Button>
            </div>
        </>
    );
};

export default TrekkersSearch;
