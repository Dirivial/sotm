import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dailyRouter = createTRPCRouter({
  // getAll: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.prisma.Day.findMany({
  //       where: { id: input.id },
  //       include: { entries: true },
  //     });
  //   }),
});
