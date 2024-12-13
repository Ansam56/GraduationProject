import { model, Schema } from "mongoose";
import mongoose from 'mongoose';

const userSchema =new Schema({
    userName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    
    },confirmEmail:{
        type:Boolean,
        default:false,
    },password:{
        type:String,
        required:true 
    },age:{
        type:Number
    },gender:{
        type:String,
        enum:['Male','Female']
    },profilePicture:{
        type:String
    },role:{
        type:String,
        enum:['user','admin','schoolSdmin','teacher','student'],
        default:'user'
    },
    status:{
        type:String,
        default:'suspend',
        enum:['active','suspend','rejected']
    }
},{
    timestamps:true
})
const userModel =mongoose.model('User',userSchema)
export default userModel;
