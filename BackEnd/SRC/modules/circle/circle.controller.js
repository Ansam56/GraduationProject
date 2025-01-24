import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import schoolModel from "../../../DB/models/schools/school.js";
import teacherModel from "../../../DB/models/teacher.js";
import cloudinary from "../../utils/cloudinary.js"
import circleModel from './../../../DB/models/schools/circls.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const creatCircle =async(req,res,next)=>{
  //return res.json(req.params.teacherId)
    const teacherId=req.params.teacherId;
     req.body.teacherId=teacherId;
     req.body.circleName=req.body.circleName.toLowerCase();
     const circleName =req.body.circleName;
     if(await circleModel.findOne({circleName})){
         return next(new AppError("circle exit",404))
       }
       const teacher =await teacherModel.findById(req.params.teacherId)
      // return res.json(admin._id)
     if(!teacher || teacher.role !='teacher'){
         return next(new AppError("user not found",404))
     }
     const user =await circleModel.findOne({teacherId})
     //return res.json(teacher)
     if(user){
       return next(new AppError("you can't create more than one circle",409))
     }
     req.body.schoolId=teacher.schoolId;
     //return res.json(req.body.schoolId)
     if (req.file){
       const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/circle/circleLogo`})
         req.body.logo={secure_url,public_id}
     }
     const circle = await circleModel.create(req.body)
    // return res.json(school.totalCircles)
     return next(new AppSucc("success",200))
}
//teacher circle 
export const allCircle =async(req,res,next)=>{
    const teacherId=req.params.id;
     req.body.teacherId=teacherId;
       const teacher =await teacherModel.findById(req.params.id)
      // return res.json(admin._id)
     if(!teacher || teacher.role !='teacher'){
         return next(new AppError("user not found",404))
     }
     const circle=await circleModel.findOne({teacherId},{status:"active"})
}
export const getProfile=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =decoded.user.role;
  if(role!=="teacher"){
   return next(new AppError("you don't have authentication to view circle",404))
  }
  const email =decoded.user.email;
  //return res.json(email)
  const teacher =await teacherModel.findOne({email})
  //return res.json(user)
  if(!teacher){
      return next(new AppError("user not found",404))
  }
  const circle=await circleModel.findOne({teacherId:teacher._id})
 // return res.json(school)
  if(!circle){
    return next(new AppError("circle not found",404))
}
  return res.status(201).json({message:"success",circle})
}
export const updateCircle=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =decoded.user.role;
  if(role!=="teacher"){
   return next(new AppError("you don't have authentication to view circle",404))
  }
  const email =decoded.user.email;
  //return res.json(email)
  const teacher =await teacherModel.findOne({email})
  //return res.json(user)
  if(!teacher){
      return next(new AppError("user not found",404))
  }
  const circle=await circleModel.findOne({teacherId:teacher._id})
 // return res.json(school)
  if(!circle){
    return next(new AppError("circle not found",404))
}
const {circleName,startTime,endTime,days,status,avilableForStudent}=req.body;
if(req.body.circleName){
  req.body.circleName=req.body.circleName.toLowerCase();
  const circleName =req.body.circleName;
  if(await circleModel.findOne({circleName})){
      return next(new AppError("circle exit",404))
    }
  circle.circleName=circleName;
}
if(req.body.startTime){
  circle.startTime=startTime;
}if(req.body.endTime){
  circle.endTime=endTime;
}if(req.body.days){
 // return res.json(days)
  circle.days=days;
}
if(req.body.status){
  circle.status=status
}
if (req.file){
  const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/circle/circleLogo`})   
  req.body.logo={secure_url,public_id}
  circle.logo=req.body.logo
}
if(req.body.avilableForStudent){
  circle.avilableForStudent=avilableForStudent
}
circle.save();

  return res.status(201).json({message:"success",circle})
} 
