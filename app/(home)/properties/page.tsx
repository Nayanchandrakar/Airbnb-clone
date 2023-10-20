import Container from '@/components/Container/Container'
import ListingImage from '@/components/global/ListingImage'
import HeadingShortner from '@/components/shared/HeadingShortner'
import { FC } from 'react'
import PropertiesClient from './PropertiesClient'
import { auth } from '@clerk/nextjs'
import NullState from '@/components/shared/NullState'
import getListings from '@/app/actions/getListings'

interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {

    const { userId } = auth()

    let properties = await getListings({
        userId: userId!,
    })

    if (properties?.length === 0) {
        return <NullState
            title="No properties found"
            subtitle="Looks like you have no properties."
        />
    }

    const handleLikeDislike = async () => {
        'use server'
    }


    return <Container>
        <HeadingShortner
            className={{
                divclassName: 'my-8'
            }}
            titleLabel='Properties'
            subTitleLabel='List of your properties.'
        />
        <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {properties.map(data => {
                const { id, category, image, location, price } = data
                return (
                    <div key={id} className="w-full h-fit flex flex-col gap-2">
                        <ListingImage
                            imageSrc={image}
                            listingId={id}
                        />
                        <span className='text-lg font-bold text-black '>{location}</span>
                        <p className='text-sm text-gray-500 font-medium antialiased'>
                            {category}
                        </p>
                        <strong className='text-black font-bold antialiased text-base'>
                            $ {price}
                        </strong>
                        <PropertiesClient
                            propertyId={id}
                            imageUrl={image}
                        />
                    </div>
                )
            })}
        </div>
    </Container>
}

export default page