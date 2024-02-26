import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
 
type ResponseData = {
  message: string;
  isError?:string;
  isLoggedIn:boolean;
  data?:any;
  errorField?:any
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
      const payload = req.body;
      try{
        const pasahero  = await prisma.pasahero.findUnique({
          where:{
            username:payload.username
          }
        })
        if(pasahero){
          res.status(401).json({ message: 'Username already used', isError:'Username already used', isLoggedIn:false, errorField:"username" });
        }else{
          const createPasahero = await prisma.pasahero.create({
            data:{
              ...payload
            }
          })
          if(createPasahero){
          res.status(200).json({ message: 'Signed up', isLoggedIn:true , data:createPasahero});
          }else{
          res.status(401).json({ message: 'Error', isError:'Sign up error', isLoggedIn:false });
          }

        }
      }catch(error:any){
        console.log("error catched")
        res.status(401).json({ message: 'Error', isError:'Sign up error', isLoggedIn:false});
      }
  }