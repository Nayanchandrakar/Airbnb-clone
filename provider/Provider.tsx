'use client'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EdgeStoreProvider } from '@/lib/edgeStore'

interface ProviderProps {
    children: React.ReactNode
}

const Provider: FC<ProviderProps> = ({ children }) => {

    const tanstackClient = new QueryClient()

    return <QueryClientProvider client={tanstackClient} >
        <EdgeStoreProvider>
            {children}
        </EdgeStoreProvider>
    </QueryClientProvider>
}

export default Provider