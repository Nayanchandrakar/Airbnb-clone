import getFavourites from '@/app/actions/getFavourites'
import Container from '@/components/Container/Container'
import ListingImage from '@/components/global/ListingImage'
import HeadingShortner from '@/components/shared/HeadingShortner'
import { FC } from 'react'
import NullState from '@/components/shared/NullState'
import { db } from '@/lib/db'
import { format } from 'date-fns'
import { auth } from '@clerk/nextjs'


interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {

    const favourites = await getFavourites()
    const { userId } = auth()

    const getListtngId = favourites?.map((elem: any) => elem?.listingId)

    const getLikedListings = await db?.listings?.findMany({
        where: {
            id: {
                in: getListtngId
            }
        }
    })

    if (getLikedListings?.length === 0) {
        return <NullState
            title="No favorites found"
            subtitle="Looks like you have no favorite listings."
        />
    }
    return <Container className='mb-10'>
        <HeadingShortner
            className={{
                divclassName: 'my-8'
            }}
            titleLabel='Favourites'
            subTitleLabel='List of places you favourated!'
        />
        <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {getLikedListings?.map((data: any) => {
                const { id, image, createdAt, location, price } = data
                return (
                    <div key={id} className="w-full h-fit flex flex-col gap-2 ">
                        <ListingImage
                            imageSrc={image}
                            showisLiked
                            favourites={favourites}
                            listingId={id}
                            userId={userId!}
                        />
                        <div className='flex flex-col gap-2 '>
                            <span className='text-lg font-bold text-black '>{location}</span>
                            <p className='text-sm text-gray-500 font-medium antialiased'>
                                {format(new Date(createdAt?.toISOString()), 'MMM d yyyy')}
                            </p>
                            <strong className='text-black font-bold antialiased text-base'>
                                $ {price}
                            </strong>
                        </div>
                    </div>
                )
            })}
        </div>
    </Container>
}

export default page