import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const loginRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.prisma.admin.findFirst({
        where: {
          AND: [{ username: input.username }, { password: input.password }],
        },
      });
      if (admin) {
        return {
          userId: admin.id,
          userType: "admin",
          adminType: "admin",
        };
      } else {
        return {
          userId: "error",
        };
      }
    }),
});
