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
        const { driverId } = req.body;
        
        const comments = await prisma.comment.findMany({
          where:{
            driverId:driverId as string
          },
        orderBy:{
          createdAt:"desc"
        }})
        if(!comments){
          res.status(200).json({data:null, error:false });}
          else {
          res.status(200).json({ data:comments, error:false });
        }
      }catch(e){
        res.status(401).json({ data:null, error:true });
      }
  }