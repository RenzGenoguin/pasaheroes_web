import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
 
type ResponseData = {
  driver?:any;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { id } = req.body;
      const driver = await prisma.driver.findUnique({
        where:{
          id:id as string
        }
      })
      console.log(driver)
      if(!driver){
        res.status(200).json({driver:null });}
        else {
        res.status(200).json({ driver });
      }
  }