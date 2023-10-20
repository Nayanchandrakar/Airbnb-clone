'use client';

import { Minus, Plus } from "lucide-react";
import { useCallback } from "react";


interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange,
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);


    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }
        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between antialiased">
            <div className="flex flex-col">
                <div className="font-normal text-base ">{title}</div>
                <div className="font-light text-sm text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className=" w-8 h-8 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                    <Minus size={15} />
                </div>
                <div
                    className="font-normal antialiased text-sm text-neutral-600">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className=" w-8 h-8 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                    <Plus size={15} />
                </div>
            </div>
        </div>
    );
}

export default Counter;