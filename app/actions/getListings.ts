import { db } from "@/lib/db"

export interface IListingParams {
  category?: string
  startDate?: string
  endDate?: string
  location?: string
  bathroomCount?: number
  userId?: string
  guestCount?: number
  roomCount?: string
}

export default async function getListings(params: IListingParams) {
  try {
    let dbQuery: any = {}

    const {
      bathroomCount,
      category,
      endDate,
      guestCount,
      roomCount,
      location,
      startDate,
      userId,
    } = params

    if (userId) {
      dbQuery.userId = userId
    }

    if (category) {
      dbQuery.category = category
    }

    if (bathroomCount) {
      dbQuery.bathroomCount = {
        gte: +Number(bathroomCount),
      }
    }

    if (guestCount) {
      dbQuery.guestCount = {
        gte: +Number(guestCount),
      }
    }

    if (roomCount) {
      dbQuery.roomCount = {
        gte: +Number(roomCount),
      }
    }

    if (location) {
      dbQuery.location = location
    }

    if (startDate && endDate) {
      dbQuery.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listingsData = await db?.listings?.findMany({
      where: dbQuery,
      select: {
        image: true,
        description: true,
        price: true,
        category: true,
        id: true,
        location: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const getAllListings = listingsData?.map((data) => ({
      ...data,
      createdAt: listingsData?.[0]?.createdAt?.toISOString(),
    }))

    return getAllListings
  } catch (error: any) {
    throw new Error(error)
  }
}
