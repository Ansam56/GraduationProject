import { model, Schema } from "mongoose";
import mongoose from 'mongoose';

const teacherSchema =new Schema({
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
const teacherModel =mongoose.model('teacher',teacherSchema)
export default teacherModel;
