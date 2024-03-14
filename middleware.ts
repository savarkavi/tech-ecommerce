import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    /\/product(\/\w+)?/,
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
  ],
  ignoredRoutes: [
    "/no-auth-in-this-route",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
