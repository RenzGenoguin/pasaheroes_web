import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
 
type ResponseData = {
  data?:any;
  error:boolean
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
      try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { pasaheroId } = req.body;
        
        const rides = await prisma.ride.findMany({
          where:{
            pasaheroId:pasaheroId as number
          },
          include:{
            Driver:{
              include:{
                vehicleType:true
              }
            },
            Rating:true,
            Comment:true
          },
        orderBy:{
          startRide:"desc"
        }})
        if(!rides.length){
          res.status(200).json({data:null, error:false });}
          else {
          res.status(200).json({ data:rides, error:false });
        }
      }catch(e){
        res.status(401).json({ data:null, error:true });
      }
  }