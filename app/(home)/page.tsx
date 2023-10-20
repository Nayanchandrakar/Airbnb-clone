import Container from '@/components/Container/Container'
import Renderlistings from '@/components/global/Renderlistings'
import { FC } from 'react'
import getListings, { IListingParams } from '../actions/getListings'
import getFavourites from '../actions/getFavourites'
import NullState from '@/components/shared/NullState'
import { auth } from '@clerk/nextjs'

interface pageProps {
    searchParams: IListingParams,
}

const page: FC<pageProps> = async ({ searchParams }) => {

    const getAllListingsData = await getListings(searchParams)
    const favourites = await getFavourites()
    const { userId } = auth()

    if (getAllListingsData.length === 0) {
        return (
            <NullState
                showReset
            />
        )
    }


    return <section className='my-8 '>
        <Container className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {getAllListingsData?.map(data => {
                return (
                    <Renderlistings key={data?.id} favourites={favourites} userId={userId!} {...data} />
                )
            })}
        </Container>
    </section>
}

export default page