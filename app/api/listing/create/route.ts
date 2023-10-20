import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { rentModalValidator } from "@/lib/zodVaildator"
import { z } from "zod"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized user!", { status: 401 })
    }

    const body = await req.json()
    const requestBody = rentModalValidator?.parse(body)

    const createReservation = await db.listings.create({
      data: {
        ...requestBody,
        userId,
      },
      select: {
        image: true,
      },
    })

    if (!createReservation) {
      return new Response("Database error", { status: 500 })
    }

    return NextResponse.json({ data: createReservation, status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error?.message)
      return new Response(error.message, { status: 402 })
    }
    return new Response("Internal server error occured!", { status: 500 })
  }
}
