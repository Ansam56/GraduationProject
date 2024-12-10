//upvote
import { model, Schema, Types } from "mongoose";
import mongoose from 'mongoose';

const postSchema =new Schema({
   title:{
    type:String,
    required:true
   },
   body:{
    type:String,
    required:true
   },
   image:{
    type:String
   },
   userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true
   },
   like:[{
    type:Types.ObjectId,
    ref:"User"
   }],
   unlike:[{
    type:Types.ObjectId,
    ref:"User"
   }],

},{
    toJSON:{virtuals:true},  // عشان الفيرتشول
    toObject:{virtuals:true},
    timestamps:true
})
//لحتى اقدر اعرض البوست مع الكومنت
postSchema.virtual("comment",{  //comment >>رح تكون نفس الي حتنعرض في البوست في الباث
    ref:'Comment', //  اسم الجدول الي بدي اجيب منه
    foreignField:'postId', // المفتاح الاجنبي الي بدي اربط فه
    localField:'_id' // المفتاح الاساسي في الجدول الي انا فيه الوبست
})
const PostModel =mongoose.model('Post',postSchema)
export default PostModel;
