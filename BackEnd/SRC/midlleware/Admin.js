import adminModel from "../../DB/models/Admin/admin.js";
import { AppError } from "../../appError.js";

export const Admin=async(req,res,next)=>{
    try{
        const email =req.body.email;
       // return res.json({email})
        //التاكد من عدم التسجيل لادارة المنصة لاكثر من مالك
    if(!await adminModel.findOne({email})){
      return next(new AppError("you don't have athentication to register",409))
    }

    
    
    next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}