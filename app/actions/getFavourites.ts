import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

const getFavourites = async () => {
  try {
    const { userId } = auth()

    let data: any = []

    if (userId) {
      data = await db?.favourites?.findMany({
        where: {
          userId: userId!,
        },
      })
    }

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getFavourites
