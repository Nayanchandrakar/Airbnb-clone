'use client'
import { FC } from 'react'
import ListingImage from './ListingImage'
import { getFavouritesType } from '@/types/types'


interface RenderlistingsProps {
    id: string,
    category: string,
    image: string,
    location: string,
    price: number,
    favourites?: getFavouritesType[]
    userId: string
}

const Renderlistings: FC<RenderlistingsProps> = ({ category, location, price, image, id, favourites, userId }) => {

    return <div className="flex flex-col gap-2">
        <ListingImage
            imageSrc={image}
            showisLiked
            listingId={id}
            favourites={favourites!}
            userId={userId}
        />
        <div className="flex flex-col antialiased cursor-pointer ">
            <span className="text-lg font-normal antialiased text-black">
                {location}
            </span>
            <p className='text-base text-gray-700 font-medium antialiased my-1'>
                {category}
            </p>
            <span className='w-full flex items-center text-start font-normal text-gray-500 antialiased'>
                <strong className='font-bold text-black text-xl mr-1'>${price}</strong>night
            </span>
        </div>
    </div>
}

export default Renderlistings