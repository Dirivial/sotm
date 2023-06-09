import { dailyRouter } from "~/server/api/routers/daily";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  daily: dailyRouter,
  user: userRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
