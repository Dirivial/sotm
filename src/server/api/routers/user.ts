import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
