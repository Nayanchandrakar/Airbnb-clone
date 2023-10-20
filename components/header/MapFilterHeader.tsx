'use client'
import { FC } from 'react'
import { filterHeaderInterface } from '../../constants/filterHeader'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MapFilterHeaderProps extends filterHeaderInterface {
    Icon: LucideIcon,
}

const MapFilterHeader: FC<MapFilterHeaderProps> = ({ id, Icon, label }) => {
    const params = useSearchParams()
    const category = params?.get('category')

    return (
        <Link href={`?${new URLSearchParams({
            category: label,
        })}`} className='flex flex-col gap-2 items-center justify-center h-full group min-w-[5rem] remove_highlight'>
            <Icon color='#6e6e6e' className={cn('group-hover:stroke-black transition-colors duration-200', { 'stroke-black': category === label })} />
            <span className={cn('text-xs font-medium text-gray-600 transition-colors duration-200 group-hover:text-black border-b-[2.5px] group-hover:border-b-black border-b-transparent pb-2 ', { 'border-b-black text-black': category === label })}>
                {label}
            </span>
        </Link>
    )
}

export default MapFilterHeader