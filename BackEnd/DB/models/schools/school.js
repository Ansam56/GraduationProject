import { model, Schema, Types } from "mongoose";
import mongoose from 'mongoose';

const schoolSchema =new Schema({
    schoolName:{
        type:String,
        required:true,
        unique:true
    },address:{
        type:String,
        required:true
    },
   schoolInfo:{
        type:Object
    },
    schoolPhoto:{
     type:Object
    },
    schoolAdminId:{
        type:Types.ObjectId,
        ref:'schoolAdmin',
        required:true
    
       },
       description:{
        type:String
       },
    status:{
        type:String,
        default:'suspend',
        enum:['active','suspend','rejected']
    },availableforTeacher:{
        type:Boolean,
        default:false
    },availableforStudent:{
        type:Boolean,
        default:false
    },totalCircles:{
        type:Number,
        default:0
    },totalTeachers:{
        type:Number,
        default:0
    }
    ,totalStudents:{
        type:Number,
        default:0
    }
        
},{
    toJSON:{virtuals:true},  // عشان الفيرتشول
    toObject:{virtuals:true},
    timestamps:true
})
const schoolModel =mongoose.model('School',schoolSchema)
export default schoolModel;
