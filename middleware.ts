import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", /\/product(\/\w+)?/, "/api/webhooks/clerk"],
  ignoredRoutes: ["/no-auth-in-this-route", "/api/webhooks/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
