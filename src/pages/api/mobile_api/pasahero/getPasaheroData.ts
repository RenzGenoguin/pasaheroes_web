import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
 
type ResponseData = {
  pasahero?:any;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("ho")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { username } = req.body;
      const pasahero = await prisma.pasahero.findFirst({
        where:{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          username:username
        }
      })
      if(!pasahero){
        res.status(401).json({pasahero:null });}
        else {
        res.status(200).json({ pasahero });
      }
  }