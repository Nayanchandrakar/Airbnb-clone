import Provider from '@/provider/Provider'
import '../style/globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/header/Header'
import Filterheader from '@/components/header/Filterheader'
import { Toaster } from '@/components/ui/toaster'
import RentModal from '@/components/Modals/RentModal/RentModal'
import SearchModal from '@/components/Modals/SearchModal/SearchModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb your home',
  description: 'Holiday Homes & apartment are available for rent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Provider>
          <body className={nunito.className}>
            <Toaster />
            <Header />
            <RentModal />
            <SearchModal />
            {children}
          </body>
        </Provider>
      </ClerkProvider>
    </html>
  )
}
