import useRentModal from '@/hooks/useRentModal'
import { FC } from 'react'

interface AirbnbHomeProps {

}

const AirbnbHome: FC<AirbnbHomeProps> = ({ }) => {
    const RentModal = useRentModal()
    return <span className='text-sm font-normal antialiased cursor-pointer hidden sm:inline-block' onClick={() => RentModal.openRentModal()}>Airbnb your home</span>
}

export default AirbnbHome