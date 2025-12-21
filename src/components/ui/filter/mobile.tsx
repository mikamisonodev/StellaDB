"use client";

import { Button } from "@heroui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@heroui/drawer";
import { Input } from "@heroui/input";
import { Select, SelectItem, SelectSection } from "@heroui/select";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { FaFilter, FaMagnifyingGlass, FaX } from "react-icons/fa6";

import { FilterSection, type FilterSectionProps } from "./filter-section";

const MobileFilter = (props: FilterSectionProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="sticky top-[calc(3.5rem+12px)] p-2 rounded-lg z-10 flex bg-content1/40 backdrop-blur-xl gap-3">
                <Button onPress={() => setOpen(true)} className="bg-default-200/70 flex-1" startContent={<FaFilter />}>
                    <span className="text-xs bg-default-300 size-5 font-semibold rounded-lg leading-5">
                        {props.filterCount}
                    </span>
                </Button>
                <Input
                    onInput={e => props.onSearchInput(e.currentTarget.value)}
                    classNames={{ inputWrapper: "bg-default-200/70" }}
                    onClear={() => props.onSearchInput("")}
                    startContent={<FaMagnifyingGlass />}
                    value={props.searchInput}
                    placeholder="Search"
                    className="flex-10"
                    isClearable
                />
                <div className="md:flex hidden flex-3">
                    <Button
                        onPress={() => props.onSortOrderChange(props.sortOrder === "asc" ? "desc" : "asc")}
                        className="bg-default-200/70 rounded-r-none"
                        disabled={props.sortType === "default"}
                        isIconOnly
                    >
                        {props.sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
                    </Button>
                    <Select
                        classNames={{ trigger: "rounded-l-none bg-default-200/70 data-[hover=true]:bg-default-300/70" }}
                        onChange={e => props.onSortTypeChange(e.target.value)}
                        popoverProps={{ placement: "bottom-end" }}
                        selectedKeys={[props.sortType]}
                        aria-label="Sorting"
                    >
                        {props.sortOptions.map(option =>
                            option.section ? (
                                <SelectSection showDivider key={option.title} title={option.title}>
                                    {option.items!.map(subOption => (
                                        <SelectItem
                                            startContent={subOption.icon ? <subOption.icon /> : null}
                                            key={subOption.value}
                                        >
                                            {subOption.label}
                                        </SelectItem>
                                    ))}
                                </SelectSection>
                            ) : (
                                <SelectItem startContent={option.icon ? <option.icon /> : null} key={option.value}>
                                    {option.label}
                                </SelectItem>
                            ),
                        )}
                    </Select>
                </div>
            </div>
            <Drawer
                classNames={{ backdrop: "bg-black/50" }}
                onClose={() => setOpen(false)}
                placement="left"
                hideCloseButton
                isOpen={open}
            >
                <DrawerContent className="bg-content1">
                    {onClose => (
                        <>
                            <DrawerHeader className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FaFilter />
                                    Filters
                                </div>
                                <div className="hover:text-foreground/80" onClick={onClose}>
                                    <FaX size="12" />
                                </div>
                            </DrawerHeader>
                            <div className="flex flex-col pb-4 px-6 flex-1">
                                <FilterSection {...props} />
                            </div>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MobileFilter;
