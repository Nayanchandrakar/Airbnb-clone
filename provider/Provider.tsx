'use client'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ProviderProps {
    children: React.ReactNode
}

const Provider: FC<ProviderProps> = ({ children }) => {

    const tanstackClient = new QueryClient()

    return <QueryClientProvider client={tanstackClient} >
        {children}
    </QueryClientProvider>
}

export default Provider