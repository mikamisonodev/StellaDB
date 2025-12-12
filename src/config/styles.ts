"use client";

export const handleClassStyle = (itemClass: string) => {
    switch (itemClass) {
        case "Versatile":
            return "bg-[#78e]";
        case "Vanguard":
            return "bg-[#d69]";
        case "Support":
            return "bg-[#4ca]";
        default:
            return "bg-gray-500";
    }
};

export const handleRarityColor = (star: number) => {
    switch (star) {
        case 3:
            return "from-[#8ce] to-[#dff]";
        case 4:
            return "from-[#fd5] to-[#efc]";
        case 5:
            return "from-[#d8e] to-[#7ff]";
        default:
            return "from-gray-200 to-gray-400";
    }
};
