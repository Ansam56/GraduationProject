import { Types,model, Schema } from "mongoose";
import mongoose from 'mongoose';

const studentSchema =new Schema({
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
    },/*birthDate:{
   type:Date,
   required:true,
   trim:true

    }*/ profilePicture:{
        type:Object,
        default:{secure_url:"https://res.cloudinary.com/dff9dgomp/image/upload/v1737492452/default_zcjitd.jpg",
            public_id:"TUBA/default_zcjitd.jpg"
        }   },birthDate:{
        type:Date,
        required:true
    },/*schoolId:{
        type:Types.ObjectId,
         ref:'School',
         required:true
             }*/
         schoolId:{
            type:Types.ObjectId,
             ref:'School',
             required:true
          },circleId:{
              type:Types.ObjectId,
              ref:'Circle',
             // required:true
                   }
      

},{
    timestamps:true
})
const studentModel =mongoose.model('student',studentSchema)
export default studentModel;
