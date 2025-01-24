import schoolAdminModel from "../../../DB/models/SchoolAdmin/schoolAdmin.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import cloudinary from "../../utils/cloudinary.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendActiveEmail, sendEmail } from '../../utils/sendEmail.js'
import userModel from "../../../DB/models/Admin/user.model.js";
import teacherModel from "../../../DB/models/teacher.js";
import schoolModel from "../../../DB/models/schools/school.js";
import circleModel from "../../../DB/models/schools/circls.js";
import { Admin } from "../../midlleware/Admin.js";

//register
export const register =async(req,res,next)=>{
    const{userName,email,password,cpassword}=req.body;
   // return res .json(cpassword)
    const admin =await schoolAdminModel.findOne({email}); //to confirm its new person
    if (admin){
        return next(new AppError("email exit",409))
    }
    if(password != cpassword){
      //  return res .json({cpassword})
        return next(new AppError("Passwords not match",409))
    } if(await userModel.findOne({email},{status:"active"})){
        return next(new AppError("user exit",409))
    }
    const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
   const token =jwt.sign({email},process.env.confirmEmailToken)
   await sendEmail(email,"WELCOME in TUBA ",userName,token);
   req.body.password=hashPass;
   req.body.role='schoolAdmin'
   const newUser =await userModel.create(req.body);
   

    const newAdmin =await schoolAdminModel.create(req.body);
    const id=newAdmin._id
    return res.status(201).json({message:"success",id})
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


export const getAllTeacherReq =async(req,res,next)=>{
    const email= req.email
    // return res.json(email)
    const admin=await schoolAdminModel.findOne({email});
    const schoolAdminId=admin._id;
    const school=await schoolModel.findOne({schoolAdminId})
    // const circles =await circleModel.find({schoolId:school._id});
    const teachers =await teacherModel.find( { 
        schoolId: school._id, // شرط أن يكون معرف المدرسة مطابقًا
        status: "suspend"     // شرط أن تكون الحالة "suspend"
      });
    return res.status(201).json({message:"success",teachers})
    
}
export const getAllTeacher=async(req,res,next)=>{
    const teachers =await teacherModel.find({status:"active"});
    return res.status(201).json({message:"success",teachers})
}
export const getProfile=async(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization.split(process.env.BearerToken)[1]
    const decoded = jwt.verify(token,process.env.Signiture)
    // return res.json(decoded.user._id) 
    const role =decoded.user.role;
    if(role!=="schoolAdmin"){
     return next(new AppError("you are not schoolAdmin",404))
    }
    const email =decoded.user.email;
    //return res.json(email)
    const schollAdmin =await schoolAdminModel.findOne({email})
    //return res.json(user)
    if(!schollAdmin){
        return next(new AppError("user not found",404))
    }
    const schoolAdminId=schollAdmin._id;
    const school=await schoolModel.find({schoolAdminId})
    return res.status(201).json({message:"success",schollAdmin,school})
}   
export const acceptTeacher=async(req,res,next)=>{
    const teacher =await teacherModel.findById(req.params.teacherId)
    if(!teacher){
        return next(new AppError("teacher not found",404))
    }
  //  return res.json(student)
    if(teacher.role!=="teacher"){
        return next(new AppError("teacher does not have any circle",404))
    }
    if(!teacher.confirmEmail){
        return next(new AppError("teacher does not confirm his email",404))
    }const circle= await circleModel.findOne({teacherId:req.params.teacherId})
    //return res.json(teacherUser)  
   if(!circle){
    return next(new AppError("teacher doesn't have a circle",404))
   }
   circle.status="active";
    const user =await userModel.findOne({email:teacher.email})
   // return res.json(user)
   teacher.status=user.status="active";
   teacher.save();
   circle.save();
   user.save();
   const school=await schoolModel.findById(teacher.schoolId)
   school.totalCircles=school.totalCircles+1;
   school.totalTeachers=school.totalTeachers+1;
   school.save();
   const userName=user.userName;
    const email=user.email
   const token =jwt.sign({email},process.env.confirmEmailToken)
   await sendActiveEmail(email,"WELCOME in TUBA",userName,user.role);
   return next(new AppSucc("success",201))
}

export const rejectTeacher=async(req,res,next)=>{
   // return res.json("hi")
    const teacher =await teacherModel.findById(req.params.teacherId)
    if(!teacher){
        return next(new AppError("teacher not found",404))
    }
   // return res.json(teacher)
    if(teacher.role!=="teacher"){
        return next(new AppError("teacher does not have any circle",404))
    }
    if(!teacher.confirmEmail){
        return next(new AppError("teacher does not confirm his email",404))
    }const circle= await circleModel.findOne({teacherId:req.params.teacherId})
    //return res.json(teacherUser)  
   if(!circle){
    return next(new AppError("teacher doesn't have a circle",404))
   }
   circle.status="rejected";
   circle.save();
    const user =await userModel.findOne({email:teacher.email})
   // return res.json(user)
   teacher.status=user.status="rejected";
   teacher.save();
   user.save();
   const userName=user.userName;
   const email=user.email
   const token =jwt.sign({email},process.env.confirmEmailToken)
        await sendRejectedEmail(email,"WELCOME in TUBA",userName,user.role);
   return next(new AppSucc("success",201))
}
export const getAllCircles=async(req,res,next)=>{
   const email= req.email
  // return res.json(email)
  const admin=await schoolAdminModel.findOne({email});
  const schoolAdminId=admin._id;
  const school=await schoolModel.findOne({schoolAdminId})
    const circles =await circleModel.find({schoolId:school._id});
   // return res.json(circles)
    return res.status(201).json({message:"success",circles})
}
//teacher suspend , rejected
export const getAllCirclesReq=async(req,res,next)=>{
    const email= req.email
    // return res.json(email)
    const admin=await schoolAdminModel.findOne({email});
    const schoolAdminId=admin._id;
    const school=await schoolModel.findOne({schoolAdminId})
    const circle =await circleModel.find({ schoolId: school._id, status: { $in: ["suspend", "rejected"] } });
    return res.status(201).json({message:"success",circle})
}
export const updateProfile=async(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization.split(process.env.BearerToken)[1]
    const decoded = jwt.verify(token,process.env.Signiture)
    // return res.json(decoded.user._id) 
    const role =decoded.user.role;
    if(role!=="schoolAdmin"){
     return next(new AppError("you aren't schoolAdmin",404))
    }
    const email =decoded.user.email;
    //return res.json(email)
    const schoolAdmin =await schoolAdminModel.findOne({email})
    //return res.json(user)
    if(!schoolAdmin){
        return next(new AppError("user not found",404))
    }
    const user=await userModel.findOne({email});
    let edit =false;
  //return res.json(req.body)
  const {country,mobile}=req.body;
  //return res.json(req.body.schoolName)
  if(req.body.country){
   // return res.json("hi")
    schoolAdmin.country=country;
    user.country=country;
    edit =true
  }
  if(req.body.mobile){
    schoolAdmin.mobile=mobile;
    user.mobile=mobile;
    edit=true
  }
  if (req.file){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/schoolAdmin/profilePicture`})   
    req.body.profilePicture={secure_url,public_id}
    schoolAdmin.profilePicture=req.body.profilePicture;
    edit=true
  }
  if (req.file){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/user/schoolAdmin/profilePicture`})   
    req.body.profilePicture={secure_url,public_id}
    user.profilePicture=req.body.profilePicture;
  }
  schoolAdmin.save();
  user.save();
  if(!edit){
    return res.status(201).json({message:"no edit",schoolAdmin})
  }
    return res.status(201).json({message:"success",schoolAdmin})
}