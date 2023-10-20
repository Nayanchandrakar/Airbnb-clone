import { string, z } from "zod"

export const rentModalValidator = z.object({
  category: z.string().min(1, "category is required"),
  location: z.string().min(1, "location is a required field"),
  guestCount: z.number().default(1),
  roomCount: z.number().default(1),
  bathroomCount: z.number().default(1),
  image: z.string().min(1, "image is required"),
  description: string().min(1, "description required"),
  title: string().min(1, "title is required"),
  price: z.number(),
})

export const reservationValidation = z.object({
  startDate: z.string().min(1, "startDate is a mandatory field"),
  endDate: z.string().min(1, "endDate is a mandatory field"),
  listingId: z.string().min(1, "listingId is a mandatory field"),
  totalPrice: z.number().min(1, "price is a required field cannot be empty"),
})

export const favouritesValidation = z.object({
  listingId: z.string().min(1, "listingId is a required field"),
})

export type RentSchemaType = z.infer<typeof rentModalValidator>
