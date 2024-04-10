import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
 
type ResponseData = {
  pasahero?:any;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { 
        id, 
        firstName,
        lastName,
        gender,
        emergencyContact,
        contactNo,
        address, } = req.body;
      const pasahero = await prisma.pasahero.update({
        where:{
            id:id
        },
        data:{
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        gender,
        emergencyContact,
        contactNo,
        address,
        }
      })
      if(!pasahero){
        res.status(401).json({pasahero:null });}
        else {
        res.status(200).json({ pasahero });
      }
  }