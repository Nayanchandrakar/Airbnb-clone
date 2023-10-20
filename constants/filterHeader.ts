import {
  GalleryThumbnails,
  Palmtree,
  Coffee,
  Umbrella,
  Warehouse,
  Bath,
  Snowflake,
  Wind,
  Truck,
  CloudRainWind,
  Sailboat,
  Leaf,
} from "lucide-react"

export interface filterHeaderInterface {
  id: number
  label: string
  Icon: any
  info: string
}

export const filterHeaderData: filterHeaderInterface[] = [
  {
    id: 4578665,
    label: "View",
    Icon: GalleryThumbnails,
    info: "A picturesque landscape that offers stunning panoramic vistas of natural beauty",
  },
  {
    id: 5685645,
    label: "Beach",
    Icon: Palmtree,
    info: "A tropical paradise with golden sands, palm trees, and crystal-clear waters perfect for relaxation",
  },
  {
    id: 5688686,
    label: "Coffee",
    Icon: Coffee,
    info: "Enjoy a warm cup of freshly brewed coffee at your favorite café.",
  },
  {
    id: 6457237,
    label: "Arctic",
    Icon: Snowflake,
    info: "Explore the frozen wonders of the Arctic, home to unique wildlife and ice-capped landscapes.",
  },
  {
    id: 4685685,
    label: "Rainy",
    Icon: Umbrella,
    info: "Embrace the cozy atmosphere of a rainy day under the shelter of an umbrella.",
  },
  {
    id: 34565687,
    label: "house",
    Icon: Warehouse,
    info: "A comfortable place to call home, providing shelter and comfort.",
  },
  {
    id: 46584846,
    label: "Pool",
    Icon: Bath,
    info: "Dive into a refreshing pool, perfect for beating the summer heat.",
  },
  {
    id: 3573484568,
    label: "Windmill",
    Icon: Wind,
    info: "The classic countryside charm of a spinning windmill against the sky.",
  },
  {
    id: 3527345743,
    label: "Campus",
    Icon: Truck,
    info: "A hub of learning and growth, where knowledge meets opportunity.",
  },
  {
    id: 457785678,
    label: "Cold",
    Icon: CloudRainWind,
    info: "Experience the crisp air and cool breezes of a chilly day.",
  },
  {
    id: 2345373457,
    label: "Ship",
    Icon: Sailboat,
    info: "Sail the open seas on a majestic sailboat, ready for adventure.",
  },
  {
    id: 568568568,
    label: "Nature",
    Icon: Leaf,
    info: "Connect with the outdoors, surrounded by the beauty of leaves ",
  },
]
