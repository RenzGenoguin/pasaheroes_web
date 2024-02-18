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
    .query(({ ctx, input }) => {
      return ctx.prisma.driver.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Rating: true,
          Comment: true,
          Ride: true,
          vehicleType: true,
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
