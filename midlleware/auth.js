import jwt from 'jsonwebtoken'
import schoolAdminModel from '../../DB/models/SchoolAdmin/schoolAdmin.js';
import { AppError } from '../../appError.js';
// جمعنا الاشياء المشتركة الي لازم تكون لليوزر الي مسجل دخوله
export const auth =(req,res,next)=>{
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
    
    req.id = decoded.id;
    next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}

//التاكد هل المستخدم هو مدير للمدرسة
export const schoolAdmin=async(req,res,next)=>{
    try{
    const email=req.body.email;
   // return res.json({email})
  const schoolAdmin=await schoolAdminModel.findOne({email})
  //return res.json(schoolAdmin)
    if(!schoolAdmin){
      return next(new AppError("user not found",404))
    }
    
    //return res.json(schoolAdmin.role)
    if(schoolAdmin.role !== "schoolSdmin"){
      return next(new AppError("You aren't school admin yet. ",404))
    }
    next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}