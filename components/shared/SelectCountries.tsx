import { FC } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useCountries from "@/hooks/useCountries";
import Image from 'next/image'

interface SelectCountiresInterface {
    onChange: (value: any) => void
}

const SelectCountries: FC<SelectCountiresInterface> = ({ onChange }) => {

    const { getAll, getByValue } = useCountries()


    return <Select onValueChange={(value) => onChange(getByValue(value))}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Country" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup className="h-[10rem]">
                {getAll?.map((value, id) => {
                    return (
                        <SelectItem className="cursor-pointer text-xs text-gray-700" key={id} value={value?.label}>
                            <span className="font-bold text-sm antialiased">{value?.label} </span>
                            {value?.region}
                        </SelectItem>
                    )
                })}
            </SelectGroup>
        </SelectContent>
    </Select>
}

export default SelectCountries