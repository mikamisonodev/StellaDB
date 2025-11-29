"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { FaFilterCircleXmark, FaMagnifyingGlass } from "react-icons/fa6";

const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Name", value: "name" },
    { label: "ID", value: "id" },
];

const TrekkersSearch = () => {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    return (
        <>
            <div className="flex gap-3 pb-2">
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
                        classNames={{
                            trigger: "rounded-l-none bg-default-100/70 data-[hover=true]:bg-default-100/50",
                        }}
                        defaultSelectedKeys={["default"]}
                    >
                        {sortOptions.map(option => (
                            <SelectItem key={option.value}>{option.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex-1 overflow-auto"></div>
            <div className="pt-2">
                <p className="text-center text-sm mb-2">0 / 0 trekkers displayed</p>
                <Button className="bg-default-100/70 w-full" startContent={<FaFilterCircleXmark />}>
                    Clear 0 filter(s)
                </Button>
            </div>
        </>
    );
};

export default TrekkersSearch;
