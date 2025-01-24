import studentModel from './../../../DB/models/student.js'
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import cloudinary from "../../utils/cloudinary.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../utils/sendEmail.js'
import userModel from "../../../DB/models/Admin/user.model.js";
import multer  from'multer';
import circleModel from '../../../DB/models/schools/circls.js';
import schoolModel from '../../../DB/models/schools/school.js'
import dailyReportModel from '../../../DB/models/reports/dailyStudent.js';
export const register =async(req,res,next)=>{
  const school=await schoolModel.findById(req.params.schoolId)
  if(!school){
    return next(new AppError("school not exit",404))
  }
  if( school.status!=="active" ||!school.availableforStudent ){
    return next(new AppError("school not active yet .",404))
  }
  const{userName,email,password,cpassword}=req.body;
    const student =await studentModel.findOne({email}); //to confirm its new person
    if (student){
        return next(new AppError("email exit",409))
    }
    if(await userModel.findOne({email},{status:"active"})){
        return next(new AppError("user exit",409))
    }
    if(password != cpassword){
        return next(new AppError("Passwords not match",409))
    }
    const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const token =jwt.sign({email},process.env.confirmEmailToken)
    req.body.password=hashPass;
    req.body.schoolId=req.params.schoolId
    const newUser =await userModel.create(req.body); 
     const newStudent =await studentModel.create(req.body);
     await sendEmail(email,"WELCOME in TUBA ",userName,token);
     const id=newStudent._id
     return res.status(201).json({message:"success",id})
 
}

//join circle
export const joinCircle =async(req,res,next)=>{
   const{circleId,studentId}=req.params
   const circle=await circleModel.findById(circleId);
   if(!circle){
    return next(new AppError("circle not found",404))
   }
   if(circle.status!="active" || !circle.avilableForStudent){
    return next(new AppError("circle not active now ,try another time.",400))
   }
   //confirm student
   const student =await studentModel.findById(studentId)
   if(!student){
    return next(new AppError("user not found",404))
   }
   if(!student.confirmEmail){
    return next(new AppError("PLZ confirm your emil",400))
   }
   if(student.circleId){
    return next(new AppError("you can not join many circles",400))
   }
  student.role="student"
  student.circleId=circleId
  student.save();
  const email=student.email
  const user =await userModel.findOne({email})
  user.role="student";
  user.save();
  return res.status(201).json({message:"success",student})
  return next(new AppSucc("success",201))




}
export const getProfile=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =decoded.user.role;
  if(role!=="student" && role!=="user"){
   return next(new AppError("you are not student",404))
  }
  const email =decoded.user.email;
  //return res.json(email)
  const student =await studentModel.findOne({email})
  //return res.json(student.role)
  if(!student){
      return next(new AppError("user not found",404))
    
  }
  let circle=[];
  if(student.role==="student" && student.status==="active"){
    const circleId=student.circleId;
    const circleA=await circleModel.findById(circleId);
   // return res.json(student.circleId)
   // circle.push("circleId:",student.circleId)
    circle.push("circleName:",circleA.circleName);
    const school=await schoolModel.findOne(student.schoolId)
    circle.push("schoolName:",school.schoolName)

    // return res.json(circle)
  }
  if((student.role==="student" && student.status==="suspend")||student.role==="user"){
    const circleId=student.circleId;
    const circleA=await circleModel.findById(circleId);
   // return res.json(student.circleId)
   // circle.push("circleId:",student.circleId)
    circle.push("circleName:","");
    const school=await schoolModel.findOne(student.schoolId)
    circle.push("schoolName:",school.schoolName)

   //  return res.json(circle)
  }
  return res.status(201).json({message:"success",student,circle})
}   
export const updateProfile=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =req.role;
  //return res.json(role)
  if(role!=="student" && role!=="user"){
   return next(new AppError("user not found",404))
  }
  const email =req.email
  let edit=false;
  //return res.json(email)

  const student =await studentModel.findOne({email})
 // return res.json(student)
  if(!student){
      return next(new AppError("user not found",404))
  }
  const user =await userModel.findOne({email})
//return res.json(req.body)
const {mobile,country}=req.body;
/*return res.json(req.body.schoolName)
if(req.body.userName){
 // return res.json("hi")
  student.userName=userName;
  user.userName=userName;
  edit=true
}*/
if(req.body.mobile){
  student.mobile=mobile;
  user.mobile=mobile;
  edit=true
}
if(req.body.country){
  student.country=country;
  user.country=country;
  edit=true

}
if (req.file){
  const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/student/profilePicture`})   
  req.body.profilePicture={secure_url,public_id}
  student.profilePicture=req.body.profilePicture
  edit=true
}
if (req.file){
  const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/user/student/profilePicture`})   
  req.body.profilePicture={secure_url,public_id}
  user.profilePicture=req.body.profilePicture
}
student.save();
user.save();
if(!edit){
  return res.status(201).json({message:"no edit",student})
}
  return res.status(201).json({message:"success",student})
} 

export const deletePhoto=async(req,res,next)=>{
  const email=req.email;
const student =await studentModel.findOne({email})
if(!student){
  return next(new AppError("user not found",404))
}
const user =await userModel.findOne({email})
const profilePicture={secure_url:"https://res.cloudinary.com/dff9dgomp/image/upload/v1735912161/default_tbrups.jpg",
  public_id:"TUBA/default_tbrups.jpg"
} 

await cloudinary.uploader.destroy(student.profilePicture.public_id)
await cloudinary.uploader.destroy(user.profilePicture.public_id)
student.profilePicture=profilePicture;
user.profilePicture=profilePicture;
student.save();
user.save();

return next(new AppSucc("success",201))
}

export const getReport=async(req,res,next)=>{
  //try {
    const email=req.email;
    const student=await studentModel.findOne({email});
    if(!student){
      return res.status(400).json({ message: "student not found." });

    }
    const id=student._id;
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "يجب تحديد تاريخ البداية والنهاية." });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if(start>end){
      res.status(401).json({ message:"startDate must be less than endDate"});
    }
    const reports = await dailyReportModel.find({
      studentId: id, 
      creationDate: {
        $gte: start,
        $lte: end,
      },
    });
    if (reports.length === 0) {
      return res.status(404).json({ message: "لا توجد تقارير خلال هذه الفترة." });
    } 
     // حساب المجموعات
     let totalHifz = 0;
     let totalReview = 0;
     let totalTathbit = 0;
 
     reports.forEach((report) => {
       if (report.achievementType === "حفظ") totalHifz += report.pageCount;
       if (report.achievementType === "مراجعة") totalReview += report.pageCount;
       if (report.achievementType === "تثبيت") totalTathbit += report.pageCount;
     });
   const result = {
     summary: {
       totalHifz,
       totalReview,
       totalTathbit,
     },
      details: reports.map((report) => ({
        code:report._id,
        achievementType: report.achievementType,
        creationDate: report.creationDate,
        fromSurah_Ayah: report.startSurah+" / "+report.startVers,
        toSurah_Ayah: report.endSurah+" / "+report.endVers,
        pagesNumber: report.pageCount,
        notes: report.note,
        rating: report.rating,
        circleType:report.type
      })),
    };
    res.status(200).json({ message: "success",result });
 /* } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء جلب التقارير", error });
  }*/
}