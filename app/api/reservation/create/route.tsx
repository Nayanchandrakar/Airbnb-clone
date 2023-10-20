import { auth } from "@clerk/nextjs";
import { reservationValidation } from '@/lib/zodVaildator'
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
    try {
        const { userId } = auth()

        if (!userId) {
            return new Response("Unauthorized user!", { status: 401 })
        }

        const body = await req.json()
        const requestBody = reservationValidation.parse(body)

        const { endDate, listingId, startDate, totalPrice } = requestBody

        const createReservation = await db.listings.update({
            where: {
                id: listingId,
            },
            data: {
                reservation: {
                    create: {
                        userId,
                        endDate,
                        startDate,
                        totalPrice,
                    }
                }
            }
        })

        if (!createReservation) {
            return new Response('database error!', { status: 500 })
        }

        return NextResponse.json({ message: "reservations succefully created!", status: 200 })

    } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            console.log(error?.message)
            return new Response(error.message, { status: 402 })
        }
        return new Response("Internal server error occured!", { status: 500 })
    }
}