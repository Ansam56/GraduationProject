import schoolAdminModel from "../../../DB/models/SchoolAdmin/schoolAdmin.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import cloudinary from "../../utils/cloudinary.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../utils/sendEmail.js'
import userModel from "../../../DB/models/Admin/user.model.js";

//register
export const register =async(req,res,next)=>{
    const{userName,email,password}=req.body;

    const admin =await schoolAdminModel.findOne({email}); //to confirm its new person
    if (admin){
        return next(new AppError("email exit",409))
    }
    const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));

   const token =jwt.sign({email},process.env.confirmEmailToken)
   await sendEmail(email,"WELCOME in TUBA ",userName,token);
   req.body.password=hashPass;
   const newUser =await userModel.create(req.body);
   req.body.role='schoolAdmin'
    const newAdmin =await schoolAdminModel.create(req.body);
    

    return next(new AppSucc("success",201))
}
/*export const confirmEmail =async(req,res,next)=>{
    const {token} =req.params;
    const decoded =jwt.verify(token,process.env.confirmEmailToken)
    await schoolAdminModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
    //return res.json("hi")

    
    return next(new AppSucc("success",200))
}*/
    

export const logIn = async(req,res,next)=>{
    const{email,password}=req.body;
   // return res.json(req.body)

   
   
    const user =await schoolAdminModel.findOne({email});
    if(!user){
        return next(new AppError("email not found",409))
    }
    const match=bcrypt.compareSync(password,user.password);
    if(!match){
        return next(new AppError("invalid password",409))
    }
    if(!user.confirmEmail){
        return next(new AppError("plz confirm your email"))
    }
    const token=await jwt.sign({id:user._id,role:user.role},process.env.Signiture, )

    return res.status(201).json({message:"sucsess",token})
    }


export const viewRequests =async(req,res,next)=>{
    return res.json('hi')
}