import { FC } from 'react'
import placeholder from '../../../public/images/placeholder.jpg'
import Image from 'next/image'

interface HostedbyProps {
    profileImage: string,
    guests: number,
    rooms: number,
    bathrooms: number,
    hosterName: string,
}

const Hostedby: FC<HostedbyProps> = ({ profileImage, bathrooms, guests, rooms, hosterName }) => {
    return <div className='mb-6 mt-8'>
        <span className='font-bold text-black antialiased text-xl flex flex-row gap-2'>
            Hosted by {hosterName}
            <Image
                alt='image-placeholder'
                className='rounded-full'
                width={30}
                height={30}
                src={profileImage || placeholder}
            />
        </span>
        <span className='flex flex-row gap-3 justify-center antialiased text-zinc-500 font-thin w-fit h-fit mt-2'>
            <strong>{guests} guests</strong>
            <strong>{rooms} rooms</strong>
            <strong>{bathrooms} bathrooms</strong>
        </span>
    </div>
}

export default Hostedby