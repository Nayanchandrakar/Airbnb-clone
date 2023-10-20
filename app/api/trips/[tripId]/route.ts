import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
interface IParams {
  tripId?: string
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized user", { status: 401 })
    }
    const { tripId } = params

    if (!tripId) {
      return new Response("please provide a id", { status: 409 })
    }

    const trip = await db?.reservations.deleteMany({
      where: {
        id: tripId,
        OR: [{ userId }, { listing: { userId } }],
      },
    })

    if (!trip) {
      return new Response("Database error occured", { status: 402 })
    }

    return new Response("Succefully deleted the trip", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("An error occured from server!", { status: 500 })
  }
}
