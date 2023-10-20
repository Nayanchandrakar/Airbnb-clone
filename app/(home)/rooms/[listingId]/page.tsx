import ListingImage from '@/components/global/ListingImage'
import Hostedby from '@/components/pages/Rooms/Hostedby'
import ListingCategory from '@/components/pages/Rooms/ListingCategory'
import RoomsClient from '../RoomsClient'
import Container from '@/components/Container/Container'
import { getListingById } from '@/app/actions/getListingById'
import RenderLocation from '../RenderLocation'
import getReservations from '@/app/actions/getReservations'
import NullState from '@/components/shared/NullState'
import getFavourites from '@/app/actions/getFavourites'
import { auth } from '@clerk/nextjs'

const Page = async ({ params }: { params: { listingId: string } }) => {

    const listingDetails = await getListingById(params)
    const reservations = await getReservations(params)
    const favourites = await getFavourites()
    const { userId } = auth()



    if (!listingDetails) {
        return <NullState />
    }

    return (
        <Container className='max-w-[68rem] antialiased mx-auto mt-10 mb-14'>
            <h3 className='text-2xl font-bold text-black'>{listingDetails?.title}</h3>
            <p className='text-zinc-500 font-normal '>{listingDetails?.location}</p>

            <ListingImage
                className={{
                    divclassName: 'mt-6',
                    imageclassName: 'h-[28rem]',
                    heartclassName: "left-[96%]"
                }}
                imageSrc={listingDetails?.image!}
                listingId={listingDetails?.id!}
                userId={userId!}
                favourites={favourites}
                showisLiked
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* for all related information  */}
                <div className="">
                    <Hostedby
                        bathrooms={listingDetails?.bathroomCount!}
                        guests={listingDetails?.guestCount!}
                        profileImage={listingDetails?.profileImage!}
                        rooms={listingDetails?.roomCount!}
                        hosterName={listingDetails?.firstName!}
                    />
                    <hr />
                    <ListingCategory
                        categoryName={listingDetails?.category!}
                    />
                    <hr />
                    <p className='my-6 text-sm antialiased text-gray-500'>
                        {listingDetails?.description}
                    </p>
                    <hr className='mb-12' />

                    <RenderLocation
                        locationLabel={listingDetails?.location!}
                    />
                </div>

                {/* calender here  */}
                <RoomsClient
                    reservations={reservations}
                    listingPrice={listingDetails?.price!}
                    listingId={listingDetails?.id!}
                />
            </div>
        </Container>
    )
}

export default Page