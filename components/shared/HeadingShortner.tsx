import { cn } from '@/lib/utils'
import { FC } from 'react'

interface HeadingShortnerProps {
    className?: {
        divclassName?: string,
        titleclassName?: string,
        subTitleclassName?: string,
    }
    titleLabel?: string,
    subTitleLabel?: string,
}

const HeadingShortner: FC<HeadingShortnerProps> = ({ className, subTitleLabel, titleLabel }) => {
    return (
        <div className={cn('antialiased', className?.divclassName)}>
            {titleLabel && <span className={cn('font-bold text-2xl text-black', className?.titleclassName)}>{titleLabel}</span>}
            {subTitleLabel && <p className={cn('font-normal text-lg text-gray-500 mt-2', className?.subTitleclassName)}>{subTitleLabel}</p>}
        </div>
    )
}

export default HeadingShortner