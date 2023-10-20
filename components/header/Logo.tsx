import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import AirLogo from '../../public/images/logo.png'

interface LogoProps {

}

const Logo: FC<LogoProps> = ({ }) => {
  return <Link href="/" className='w-fit h-fit hidden md:inline-block'>
    <Image
      src={AirLogo}
      alt='airbnb-logo'
      sizes='100%'
      className='w-[6.6rem] sm:w-none'
      width={110}
      height={110}
    />
  </Link>
}

export default Logo