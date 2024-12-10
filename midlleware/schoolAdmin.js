import jwt from 'jsonwebtoken'
import schoolAdminModel from '../../DB/models/SchoolAdmin/schoolAdmin.js';
import { AppError } from '../../appError.js';
// جمعنا الاشياء المشتركة الي لازم تكون لليوزر الي مسجل دخوله
export const isSchoolAdmin =(req,res,next)=>{
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

