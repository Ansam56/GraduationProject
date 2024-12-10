import { AppError } from "../../../appError.js";
import schoolAdminModel from "../../../DB/models/SchoolAdmin/schoolAdmin.js";
import schoolModel from "../../../DB/models/schools/school.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppSucc } from "../../../AppSucc.js";

//create school
export const creteSchool = async(req,res,next)=>{
    const adminId=req.params.id;
    //return res.json(req.params.id)
    req.body.schoolAdminId=adminId;
    
    req.body.schoolName=req.body.schoolName.toLowerCase();
    const name =req.body.schoolName;
    if(await schoolModel.findOne({name})){
        return next(new AppError("school exit",404))
      }
      const admin =await schoolAdminModel.findById(adminId)
    //return res.json(admin.status)
    if(!admin || admin.status !='active'){
        return next(new AppError("user not found",404))
    }
      if (req.file){
       const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/schoolInfo`})
     // return res.json(public_id)
     req.body.schoolInfo={secure_url,public_id}
    }
    const school = await schoolModel.create(req.body)
    
      return next(new AppSucc("success",200))
  
  

}