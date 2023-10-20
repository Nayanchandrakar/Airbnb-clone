import { authMiddleware } from "@clerk/nextjs"
export default authMiddleware({
  publicRoutes: ["/", "/rooms/(.*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
