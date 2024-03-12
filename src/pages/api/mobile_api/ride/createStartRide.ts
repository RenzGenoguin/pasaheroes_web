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
        const { pasaheroId, driverId } = req.body;
  
        const ride = await prisma.ride.create({
          data:{
            pasaheroId,
            driverId
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
        if(!ride){
          res.status(401).json({data:null, error:true });}
          else {
          res.status(200).json({ data:ride, error:false });
        }
      }catch(e){
        res.status(401).json({ data:null, error:true });
      }
  }