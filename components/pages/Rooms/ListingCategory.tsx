import { FC } from 'react'
import { filterHeaderData, filterHeaderInterface } from '@/constants/filterHeader'
import { LucideIcon } from 'lucide-react'

interface ListingCategoryProps {
    categoryName: string,
}

const ListingCategory: FC<ListingCategoryProps> = ({ categoryName }) => {

    const singleCategory: filterHeaderInterface | undefined = filterHeaderData.find(category => category.label === categoryName)

    const Icon = singleCategory?.Icon as LucideIcon

    if (!singleCategory) {
        return null
    }

    return <div className='my-6 flex flex-row gap-6 items-center'>
        <Icon size={30} color='black' />
        <div className="flex flex-col gap-1 items-start justify-center">
            <span className='text-xl font-bold text-black antialiased'>
                {singleCategory?.label}
            </span>
            <p className='text-sm font-normal antialiased text-gray-500'>
                {singleCategory?.info}
            </p>
        </div>
    </div>
}

export default ListingCategory