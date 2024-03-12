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
        const { id } = req.body;
  
        const rating = await prisma.rating.aggregate({
          where: {
            driverId: id as string,
          },
          _avg: {
            rating: true,
          },
          _count: true,
        });
        
        const driver = await prisma.driver.findUnique({
          where:{
            id:id as string
          },
          include:{
            vehicleType:true,
        }})
        if(!driver){
          res.status(200).json({data:null, error:false });}
          else {
          res.status(200).json({ data:{...driver, rating:rating._avg.rating}, error:false });
        }
      }catch(e){
        res.status(401).json({ data:null, error:true });
      }
  }