import jwt from 'jsonwebtoken'
import schoolAdminModel from '../../DB/models/SchoolAdmin/schoolAdmin.js';
import { AppError } from '../../appError.js';
import teacherModel from '../../DB/models/teacher.js';
import userModel from '../../DB/models/Admin/user.model.js';
// جمعنا الاشياء المشتركة الي لازم تكون لليوزر الي مسجل دخوله
export const auth =async(req,res,next)=>{
    try{
    const {authorization}=req.headers;
    if(! authorization?.startsWith(process.env.BearerToken)){ // bearer token
        return res.status(500).json({message:"Invalid token!"})
    }
    const token=authorization.split(process.env.BearerToken)[1];
    

  
    const decoded = jwt.verify(token,process.env.Signiture)
    
    if(!decoded){
        return res.status(404).json({message:"invalid token"})
    }
   // return res.json(decoded)
    const id=decoded.user._id
    const user =await userModel.findById(id)
    if(!user ){
     return next (new AppError("you are not user",404))
    }
    req.id = id;
    req.email=user.email

    next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}

//التاكد هل المستخدم هو مدير للمدرسة
export const schoolAdmin=async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        if(! authorization?.startsWith(process.env.BearerToken)){ // bearer token
            return res.status(500).json({message:"Invalid token!"})
        }
        const token=authorization.split(process.env.BearerToken)[1];
        const decoded = jwt.verify(token,process.env.Signiture)     
        if(!decoded){
            return res.status(404).json({message:"invalid token"})
        }
     //  return res.json(decoded.user)
      const id=decoded.user._id
     // return res.json(id)
       const user =await userModel.findById(id)
       if(!user || user.role!="schoolAdmin"){
        return next (new AppError("you are not schoolAdmin",404))
       }
       
        req.id = id;
        req.email=user.email
       // return res.json(id)
        next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}

//التاكد من المستخدم هل هو معلم
export const isTeacher=async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        if(! authorization?.startsWith(process.env.BearerToken)){ // bearer token
            return res.status(500).json({message:"Invalid token!"})
        }
        const token=authorization.split(process.env.BearerToken)[1];
        const decoded = jwt.verify(token,process.env.Signiture)     
        if(!decoded){
            return res.status(404).json({message:"invalid token"})
        }
      // return res.json(decoded)
       const id=decoded.user._id
       const user =await userModel.findById(id)
       if(!user || user.role!="teacher"){
        return next (new AppError("you are not teacher",404))
       }
       
       req.id = id;
       req.email=user.email
        next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}

export const isStudent=async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        if(! authorization?.startsWith(process.env.BearerToken)){ // bearer token
            return res.status(500).json({message:"Invalid token!"})
        }
        const token=authorization.split(process.env.BearerToken)[1];
        const decoded = jwt.verify(token,process.env.Signiture)     
        if(!decoded){
            return res.status(404).json({message:"invalid token"})
        }
      // return res.json(decoded)
       const id=decoded.user._id
       const user =await userModel.findById(id)
       if(!user || (user.role!="student" && user.role!="user")){
        return next (new AppError("you are not student",404))
       }
       
       req.id = id;
       req.email=user.email
       req.role= user.role
        next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}