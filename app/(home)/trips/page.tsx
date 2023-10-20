import Container from '@/components/Container/Container'
import ListingImage from '@/components/global/ListingImage'
import HeadingShortner from '@/components/shared/HeadingShortner'
import { FC } from 'react'
import TripsClient from './TripsClient'
import { auth } from '@clerk/nextjs'
import NullState from '@/components/shared/NullState'
import getReservations from '@/app/actions/getReservations'
import { format } from 'date-fns'

interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {

    const { userId } = auth()

    let reservations = await getReservations({
        userId: userId!
    })

    if (reservations?.length === 0) {
        return <NullState
            title="No trips found"
            subtitle="Looks like you havent reserved any trips."
        />
    }


    return <Container>
        <HeadingShortner
            className={{
                divclassName: 'my-8'
            }}
            titleLabel='Trips'
            subTitleLabel='your all planned trips'
        />
        <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {reservations.map(data => {
                const { createdAt, endDate, id, startDate, totalPrice, listing } = data
                return (
                    <div key={id} className="w-full h-fit flex flex-col gap-2">
                        <ListingImage
                            imageSrc={listing?.image}
                        />
                        <span className='text-lg font-bold text-black '>{listing?.location}</span>
                        <p className='text-sm text-gray-500 font-medium antialiased'>
                            {format(new Date(startDate), 'MMM d yyyy')} - {format(new Date(endDate), 'MMM d yyyy')}
                        </p>
                        <strong className='text-black font-bold antialiased text-base'>
                            $ {totalPrice}
                        </strong>
                        <TripsClient
                            reservationId={id}
                        />
                    </div>
                )
            })}
        </div>
    </Container>
}

export default page