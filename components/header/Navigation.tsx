'use client'
import { FC, useMemo } from 'react'
import { Search } from 'lucide-react'
import useSearchModal from '@/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import { differenceInDays } from 'date-fns'

interface NavigationProps {

}

const Navigation: FC<NavigationProps> = ({ }) => {
    const SearchModal = useSearchModal()
    const params = useSearchParams()
    const guestCount = params.get('guestCount')
    const startDate = params.get('startDate')
    const endDate = params.get('endDate')
    const location = params.get('location')

    const locationLabel = useMemo(() => location ? location : 'Anywhere', [location])
    const numberOfDays = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            let diff = differenceInDays(end, start);

            if (diff === 0) {
                diff = 1;
            }
            return `${diff} Days`;
        }
        return 'Any Week'
    }, [startDate, endDate])

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;
        }

        return 'Add Guests';
    }, [guestCount]);

    console.log(params)

    return <nav className='flex items-center p-1 remove_highlight border-[1.5px] border-zinc-300 shadow-md shadow-black/5 rounded-full font-normal text-gray-500 w-full  justify-between lg:justify-center lg:w-fit max-w-[18rem] lg:max-w-none h-fit text-sm antialiased md:gap-0'>
        <strong className='px-4 md:border-r-[1.5px] md:border-zinc-200 cursor-pointer'>{locationLabel}</strong>
        <strong className='px-4 border-r-[1.5px] border-zinc-200 cursor-pointer hidden md:inline-block'>{numberOfDays}</strong>
        <strong className='px-2 cursor-pointer sm:px-4 hidden lg:inline-block'>{guestLabel}</strong>
        <span onClick={() => SearchModal?.openSearchModal()} className="rounded-full bg-rose-600 p-2 w-fit h-fit cursor-pointer">
            <Search size={20} color="white" />
        </span>
    </nav>
}

export default Navigation