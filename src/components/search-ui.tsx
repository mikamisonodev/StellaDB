"use client";

import { Button } from "@heroui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchUI = () => {
    return (
        <Button variant="flat" className="text-foreground bg-default-100/40" isIconOnly>
            <FaMagnifyingGlass />
        </Button>
    );
};

export default SearchUI;
