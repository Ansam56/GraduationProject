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
    }
},{
    timestamps:true
})
const userModel =mongoose.model('User',userSchema)
export default userModel;
