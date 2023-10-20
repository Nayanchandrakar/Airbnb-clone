import { db } from "@/lib/db"
import { clerkClient } from "@clerk/nextjs"

interface IListingId {
  listingId?: string
}

export const getListingById = async (params: IListingId) => {
  try {
    const { listingId } = params

    const listing = await db?.listings?.findFirst({
      where: {
        id: listingId,
      },
    })

    const userDetails = await clerkClient.users.getUser(listing?.userId!)
    let listingData

    listingData = {
      ...listing,
      createdAt: listing?.createdAt?.toISOString(),
      profileImage: userDetails?.imageUrl,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
    }

    return listingData
  } catch (error: any) {
    throw new Error(error)
  }
}
