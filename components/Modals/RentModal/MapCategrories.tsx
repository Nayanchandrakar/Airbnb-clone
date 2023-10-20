import { FC } from 'react'
import { LucideIcon } from 'lucide-react'
import { filterHeaderInterface } from '@/constants/filterHeader'
import { cn } from '@/lib/utils'

interface MapCategroriesProps extends filterHeaderInterface {
    Icon: LucideIcon,
    onClick: (category: string) => void,
    categoryLabel: string,
}

const MapCategrories: FC<MapCategroriesProps> = ({ Icon, id, label, onClick, categoryLabel }) => {
    return <span onClick={() => onClick(label)} className={cn('flex flex-col gap-2 justify-start p-4 border-[1.5px] border-zinc-200 transition-colors duration-200 rounded-lg hover:border-black cursor-pointer', { 'border-black': categoryLabel === label })}>
        <Icon className='stroke-gray-600' size={20} />
        <strong className='text-gray-600 text-sm'>{label}</strong>
    </span>
}

export default MapCategrories