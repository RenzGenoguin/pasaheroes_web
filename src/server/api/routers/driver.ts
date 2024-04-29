import { type Gender } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const driverRouter = createTRPCRouter({
  createDriver: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        contactNo: z.string(),
        address: z.string(),
        vehicleTypeId: z.number(),
        profileUrl: z.string(),
        gender: z.string(),
        licenceNo: z.string().optional(),
        plateNo: z.string().optional(),
        licencePhotoUrl:z.string().optional(),
        licenceExpiration:z.date().optional(),
        or:z.string().optional(),
        cr:z.string().optional(),
        franchiseNo:z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if(input.plateNo && input.or && input.cr){
        const vehicleDetails = await ctx.prisma.vehicleRegistrationDetails.create({
          data:{
            or:input.or,
            cr:input.cr,
            franchiseNo:input.franchiseNo
          }
        })
        if(vehicleDetails){
        return await ctx.prisma.driver.create({
          data: {
            firstName:input.firstName,
            lastName:input.lastName,
            address:input.address,
            contactNo:input.contactNo,
            profileUrl: input.profileUrl,
            vehicleTypeId:input.vehicleTypeId,
            plateNo  :input.plateNo,
            licenceNo:input.licenceNo,
            licencePhotoUrl:input.licencePhotoUrl,
            licenceExpiration:input.licenceExpiration,
            registrationId: vehicleDetails.id,
            gender:input.gender as Gender,
            fullName: `${input.firstName} ${input.lastName}`,
          },
        });
        }
      }else{
        return await ctx.prisma.driver.create({
          data: {
            firstName:input.firstName,
            lastName:input.lastName,
            address:input.address,
            contactNo:input.contactNo,
            profileUrl: input.profileUrl,
            vehicleTypeId:input.vehicleTypeId,
            gender:input.gender as Gender,
            fullName: `${input.firstName} ${input.lastName}`,
          },
        });
      }
    }),

  getAllDriver: publicProcedure
    .input(
      z.object({
        searchText: z.string(),
        vehicleId: z.number().nullish(),
        status: z.any(),
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
          status: input.status,
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
          registration:true
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
        take: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const count = await ctx.prisma.comment.aggregate({
        where: {
          driverId: input.id,
        },
        _count: true,
      });
      const comments = await ctx.prisma.comment.findMany({
        where: {
          driverId: input.id,
        },
        take: input.take,
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
      return {
        comments,
        count: count._count,
      };
    }),

  editDriver: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        contactNo: z.string(),
        address: z.string(),
        vehicleTypeId: z.number(),
        profileUrl: z.string(),
        gender: z.string(),
        licenceNo: z.string().optional(),
        plateNo: z.string().optional(),
        licencePhotoUrl:z.string().optional(),
        licenceExpiration:z.date().optional(),
        or:z.string().optional(),
        cr:z.string().optional(),
        franchiseNo:z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      console.log("maui", input.id)
      return ctx.prisma.driver.update({
        where: {
          id: input.id,
        },
        data: {
          firstName:input.firstName,
          lastName:input.lastName,
          address:input.address,
          contactNo:input.contactNo,
          profileUrl: input.profileUrl,
          vehicleTypeId:input.vehicleTypeId,
          plateNo  :input.plateNo ?? null,
          licenceNo:input.licenceNo ?? null,
          licencePhotoUrl:input.licencePhotoUrl ?? null,
          licenceExpiration:input.licenceExpiration ?? null,
          gender:input.gender as Gender,
          fullName: `${input.firstName} ${input.lastName}`,
        },
      }).then(async(data)=>{
      if(input.plateNo && input.or && input.cr){
        return
        // await ctx.prisma.vehicleRegistrationDetails.update({
        //   where:{
        //     id:data.id
        //   },
        //   data:{
        //     or:input.or,
        //     cr:input.cr,
        //     franchiseNo:input.franchiseNo
        //   }
        // })
      }
      });
    }),
});
