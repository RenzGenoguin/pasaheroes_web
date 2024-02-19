import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const driverRouter = createTRPCRouter({
  createDriver: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        plateNo: z.string(),
        contactNo: z.string(),
        address: z.string(),
        vehicleTypeId: z.number(),
        profileUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.driver.create({
        data: {
          ...input,
          fullName: `${input.firstName} ${input.lastName}`,
        },
      });
    }),

  getAllDriver: publicProcedure
    .input(
      z.object({
        searchText: z.string(),
        vehicleId: z.number().nullish(),
      }),
    )
    .query(({ ctx, input }) => {
      let searchVehicleType = {
        vehicleTypeId: input.vehicleId,
      } as any;
      if (!input.vehicleId) {
        searchVehicleType = {};
      }
      return ctx.prisma.driver.findMany({
        where: {
          ...searchVehicleType,
          OR: [
            {
              fullName: {
                contains: input.searchText,
                mode: "insensitive",
              },
            },
            {
              plateNo: {
                contains: input.searchText,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          vehicleType: true,
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

  getDriversRideHistory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.ride.findMany({
        where: {
          driverId: input.id,
          AND: [
            { startRide: { lte: input.endDate } },
            { startRide: { gte: input.startDate } },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Pasahero: true,
          Comment: true,
          Rating: true,
        },
      });
    }),

  getCommentsToDriver: publicProcedure
    .input(
      z.object({
        id: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          driverId: input.id,
          AND: [
            { createdAt: { lte: input.endDate } },
            { createdAt: { gte: input.startDate } },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Pasahero: true,
          Ride: {
            select: {
              Rating: true,
            },
          },
        },
      });
    }),

  editDriver: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        plateNo: z.string(),
        contactNo: z.string(),
        address: z.string(),
        vehicleTypeId: z.number(),
        profileUrl: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const {
        firstName,
        lastName,
        plateNo,
        contactNo,
        address,
        vehicleTypeId,
        profileUrl,
      } = input;
      return ctx.prisma.driver.update({
        where: {
          id: input.id,
        },
        data: {
          fullName: `${input.firstName} ${input.lastName}`,
          firstName,
          lastName,
          plateNo,
          contactNo,
          address,
          vehicleTypeId,
          profileUrl,
        },
      });
    }),
});
