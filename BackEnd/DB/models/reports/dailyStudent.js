import { Types,model, Schema } from "mongoose";
import mongoose from 'mongoose';

const dailyReportSchema =new Schema({
   studentId:{
     type: Types.ObjectId,
     ref:`student`
   }, studentName:{
      type: String
    },
   teacherId:{
type: Types.ObjectId,
     ref:`teacher`
   }, schoolId:{
      type: Types.ObjectId,
           ref:`school`
         },
      circleId:{
            type: Types.ObjectId,
                 ref:`circle`
               },
 circleName:{
    type:String
   // required:true
         
 },type:{
    type:String,
    required:true 
 },creationDate:{
    type:Date,
    required:true 
 },achievementType:{
    type:String,
    enum:['حفظ','مراجعة','تثبيت'],
    default:"حفظ",
    required:true,
 },startSurah:{
    type:String,
    required:true 
 },endSurah:{
    type:String,
    required:true 
 },pageCount:{
    type:Number,
    required:true 
 },startVers:{
    type:Number,
    required:true 
 },endVers:{
    type:Number ,
    required:true
 },rating:{
    type:Number,
    enum:[0,1,2,3,4,5],
    default:0,
    required:true
 },note:{
    type:String
 }
 
    },{
        timestamps:true
    })
    const dailyReportModel =mongoose.model('dailyReport',dailyReportSchema)
    export default dailyReportModel;
    