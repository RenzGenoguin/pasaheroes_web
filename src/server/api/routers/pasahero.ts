import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pasaheroRouter = createTRPCRouter({
  getAllPasahero: publicProcedure
    .input(
      z.object({
        searchText:z.string()
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.pasahero.findMany({
        where: {
          OR: [
            {
              fullName: {
                contains: input.searchText,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  getPasahero: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {

      const pasahero = await ctx.prisma.pasahero.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Ride: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
              Rating:true,
              Driver:{
                include:{
                  vehicleType:true
                }
              },
              Pasahero:true
            },
          },
        },
      });
    return pasahero
    }),
});
