import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getRidesByDateAndStatus: publicProcedure
    .input(
      z.object({
        date:z.date(),
        status:z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
        let status :any = {}
        console.log(input.status)
        if(input.status === "done"){
            status={
            endRide:{
                not:null
            }}
        } else if(input.status === "riding"){
            status={
                endRide:null}
        }

      return await ctx.prisma.ride.findMany({
        where: {
            ...status,
          AND: [
            { startRide: { lte: dayjs(input.date).endOf("day").toDate() } },
            { startRide: { gte: dayjs(input.date).startOf("day").toDate() } },
          ],
        },
        orderBy:{
          startRide:"desc"
        },
        include: {
          Pasahero: true,
          Comment: true,
          Rating: true,
          Driver: {
            include:{
                vehicleType:true
            }
          },
        },
      });
    }),
});
