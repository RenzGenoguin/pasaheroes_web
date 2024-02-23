import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const adminAccountsRouter = createTRPCRouter({
  getAdmin: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.admin.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
