'use client'
import { FC, useMemo } from 'react'
import Container from '../Container/Container'
import Logo from './Logo'
import Navigation from './Navigation'
import Menu from './Menu'
import AirbnbHome from './AirbnbHome'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
  const pathName = usePathname()

  const SecondaryHeader = dynamic(() => import('./Filterheader'))


  return <>
    <header className='bg-white border-b-[1.5px] border-zinc-200 w-full h-[76px] sticky top-0 z-[40]'>
      <Container className='flex justify-between items-center h-full gap-8 md:gap-0'>
        <Logo />
        <Navigation />
        <div className="flex items-center justify-center flex-row gap-6">
          <AirbnbHome />
          <Menu />
        </div>
      </Container>
    </header>
    {pathName === '/' ? <SecondaryHeader /> : null}
  </>
}

export default Header