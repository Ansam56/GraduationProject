import { model, Schema } from "mongoose";
import mongoose from 'mongoose';

const schoolAdminSchema =new Schema({
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
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    idNumber:{
      type:Number,
      required:true
    },
    /*confirmEmail:{
        type:Boolean,
        default:false
    }*/
   profilePicture:{
        type:String
    },mobile:{
        type:String,
        required:true
    },country:{
        type:String,
        required:true
    },role:{
        type:String,
        enum:['user','admin','schoolAdmin','teacher','student'],
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
const schoolAdminModel =mongoose.model('schoolAdmin',schoolAdminSchema)
export default schoolAdminModel;
