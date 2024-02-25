import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'
import jwt from 'jsonwebtoken';
 
type ResponseData = {
  message?: any;
  token?:any
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // console.log(req)
  // const {name} = req.body
  // res.status(200).json({ message: `${name} from api` })
const secretKey ="sdvdsad"
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      // In a real application, you would validate the user credentials here
      if (username && password) {
        const user = { username: 'exampleUser' };
  
        const token = jwt.sign(user, secretKey);
        res.status(401).json({ message: 'Invalid credentials' })
        // res.status(200).json({ token, username, password });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }