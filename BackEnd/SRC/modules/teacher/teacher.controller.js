import teacherModel from "../../../DB/models/teacher.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import cloudinary from "../../utils/cloudinary.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mime from 'mime';
import path from 'path';
import fs from 'fs';
import { sendEmail,sendActiveEmail, sendRejectedEmail } from '../../utils/sendEmail.js'
import userModel from "../../../DB/models/Admin/user.model.js";
import multer  from'multer';
import studentModel from './../../../DB/models/student.js'
import schoolModel from "../../../DB/models/schools/school.js";
import circleModel from './../../../DB/models/schools/circls.js'
import dailyReportModel from "../../../DB/models/reports/dailyStudent.js";
import quranModel from "./../../../DB/models/quran/quran.js"
import { getPageAyah } from "../auth/auth.controller.js";
import axios from 'axios';
import _ from 'lodash'



export const register =async(req,res,next,err)=>{
      //return res.json(req.params)
      const school=await schoolModel.findById(req.params.schoolId)
      if(!school){
        return next(new AppError("school not exit",404))
      }
      if(!school.availableforTeacher || school.status!=="active"){
        return next(new AppError("school not active yet .",404))
      }
    const{userName,email,password,cpassword}=req.body;
  //  return res .json(cpassword)

    const teacher =await teacherModel.findOne({email}); //to confirm its new person
    if (teacher){
        return next(new AppError("email exit",409))
    }
    if(await userModel.findOne({email},{status:"active"})){
        return next(new AppError("user exit",409))
    }
    if(password != cpassword){
       // return res .json({cpassword})
        return next(new AppError("Passwords not match",409))
    }
   // return res.json("hi")
    if (req.file){
      const filePath = req.file.path;
      const fileExtension = mime.getExtension(req.file.mimetype) || 'unknown';
      let finalPath = filePath;
      if (!path.extname(filePath)) {
        finalPath = `${filePath}.${fileExtension}`;
        fs.renameSync(filePath, finalPath);
      }    
      // return res.json(req.file.path)
      const { secure_url, public_id } = await cloudinary.uploader.upload(finalPath, {
        folder: `${process.env.APPNAME}/teacher/teacherInfo`,
        resource_type: "auto",
      });
    
      // إعداد النتيجة النهائية مع الامتداد
      const secureUrlWithExtension = secure_url.endsWith(`.${fileExtension}`) ? secure_url : `${secure_url}.${fileExtension}`;
      req.body.teacherInfo = { secure_url: secureUrlWithExtension, public_id };
    
      // حذف الملف المحلي بعد الرفع (اختياري)
         //return res.json(public_id)
      //  return res.json({ teacherInfo: req.body.teacherInfo });

         
    }
    const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
   const token =jwt.sign({email},process.env.confirmEmailToken)
   req.body.password=hashPass;
   req.body.role='teacher'
   req.body.schoolId=req.params.schoolId
   const newUser =await userModel.create(req.body);
   //req.body.role='teacher'
    const newTeacher =await teacherModel.create(req.body);
    await sendEmail(email,"WELCOME in TUBA ",userName,token);
    const id=newTeacher._id
    return res.status(201).json({message:"success",id})

    //return next(new AppSucc("success",201))
}
export const acceptStudent=async(req,res,next)=>{
    const student =await studentModel.findById(req.params.studentId)
    if(!student){
        return next(new AppError("student not found",404))
    }
  //  return res.json(student)
    if(student.role!=="student"){
        return next(new AppError("student does not join to any circle",404))
    }
    if(!student.confirmEmail){
      return next(new AppError("student does not confirm his email",404))
  }
    const email=student.email;
    const user =await userModel.findOne({email:student.email})
   // return res.json(user)
   student.status=user.status="active";
   student.save();
   user.save();
   const school=await schoolModel.findById(student.schoolId)
   school.totalStudents=school.totalStudents+1;
   school.save();
   const circle=await circleModel.findById(student.circleId)
   circle.totalStudents=circle.totalStudents+1;
   circle.save();
    const userName=user.userName;
     // return res.json(userName)
    const token =jwt.sign({email},process.env.confirmEmailToken)
    await sendActiveEmail(email,"WELCOME in TUBA",userName,user.role);
   return next(new AppSucc("success",201))
}
export const rejectStudent=async(req,res,next)=>{
  // return res.json("hi")
   const student =await studentModel.findById(req.params.studentId)
   if(!student){
       return next(new AppError("student not found",404))
   }
  // return res.json(teacher)
   if(student.role!=="student"){
       return next(new AppError("you are not student",404))
   }
   if(!student.confirmEmail){
    return next(new AppError("student does not confirm his email",404))
}
   const user =await userModel.findOne({email:student.email})
  // return res.json(user)
  student.status=user.status="rejected";
  student.save();
  user.save();
   const userName=user.userName;
   const email=user.email
     const token =jwt.sign({email},process.env.confirmEmailToken)
     await sendRejectedEmail(email,"WELCOME in TUBA",userName,user.role);
  return next(new AppSucc("success",201))
}
export const getProfile=async(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization.split(process.env.BearerToken)[1]
    const decoded = jwt.verify(token,process.env.Signiture)
    // return res.json(decoded.user._id) 
    const role =decoded.user.role;
    if(role!=="teacher"){
     return next(new AppError("you are not teacher",404))
    }
    const email =decoded.user.email;
    //return res.json(email)
    const teacher =await teacherModel.findOne({email})
    //return res.json(user)
    if(!teacher){
        return next(new AppError("user not found",404))
    }
    const circle=await circleModel.findOne({teacherId:teacher._id})
    const id=teacher.schoolId;
   // return res.json(id)
    const school=await schoolModel.findById(id)
 // return res.json(school)
  if(!circle){
    return next(new AppError("circle not found",404))
  }
  if(!school){
    return next(new AppError("school not found",404))
  }
  const schoolName=school.schoolName;
    return res.status(201).json({message:"success",teacher,circle,schoolName})
}  
export const updateProfile=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =decoded.user.role;
  if(role!=="teacher"){
   return next(new AppError("user not found",404))
  }
  const email =decoded.user.email;
  //return res.json(email)
  const teacher =await teacherModel.findOne({email})
  //return res.json(user)
  let edit=false;

  if(!teacher){
      return next(new AppError("user not found",404))
  }
  const user =await userModel.findOne({email})
