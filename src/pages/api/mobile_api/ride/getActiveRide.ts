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
        const ride = await prisma.ride.findFirst({
            where:{
                pasaheroId:pasaheroId,
                endRide: {
                    equals:null
                }
            },
            include:{
                Rating:true,
                Comment:true,
                Driver:{
                    include:{
                        vehicleType:true
                    }
                }
            }
        });
        let rating:any = { _avg:{rating:null}}
         if(ride){
          rating = await prisma.rating.aggregate({
            where: {
              driverId: ride.driverId
            },
            _avg: {
              rating: true,
            },
            _count: true,
          });
         }
        if(!ride){
          res.status(200).json({data:null, error:false });}
          else {
          res.status(200).json({ data:{...ride, avgRating : rating._avg.rating}, error:false });
        }
      }catch(e){
        res.status(401).json({ data:null, error:true });
      }
  }