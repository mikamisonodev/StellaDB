"use client";

import { Button } from "@heroui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchUI = () => {
    return (
        <Button variant="flat" className="text-foreground bg-content1/60 hover:bg-content2/80" isIconOnly>
            <FaMagnifyingGlass />
        </Button>
    );
};

export default SearchUI;
