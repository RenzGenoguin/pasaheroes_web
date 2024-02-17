import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const adminAccountsRouter = createTRPCRouter({
  getAdmin: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.admin.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
