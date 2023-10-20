'use client'
import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useEdgeStore } from '@/lib/edgeStore'

interface TripsClientProps {
    propertyId: string
    imageUrl: string
}

const TripsClient: FC<TripsClientProps> = ({ propertyId, imageUrl }) => {
    const router = useRouter()
    const { edgestore } = useEdgeStore();

    const mutate = useMutation({
        mutationKey: ['delete-property'],
        mutationFn: async (id: string) => {
            const res = await axios.delete(`/api/properties/${id}`)
            return res.data
        },
        retry: 1,
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error?.response?.status === 401) {
                    return toast({
                        title: "Unauthorized user",
                        description: "Please login or register first!",
                        variant: "destructive"
                    })
                } else if (error?.response?.status === 409) {
                    return toast({
                        title: error?.message,
                        variant: "destructive"
                    })
                } else if (error?.response?.status === 402) {
                    return toast({
                        title: error?.message,
                        variant: "destructive"
                    })
                } else {
                    return toast({
                        title: "please try again after some time!",
                        variant: "destructive"
                    })
                }
            } else {
                return toast({
                    title: "please try again after some time!",
                    variant: "destructive"
                })
            }
        },
        onSuccess: async (message) => {
            router.refresh()
            await edgestore?.publicFiles?.delete({
                url: imageUrl
            })
            return toast({
                title: "Property succefully deleted!",
            })
        }
    })

    return <Button
        isLoading={mutate.isLoading}
        onClick={() => mutate.mutate(propertyId)}
    >
        delete Properties
    </Button>
}

export default TripsClient