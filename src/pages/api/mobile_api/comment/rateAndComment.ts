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
        const { rideId, driverId, pasaheroId, rating, comment, ratingId, commentId, } = req.body;

        const ratingData :any = async () => {
          if(rating){
            return await prisma.rating.upsert({
              where:{
                id:ratingId || 0
              },
              update:{
                rating,
              },
              create:{
                rating,
                rideId,
                driverId,
                pasaheroId
              }
            }).then((data)=>{
              console.log(data, "rating data hahaha")
              return(data.id)})
          }else {
            return null
          }
        }
        console.log(commentId, "helloow")
        const commentData : any = async () => {
          if(comment){
            return await prisma.comment.upsert({
              where:{
                id:commentId || 0
              },
              update:{
                comment,
              },
              create:{
                rideId,
                comment,
                driverId,
                pasaheroId
              }
            }).then((data)=>{
              console.log(data, "comment data hahaha")
              return(data.id)})
          }else {
            return null
          }
        }
        const ratingIdForUpdate =await ratingData()
        const commentIdForUpdate =await commentData()
        if(!ratingId || !commentId){
          await prisma.ride.update({
            where:{
              id:rideId
            },
            data:{
              ratingId: ratingIdForUpdate ,
              commentId: commentIdForUpdate
            }
          })
        }
      }catch(e){
        res.status(401).json({ data:null, error:true });
      }
  }