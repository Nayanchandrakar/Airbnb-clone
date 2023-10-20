'use client'
import useSearchModal from '@/hooks/useSearchModal'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { DialogContent, Dialog, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import SelectCountries from '@/components/shared/SelectCountries'
import Counter from '@/components/shared/Counter'
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker'
import QueryString from 'query-string'
import { useSearchParams } from 'next/navigation'
import { formatISO } from 'date-fns'
import { useRouter } from 'next/navigation'

interface SearchModalProps {

}

const SearchModal: FC<SearchModalProps> = ({ }) => {

    enum STEPS {
        LOCATION = 0,
        WEEKS = 1,
        GUESTS = 2,
    }

    const SearchModal = useSearchModal()
    const intialDateRange = {
        from: undefined,
        to: undefined,
    }
    const [steps, setsteps] = useState(STEPS.LOCATION)
    const [location, setLocation] = useState<any>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [date, setDate] = React.useState<DateRange | undefined>(intialDateRange)
    const params = useSearchParams();
    const router = useRouter()


    const onNext = useCallback(() => {
        setsteps(value => value + 1)
    }, [])

    const onBack = useCallback(() => {
        setsteps(value => value - 1)
    }, [])


    const firstLabel = useMemo(() => {
        if (STEPS.GUESTS !== steps) {
            return 'Next'
        }
        return 'Filter'
    }, [steps])


    const onSubmit = useCallback(async () => {
        if (steps !== STEPS.GUESTS) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = QueryString.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            location: location?.label,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (date?.from) {
            updatedQuery.startDate = formatISO(date?.from);
        }

        if (date?.to) {
            updatedQuery.endDate = formatISO(date?.to);
        }

        const url = QueryString.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true, });

        setsteps(STEPS.LOCATION);
        SearchModal.closeSearchModal();
        router.push(url);
    }, [steps, SearchModal, location, router, guestCount, roomCount, date, onNext, bathroomCount, params]);



    let bodyContent;

    const Map = useMemo(() => dynamic(() => import('../RentModal/MapIntegration'), {
        ssr: false,
    }), [location])




    if (STEPS.LOCATION === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Where is you place located?</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        Help guests find you!
                    </DialogDescription>
                </DialogHeader>
                <SelectCountries onChange={(value) => setLocation(value)} />
                <Map center={location?.latIng} />
            </>
        )
    }

    if (STEPS.WEEKS === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>When do you plan to go?</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        Make sure everyone is free!
                    </DialogDescription>
                </DialogHeader>
                <Calendar
                    mode="range"
                    selected={date}
                    defaultMonth={new Date()}
                    onSelect={setDate}
                    fromDate={new Date()}
                    numberOfMonths={1}
                />
            </>
        )
    }

    if (STEPS.GUESTS === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Share some basics about your place</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        What amenitis do you have?
                    </DialogDescription>
                </DialogHeader>
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests do you allow?"
                />
                <hr />
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                />
                <hr />
                <Counter
                    onChange={(value) => setBathroomCount(value)}
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                />
            </>
        )
    }


    return (
        <Dialog open={SearchModal?.isOpen} onOpenChange={SearchModal?.closeSearchModal}>
            <DialogContent>
                <form className='flex flex-col gap-4'>
                    {bodyContent}
                </form>
                <DialogFooter className='flex flex-col md:flex-row gap-3 items-center'>
                    {STEPS.LOCATION === steps ? undefined : <Button onClick={onBack} variant="outline" className='border-black w-full'>Back</Button>}
                    <Button onClick={onSubmit} className='w-full'>{firstLabel}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SearchModal