//return res.json(req.body)
const {mobile,country}=req.body;
//return res.json(req.body.schoolName)
/*if(req.body.userName){
 // return res.json("hi")
  teacher.=userName;
  user.userName=userName;
  let edit=true;

}
  */
if(req.body.mobile){
  teacher.mobile=mobile;
  user.mobile=mobile;
  let edit=true;

}
if(req.body.country){
  teacher.country=country;
  user.country=country;
  let edit=true;

}
if (req.file){
  //return res.json(req.file)
  const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/teacher/profilePicture`})   
  req.body.profilePicture={secure_url,public_id}
  teacher.profilePicture=req.body.profilePicture
  let edit=true;

}
if (req.file){
  const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/user/student/profilePicture`})   
  req.body.profilePicture={secure_url,public_id}
  user.profilePicture=req.body.profilePicture
}
teacher.save();
user.save();
if(!edit){
  return res.status(201).json({message:"no edit",teacher})
}
  return res.status(201).json({message:"success",teacher})
} 

// student active
export const getAllStudent=async(req,res,next)=>{
//  const students =await studentModel.find({status:"active"});
//  return res.status(201).json({message:"success", students})


  const email= req.email
   //  return res.json(email)
    const admin=await teacherModel.findOne({email});
    const teacherId=admin._id;
    const circle=await circleModel.findOne({teacherId})
    // const circles =await circleModel.find({schoolId:school._id});
    const students =await studentModel.find( { 
        circleId: circle._id, // شرط أن يكون معرف المدرسة مطابقًا
        status: "active"     // شرط أن تكون الحالة "suspend"
      });
    return res.status(201).json({message:"success",students})
}
//student suspend , rejected
export const getAllStudentReq=async(req,res,next)=>{
  const email= req.email
   //  return res.json(email)
    const admin=await teacherModel.findOne({email});
    const teacherId=admin._id;
    const circle=await circleModel.findOne({teacherId})
    // const circles =await circleModel.find({schoolId:school._id});
    const students =await studentModel.find( { 
        circleId: circle._id, // شرط أن يكون معرف المدرسة مطابقًا
        status: "suspend"     // شرط أن تكون الحالة "suspend"
      });
  return res.status(201).json({message:"success", students})
}
//all student register>>user without circle
export const getAllStudentUser=async(req,res,next)=>{


  const email= req.email
   //  return res.json(email)
    const admin=await teacherModel.findOne({email});
    const teacherId=admin._id;
    const circle=await circleModel.findOne({teacherId})
    // const circles =await circleModel.find({schoolId:school._id});
    const students =await studentModel.find( { 
        circleId: circle._id, // شرط أن يكون معرف المدرسة مطابقًا
        role: "user"     // شرط أن تكون الحالة "suspend"
      });  return res.status(201).json({message:"success", students})
}


