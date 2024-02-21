import { Gender } from "@prisma/client";
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

  getDriver: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rating = await ctx.prisma.rating.aggregate({
        where: {
          driverId: input.id,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      });

      const driver = await ctx.prisma.driver.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Comment: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Ride: {
                select: {
                  Rating: true,
                },
              },
            },
          },
          vehicleType: true,
        },
      });
      return {
        ...driver,
        rating: rating._count ? rating._avg.rating : null,
      };
    }),
});
