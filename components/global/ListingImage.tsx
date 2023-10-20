'use client'
import { FC } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getFavouritesType } from '@/types/types'
import { useFavourites } from '@/hooks/useFavourites'
import { useRouter } from 'next/navigation'

interface ListingImageProps {
    imageSrc: string,
    listingUrl?: string
    showisLiked?: boolean
    listingId?: string
    favourites?: getFavouritesType[],
    userId?: string
    className?: {
        divclassName?: string,
        imageclassName?: string,
        heartclassName?: string,
    },
}

const ListingImage: FC<ListingImageProps> = ({ imageSrc, listingUrl, className, showisLiked, listingId, favourites, userId }) => {

    const { isFavourited, tooglefavourites } = useFavourites({
        listingId,
        userfavourites: favourites,
        userId,
    })


    const router = useRouter()

    return (
        <div className={cn("w-full h-full relative overflow-hidden rounded-2xl", className?.divclassName)}>
            <Image
                src={imageSrc}
                className={cn("w-full h-[15rem] object-cover rounded-2xl cursor-pointer hover:scale-[1.3] transition-all duration-200", className?.imageclassName)}
                alt=""
                sizes='100vw'
                width={30}
                height={30}
                onClick={() => router.push(`/rooms/${listingId}`)}
            />
            {showisLiked && <Heart color='white' onClick={tooglefavourites} size={25} className={cn(' fill-gray-700 cursor-pointer absolute right-3 top-[.7rem] remove_highlight', { 'fill-red-700': isFavourited }, className?.heartclassName)} />}
        </div>
    )
}

export default ListingImage