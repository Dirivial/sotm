import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.category.findMany({
        where: {
          userId: input.id,
        },
      });
    }),

  add: protectedProcedure
    .input(z.object({ name: z.string(), color: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      return await ctx.prisma.category.create({
        data: {
          name: input.name,
          userId: id,
          color: input.color,
        },
      });
    }),
});
