import postModel from "../../../DB/models/add/post.model.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import cloudinary from "../../utils/cloudinary.js";
import CommentModel from "../../../DB/models/add/comment.model.js";

export const getPost=async(req,res,next)=>{
    //populate>> حتى اؤجع معلومات عن اليوزر الي كتب البوست
    const posts =await postModel.find({}).populate([{
          path:'userId',
          select:'userName profilePicture'
    },{
        path:'like',
        select:'userName profilePicture'
    },{
        //الطريقة الثالثة 
        path:'comment',
        
    }])
    // to get comments for post  >>child parent
    //1- loop >>bad way
    /*
    const postList=[];
    for(const post of posts){
        const comment =await CommentModel.find({postId:post._id})
        postList.push({post,comment})
    }
        */
    //2- cursor
    //3- virtual populate
    return res.status(200).json({message:"success",posts})
}
export const createPost=async(req,res,next)=>{
    const userId=req.id;
    const{title,body}=req.body;
    const{secure_url}=await cloudinary.uploader.upload(req.file.path);
    const post=await postModel.create({title,body,userId,image:secure_url})
      return next(new AppSucc("success",200))


}
export const likePost =async(req,res,next)=>{
    const userId=req.id;
    const{id}=req.params;
    const postLike =await postModel.findByIdAndUpdate(id,{
       // لما بدي اضيف على اريه جوا موديل .... $ هاي الاشارة خاصة بالمونغوز
       // push >add many time , addToSet >>add jyst one time
       /* $push:{
            like:userId
        }*/
       $addToSet:{
        like:userId
       }
    },{
            new:true 
            // to return new data after update
        }
    )
    if(!postLike){
        return next(new AppError("post not found",404))
    }
  //  return res.json({message:"success",postLike})
    return next(new AppSucc("success",201))
}
export const unlikePost =async(req,res,next)=>{
    const userId=req.id;
    const{id}=req.params;
    const postunLike =await postModel.findByIdAndUpdate(id,{
       // pull >>deleate
       $pull:{
        like:userId
       }
    },{
            new:true 
            // to return new data after update
        }
    )
    if(!postunLike){
        return next(new AppError("post not found",404))
    }
  //  return res.json({message:"success",postLike})
    return next(new AppSucc("success",201))
}

//comment 
export const createComment=async(req,res,next)=>{
    // لحتى اضيفهم على البدي
    req.body.userId=req.id;
    req.body.postId=req.params.id;
    if(req.file){
        const {secure_url}=await cloudinary.uploader.upload(req.file.path)
        req.body.image=secure_url;
    }
    const comment=await CommentModel.create(req.body);
    return res.status(201).json({message:"success",comment})

}