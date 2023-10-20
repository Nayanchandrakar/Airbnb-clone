import { favouritesValidation } from "../../../../lib/zodVaildator"
import { auth } from "@clerk/nextjs"
import { db } from "../../../../lib/db"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

interface postParams {
  listingId: string
}

export const POST = async (
  req: Request,
  { params }: { params: postParams }
) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized user!", { status: 401 })
    }

    const { listingId } = favouritesValidation.parse(params)

    const favourite = await db?.favourites?.create({
      data: {
        listingId,
        userId,
      },
      select: {
        id: true,
      },
    })

    if (!favourite) {
      return new Response("database error!", { status: 500 })
    }

    return NextResponse.json({
      message: "succefully favourated this listing!",
      status: 200,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      console.log(error?.message)
      return new Response(error.message, { status: 402 })
    }
    return new Response("Internal server error occured!", { status: 500 })
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: postParams }
) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized user!", { status: 401 })
    }

    const { listingId } = favouritesValidation.parse(params)

    const favourite = await db?.favourites?.deleteMany({
      where: {
        listingId: listingId,
        userId,
      },
    })

    if (!favourite) {
      return new Response("database error!", { status: 500 })
    }

    return NextResponse.json({
      message: "succefully unfavourated this listing!",
      status: 200,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      console.log(error?.message)
      return new Response(error.message, { status: 402 })
    }
    return new Response("Internal server error occured!", { status: 500 })
  }
}
