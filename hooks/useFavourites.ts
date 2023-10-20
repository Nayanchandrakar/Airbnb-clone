"use client"
import { toast } from "@/components/ui/use-toast"
import { getFavouritesType } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useMemo, useCallback } from "react"

interface Irequest {
  listingId?: string
  userId?: string
  userfavourites?: getFavouritesType[]
}

export const useFavourites = ({
  listingId,
  userId,
  userfavourites,
}: Irequest) => {
  const router = useRouter()

  const isFavourited = useMemo(() => {
    const findfavourites = userfavourites?.find(
      (elem) => elem?.listingId === listingId && elem?.userId === userId
    )
    if (findfavourites) {
      return true
    } else {
      return false
    }
  }, [userId, listingId, userfavourites])

  const tooglefavourites = useCallback(async () => {
    if (!userId) {
      return router.push("/sign-in")
    }

    try {
      let request

      if (isFavourited) {
        request = () => axios.delete(`/api/favourite/${listingId}`)
      } else {
        request = () => axios.post(`/api/favourite/${listingId}`)
      }
      await request()
      router.refresh()
      toast({
        title: "Success 🧑‍💻",
      })
    } catch (error) {
      console.log(error)
    }
  }, [userId, listingId, userfavourites, router])

  return {
    isFavourited,
    tooglefavourites,
  }
}
