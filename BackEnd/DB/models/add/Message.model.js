import { model, Schema, Types } from "mongoose";
import mongoose from 'mongoose';

const messageSchema =new Schema({
    message:{
        type:String,
        required:true,
    },
    recivedId:{
        type:Types.ObjectId,
        required:true,
        ref:'User',    // لحتى اربطه مع جدول اليوزر واجيب الايدي 
    }
},{
    timestamps:true
})
const messageModel =model('message',messageSchema)
export default messageModel;
