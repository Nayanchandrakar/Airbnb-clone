import { FC } from 'react'
import { MenubarContent, MenubarItem } from '../../components/ui/menubar'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import useRentModal from '@/hooks/useRentModal'

interface NavigationBarProps {

}

const NavigationBar: FC<NavigationBarProps> = ({ }) => {
    const { userId } = useAuth()
    const router = useRouter()
    const RentModal = useRentModal()


    return <MenubarContent className='mr-4 mt-4'>
        {!userId ? (
            <>
                <MenubarItem onClick={() => router.push('/sign-in')} >
                    Sign in
                </MenubarItem>
                <MenubarItem onClick={() => router.push('/sign-up')} >
                    Sign up
                </MenubarItem>
            </>
        ) : (
            // content for not authenticated user 
            <>
                <MenubarItem onClick={() => RentModal.openRentModal()}>
                    Airbnb your home
                </MenubarItem>
                <MenubarItem onClick={() => router.push('/reservations')}>
                    Reservations
                </MenubarItem>
                <MenubarItem onClick={() => router.push('/favourites')}>
                    Favourites
                </MenubarItem>
                <MenubarItem onClick={() => router.push('/trips')}>
                    Trips
                </MenubarItem>
                <MenubarItem onClick={() => router.push('/properties')}>
                    Properties
                </MenubarItem>
            </>
        )}
    </MenubarContent>
}

export default NavigationBar