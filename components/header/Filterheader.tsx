'use client'
import { FC } from 'react'
import { filterHeaderData } from '../../constants/filterHeader'
import MapFilterHeader from './MapFilterHeader'
import Container from '../Container/Container'

interface FilterheaderProps {

}

const Filterheader: FC<FilterheaderProps> = ({ }) => {
    return (<Container className='  border-b-[1.5px] border-zinc-200 sticky top-[76px] z-[40] bg-white '>
        <div className="overflow-x-auto flex justify-between flex-row items-center w-full h-full pt-3">
            {filterHeaderData?.map(data => {
                return (
                    <MapFilterHeader key={data?.id} {...data} />
                )
            })}
        </div>
    </Container>)
}

export default Filterheader