'use client'
import { FC } from 'react'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import useCountries from '@/hooks/useCountries'

interface RenderLocationProps {
    locationLabel: string,
}

const RenderLocation: FC<RenderLocationProps> = ({ locationLabel }) => {
    const { getByValue } = useCountries()
    const ExactLocation = getByValue(locationLabel)
    const Map = useMemo(() => dynamic(() => import('@/components/Modals/RentModal/MapIntegration')), [locationLabel, ExactLocation])
    return <Map
        center={ExactLocation?.latIng}
    />
}

export default RenderLocation