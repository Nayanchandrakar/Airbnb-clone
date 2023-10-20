'use client'
import React, { FC, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker'
import { differenceInDays, eachDayOfInterval } from "date-fns"
import { useToast } from '@/components/ui/use-toast'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'


interface RoomsClientProps {
    reservations: any
    listingPrice: number
    listingId: string,
}

const RoomsClient: FC<RoomsClientProps> = ({ reservations, listingPrice, listingId }) => {


    const intialDateRange = {
        from: undefined,
        to: undefined,
    }

    const [date, setDate] = React.useState<DateRange | undefined>(intialDateRange)
    const [totalPrice, setprice] = React.useState<number>(listingPrice)
    const [IsLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()
    const { userId } = useAuth()


    React.useEffect(() => {
        if (date?.from && date?.to) {
            const numberOfDays = differenceInDays(
                date?.to!,
                date?.from!,
            )
            console.log(numberOfDays)
            if (numberOfDays && listingPrice) {
                setprice(listingPrice * numberOfDays)
            } else {
                setprice(listingPrice)
            }
        }
    }, [date, listingPrice])


    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations?.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation?.startDate),
                end: new Date(reservation?.endDate)
            });
            dates = [...dates, ...range];
        })
        return dates
    }, [reservations])



    const handleReservation = useCallback(async () => {

        if (!userId) {
            return router.push('/sign-in')
        }

        if (date?.to?.toISOString() === date?.from?.toISOString()) {
            return toast({
                title: "choose your trip date",
                description: "Please select a date!",
                variant: "destructive"
            })
        }

        setIsLoading(setTrue => !setTrue)
        try {
            const response = await axios.post('/api/reservation/create', {
                startDate: date?.from,
                endDate: date?.to,
                listingId: listingId,
                totalPrice
            })

            if (response?.status === 200) {
                setDate(intialDateRange)
                router.refresh()
                router.push("/trips")
                return toast({
                    title: 'Listing Reserved!',
                })
            }
            return toast({
                title: 'Something went wrong!'
            })
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error?.response?.status === 402) {
                    return toast({
                        title: 'please fill all fields',
                        description: 'All the fields are necessary',
                        variant: 'destructive'
                    })
                } else {
                    return toast({
                        title: 'database error occured',
                        description: 'try after sometime?',
                        variant: 'destructive'
                    })
                }
            }
        } finally {
            setIsLoading(setFalse => !setFalse)
        }


    }, [totalPrice, listingPrice, date])

    return <div className="my-8 border-[1.5px] border-zinc-200 sticky top-[3rem] rounded-lg h-fit">
        <span className='w-full flex items-center text-start p-3 font-normal text-gray-600 antialiased'>
            <strong className='font-bold text-black text-xl mr-1'>${listingPrice}</strong>night
        </span>
        <hr />
        {/* logic for room reservations  */}
        <div className="grid gap-2">
            <Calendar
                mode="range"
                selected={date}
                defaultMonth={new Date()}
                onSelect={setDate}
                disabled={disabledDates}
                fromDate={new Date()}
                numberOfMonths={1}
            />
        </div>
        <hr />

        <div className="p-5">
            <Button isLoading={IsLoading} onClick={handleReservation} className='w-full'>
                Reserve
            </Button>
        </div>
        <hr />

        <span className='w-full flex justify-between p-3  antialiased'>
            <strong className='font-bold text-black text-xl mr-1'>Total</strong>
            <strong className='font-bold text-black text-xl mr-1'>${totalPrice}</strong>
        </span>
        <hr />
    </div>
}

export default RoomsClient