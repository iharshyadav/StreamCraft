import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// export default clerkMiddleware()

const isProtectedRoutes = createRouteMatcher(['/dashboard(.*)', '/payment(.*)'])
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoutes(req)) {
    auth().protect()
  }
})

export const config = {

    
 matcher: [
 '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 '/(api|trpc)(.*)',
 ],
}