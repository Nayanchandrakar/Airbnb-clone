'use client'
import { FC } from 'react'
import Image from 'next/image'
import placeholder from '../../public/images/placeholder.jpg'
import { Menu as LucideMenu } from 'lucide-react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../components/ui/menubar'
import NavigationBar from './NavigationBar'
import { UserButton } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";


interface MenuProps {

}

const Menu: FC<MenuProps> = ({ }) => {

    const { userId } = useAuth();

    return (<Menubar className='remove_highlight'>
        <MenubarMenu>
            <MenubarTrigger >
                <LucideMenu size={20} />
            </MenubarTrigger>
            <button className='outline-none w-fit h-fit border-none flex gap-2 items-center justify-center border-[1.5px] rounded-full border-zinc-200 px-1  md:px-2 md:py-1'>
                {userId ? <UserButton afterSignOutUrl='/' /> : <Image
                    src={placeholder}
                    alt='profile-image'
                    width={32}
                    height={32}
                    className='rounded-full object-cover'
                />}
            </button>
            <NavigationBar />
        </MenubarMenu>
    </Menubar>)
}

export default Menu