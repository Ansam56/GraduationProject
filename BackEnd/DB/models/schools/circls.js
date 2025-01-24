import { model, Schema, Types } from "mongoose";
import mongoose from 'mongoose';

// Define the schema for a Quranic circle
const circleSchema = new mongoose.Schema({
  circleName: { type: String, required: true }, // اسم الحلقة
  startTime: { type: String, required: true }, // وقت البدء
  endTime: { type: String, required: true }, // وقت الانتهاء
  logo: { type: Object }, // شعار الحلقة (optional)
  days: { type: [String], required: true }, // أيام الأسبوع (e.g., ['الأحد', 'الإثنين'])
  status:{
        type:String,
        default:'suspend',
        enum:['active','suspend','rejected']
    },teacherId:{
        type:Types.ObjectId,
        ref:'teacher',
        required:true
    },schoolId:{
        type:Types.ObjectId,
        ref:'school',
        required:true
    },totalStudents:{
         type:Number,
         default:0
    },type:{
        type:String,
        default:'حفظ ومراجعة',
        enum:['حفظ ومراجعة','تثبيت'],
        required:true
        }, circleGender: {
            type: String,
            default: 'both',
            enum: ['male', 'female', 'both'], // خيارات الجنس: ذكور، إناث، أو كلاهما
          },avilableForStudent:{
            type:Boolean,
            default:false
          }
    
        
},{
    toJSON:{virtuals:true},  // عشان الفيرتشول
    toObject:{virtuals:true},
    timestamps:true
})
const circleModel =mongoose.model('Circle',circleSchema)
export default circleModel;