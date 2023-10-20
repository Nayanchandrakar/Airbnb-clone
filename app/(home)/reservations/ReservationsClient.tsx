'use client'
import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface TripsClientProps {
    reservationId: string
}

const ReservationsClient: FC<TripsClientProps> = ({ reservationId }) => {
    const router = useRouter()

    const mutate = useMutation({
        mutationKey: ['delete-trips'],
        mutationFn: async (id: string) => {
            const res = await axios.delete(`/api/trips/${id}`)
            return res.data
        },
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
        onSuccess: (message) => {
            router.refresh()
            return toast({
                title: "reservation succefully deleted!",
            })
        }
    })

    return <Button
        isLoading={mutate.isLoading}
        onClick={() => mutate.mutate(reservationId)}
    >
        Cancel guest reservation
    </Button>
}

export default ReservationsClient