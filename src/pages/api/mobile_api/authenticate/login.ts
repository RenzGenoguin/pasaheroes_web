import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
 
type ResponseData = {
  message: string;
  isError?:string;
  isLoggedIn:boolean
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
      const { username, password } = req.body;
      const pasahero = await prisma.pasahero.findUnique({
        where:{
          username
        }
      })
      if(!pasahero){
        res.status(401).json({ message: 'Username not found', isError:'username', isLoggedIn:false });
      }else if(pasahero?.password!==password){
        res.status(401).json({ message: 'Incorrect password', isError:'password', isLoggedIn:false });
      }else {
        res.status(200).json({ message: 'Logged in', isLoggedIn:true });
      }
  }