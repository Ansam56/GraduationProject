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
        enum:['user','admin','schoolAdmin','teacher','student'],
        default:'user'
    },
    status:{
        type:String,
        default:'suspend',
        enum:['active','suspend','rejected']
    }, profilePicture:{
        type:Object,
        default:{secure_url:"https://res.cloudinary.com/dff9dgomp/image/upload/v1737492452/default_zcjitd.jpg",
            public_id:"TUBA/default_zcjitd.jpg"
        }
    },sendCode:{
        type:String,
        default:null
    },birthDate:{
        type:Date
    },
   /* teacherInfo:{
        type:Object,
        //required:true
    }*/
},{
    timestamps:true
})
const userModel =mongoose.model('User',userSchema)
export default userModel;
