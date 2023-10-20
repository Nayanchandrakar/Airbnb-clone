import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
interface IParams {
  reservationId?: string
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
    const { reservationId } = params

    if (!reservationId) {
      return new Response("please provide a id", { status: 409 })
    }

    const deleteReservation = await db?.reservations?.delete({
      where: {
        id: reservationId,
      },
      select: {
        id: true,
      },
    })

    if (!deleteReservation) {
      return new Response("Database error occured", { status: 402 })
    }

    return new Response("Succefully deleted the reservation", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("An error occured from server!", { status: 500 })
  }
}
