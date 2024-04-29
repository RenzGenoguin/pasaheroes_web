import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const vehicleTypeRouter = createTRPCRouter({
  createVehicleType: publicProcedure
    .input(
      z.object({
        vehicleType: z.string(),
        required:z.boolean()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const vehicleType = await ctx.prisma.vehicleType.create({
        data: {
          vehicleType: input.vehicleType,
          driverPapersRequired: input.required
        },
      });
      return vehicleType;
    }),

  getAllvehicleTypes: publicProcedure
    .input(
      z.object({
        searchText: z.string(),
        withOptionFormat: z.boolean().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const vht = await ctx.prisma.vehicleType.findMany({
        where: {
          vehicleType: {
            contains: input.searchText,
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Driver: true,
        },
      });
      if (input.withOptionFormat) {
        return vht.map((data) => {
          return {
            value: data.id,
            label: data.vehicleType,
            required: data.driverPapersRequired
          };
        });
      }
      return vht;
    }),
  deleteVehicleType: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.vehicleType.delete({
        where: {
          id: input.id,
        },
      });
    }),
  editvehicleType: publicProcedure
    .input(
      z.object({
        id: z.number(),
        vehicleType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.vehicleType.update({
        where: {
          id: input.id,
        },
        data: {
          vehicleType: input.vehicleType,
        },
      });
    }),
});