//تقرير الطالب اليومي 

export const createRepotrs=async(req,res,next)=>{
  const studentId=req.params.studentId;
  req.body.studentId=studentId;
  const email=req.email;
  const teacher=await teacherModel.findOne({email})
  req.body.teacherId=teacher._id;
  const student =await studentModel.findById(studentId)
  if(!student){
    return next(new AppError("student not found",401))
  }
  const circle=await circleModel.findById(student.circleId)
 // return res.json(_.isEqual(teacher._id, circle.teacherId))
  if(!(_.isEqual(student.schoolId, teacher.schoolId))|| !(_.isEqual(teacher._id, circle.teacherId))){
    //return res.json(_.isEqual(student.schoolId, teacher.schoolId))
    return next(new AppError("student not found",401))
  }
  
  req.body.schoolId=student.schoolId
  let flag=false;
  //let achievementType;
  req.body.circleId=student.circleId
  const circleName=circle.circleName;
  const type=circle.type;
  /*
  if(type==="تثبيت"){
    achievementType="نثبيت"
  }else{
    achievementType=["حفظ","مراجعة"]
  }*/
  const{achievementType,creationDate,startSurah,endSurah,startVers,endVers,rating,note,replaceOldReport}=req.body;
  if(rating>5 || rating<0){
    return res.status(401).json({message:"rating between 0 and 5"})
  }if(type==="تثبيت"&& achievementType!=="تثبيت"){
    return res.status(401).json({message:"check achievementType ,plz"})
  }
  if(type==="حفظ ومراجعة"&& (achievementType!=="حفظ"&& achievementType!=="مراجعة")){
    return res.status(401).json({message:"check achievementType ,plz"})
  }
  const startVersNum = parseInt(startVers, 10);
  const endVersNum = parseInt(endVers, 10);
  if (isNaN(startVersNum) || isNaN(endVersNum)) {
    return next(new AppError("Invalid verse numbers", 400));
  }
  if(startSurah===endSurah && (startVersNum>endVersNum)){
    return res.status(401).json({message:"end verse must be greater than start verse ."})
  }
  const startSurahData = await quranModel.findOne({ surahName: startSurah });
  const endSurahData = await quranModel.findOne({ surahName: endSurah });
  req.body.achievementType=achievementType;
  req.body.circleName=circleName;
  req.body.type=type;
  req.body.studentName=student.userName
  const replaceOldReporta = req.body.replaceOldReport === "true";

  const preReport=await dailyReportModel.findOne({studentId,creationDate,achievementType})
  if(preReport){
    if (replaceOldReporta) {
      flag=true;
      // إذا كان المدرس يرغب في حذف التقرير القديم وإضافة تقرير جديد
    } else {
      // إذا كان المدرس لا يرغب في الحذف
      return res.status(401).json({ message: "يوجد تقرير سابق بنفس البيانات. لم يتم إجراء أي تغييرات." });
    }
  } 
  if (!startSurahData || !endSurahData) {
    return next(new AppError("Surah data not found", 404));
  }

  let pageCount=0;
  const start=startSurahData.surahNum;
  const end=endSurahData.surahNum;
  //return res.json({message:"success",start,end,startVersNum,endVersNum})
  const startPage = await getPageAyah(`${start}:${startVers}`);
  const endPage   = await getPageAyah(`${end}:${endVers}`);
  const startPageNum=startPage.pageNumber
  const endPageNum=endPage.pageNumber

 //return res.json({message:"success",startPageNum,endPageNum})
  pageCount=endPageNum-startPageNum+1;
  req.body.pageCount=pageCount;
  if(flag){
    preReport.creationDate=creationDate;
    preReport.startSurah=startSurah;
    preReport.endSurah=endSurah;
    preReport.startVers=startVers;
    preReport.endVers=endVers;
    preReport.note=note;
    preReport.rating=rating;
    preReport.save();
    return res.status(201).json({message:"success",preReport})
  }
  else{
  const report =await dailyReportModel.create(req.body)
  return res.status(201).json({message:"success",report})
  }
}
//ادارة شؤون الطلاب
export const manageStudents=async(req,res,next)=>{
  const email=req.email;
  const teacher=await teacherModel.findOne({email});
  const circle=await circleModel.findOne({teacherId:teacher._id})
  const students=await studentModel.find({circleId:circle._id,status:"active"},{ userName: 1, gender: 1, birthDate: 1 })
  const student = students.map(student => ({
    studentId:student._id,
    
    userName: student.userName,
    gender: student.gender,
    age: calculateAge(student.birthDate), // حساب العمر
  }));

  return res.status(201).json({message:"success",student});
}
//حساب العمر
function calculateAge(birthDate) {
  const today = new Date(); // تاريخ اليوم
  const birth = new Date(birthDate); // تحويل النص إلى كائن تاريخ
  let age = today.getFullYear() - birth.getFullYear(); // حساب الفرق في السنوات
  const monthDiff = today.getMonth() - birth.getMonth(); // الفرق في الأشهر
  // التحقق مما إذا كان عيد الميلاد لم يأتِ بعد هذه السنة
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
//تقرير الانجاز اليومي للحقة
export const getReportsByDate=async(req,res,next)=>{
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "يجب تحديد تاريخ البداية والنهاية." });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if(start>end){
      res.status(401).json({ message:"startDate must be less than endDate"});
    }
    const report = await dailyReportModel.find({
      creationDate: {
        $gte: start,
        $lte: end,
      },
    });
    if (report.length === 0) {
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
    const reports = {
      summary: {
        totalHifz,
        totalReview,
        totalTathbit,
      },
      details: report.map((report) => ({
        code:report._id,
        studentName: report.studentName,
        achievementType: report.achievementType,
        creationDate: report.creationDate,
        fromSurah_Ayah: report.startSurah+" / "+report.startVers,
        toSurah_Ayah: report.endSurah+" / "+report.endVers,
        pagesNumber: report.pageCount,
        notes: report.note,
        rating: report.rating,
      })),
    };
    res.status(200).json({ message: "success",reports });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء جلب التقارير", error });
  }
}
//حذف تقرير طالب
export const deleteReport=async(req,res,next)=>{
  const reportId=req.params.reportId;
  const deletedReport=await dailyReportModel.findByIdAndDelete(reportId)
  if (!deletedReport) {
    return res.status(404).json({ message: "report not found" });
  }
  res.status(200).json({ message: "success", deletedReport });
}
export const editReport=async(req,res,next)=>{
  const reportId=req.params.reportId;
  const report=await dailyReportModel.findById(reportId)
  if (!report) {
    return res.status(404).json({ message: "report not found" });
  }
    const{achievementType,creationDate,startSurah,endSurah,startVers,endVers,rating,note}=req.body;
    if(rating>5 || rating<0){
      return res.status(401).json({message:"rating between 0 and 5"})
    }
    const startVersNum = parseInt(startVers, 10);
    const endVersNum = parseInt(endVers, 10);
    if (isNaN(startVersNum) || isNaN(endVersNum)) {
      return next(new AppError("Invalid verse numbers", 400));
    }
    if(startSurah===endSurah && (startVersNum>endVersNum)){
      return res.status(401).json({message:"end verse must be greater than start verse ."})
    }
    const startSurahData = await quranModel.findOne({ surahName: startSurah });
    const endSurahData = await quranModel.findOne({ surahName: endSurah });
    req.body.achievementType=achievementType;
    if (!startSurahData || !endSurahData) {
      return next(new AppError("Surah data not found", 404));
    }
    let pageCount=0;
    const start=startSurahData.surahNum;
    const end=endSurahData.surahNum;
    const startPage = await getPageAyah(`${start}:${startVers}`);
    const endPage   = await getPageAyah(`${end}:${endVers}`);
    const startPageNum=startPage.pageNumber
    const endPageNum=endPage.pageNumber
  
   //return res.json({message:"success",startPageNum,endPageNum})
    pageCount=endPageNum-startPageNum+1;
    req.body.pageCount=pageCount;
    
      report.creationDate=creationDate;
      report.startSurah=startSurah;
      report.endSurah=endSurah;
      report.startVers=startVers;
      report.endVers=endVers;
      report.note=note;
      report.rating=rating;
      report.save();
      return res.status(201).json({message:"success",report})
   
  
  
}