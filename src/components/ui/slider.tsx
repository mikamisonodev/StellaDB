"use client";

import { Slider as HeroSlider } from "@heroui/slider";

type SliderProps = {
    value: number;
    onChange: (value: number) => void;
    label: string;
    minValue: number;
    maxValue: number;
    step: number;
};

const Slider = ({ value, onChange, minValue, maxValue, step, label }: SliderProps) => {
    return (
        <div className="flex items-center w-full gap-4">
            <HeroSlider
                onChange={onChange as (value: number | number[]) => void}
                renderThumb={props => <div {...props} className="size-5 rounded-full bg-default-foreground top-1/2" />}
                minValue={minValue}
                classNames={{
                    track: "bg-content1/40 backdrop-blur-xl data-[fill-start=true]:border-s-transparent border-x-6",
                    filler: "bg-transparent",
                }}
                maxValue={maxValue}
                className="w-full"
                aria-label="Level"
                value={value}
                step={step}
            />
            <p className="bg-content1/40 backdrop-blur-xl whitespace-nowrap font-medium py-1 px-4 rounded-2xl">
                {label}
            </p>
        </div>
    );
};

export default Slider;
