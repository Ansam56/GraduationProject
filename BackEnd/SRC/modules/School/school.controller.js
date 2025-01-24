import { AppError } from "../../../appError.js";
import schoolAdminModel from "../../../DB/models/SchoolAdmin/schoolAdmin.js";
import schoolModel from "../../../DB/models/schools/school.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppSucc } from "../../../AppSucc.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import circleModel from "../../../DB/models/schools/circls.js";
import dailyReportModel from "../../../DB/models/reports/dailyStudent.js";
import mime from 'mime';
import path from 'path';
import fs from 'fs';

//create school
export const creteSchool = async(req,res,next)=>{
    const adminId=req.params.id;
   // return res.json(req.params.id)
    req.body.schoolAdminId=adminId;
   const schoolName=req.body.schoolName;
   //return res.json(schoolName)

    req.body.schoolName=req.body.schoolName.toLowerCase();
    const name =req.body.schoolName;
    if(await schoolModel.findOne({name}) || await schoolModel.findOne({schoolName})){
        return next(new AppError("school exit",404))
      }
      const admin =await schoolAdminModel.findById(req.params.id)
     // return res.json(admin._id)
    if(!admin || admin.role !='schoolAdmin'){
        return next(new AppError("user not found",404))
    }
    const schoolAdminId =req.params.id;
   // return res.json(schoolAdminId)
    const user =await schoolModel.findOne({schoolAdminId})
   // return res.json(user)
    if(user){
      return next(new AppError("you can't create more than one school",409))
    }
      if (req.files){
      /*  if(req.files.schoolInfo==="null" ){
        return res.json("hi")
        } */
        if(req.files.schoolInfo){
          const schoolInfo = req.files['schoolInfo'] ? req.files['schoolInfo'][0] : null;
         // return res.json(schoolPhoto)
         
          const filePath = schoolInfo.path;
        //  return res.json(schoolInfo)
          const fileExtension = mime.getExtension(schoolInfo.mimetype) || 'unknown';
          let finalPath = filePath;
          if (!path.extname(filePath)) {
            finalPath = `${filePath}.${fileExtension}`;
            fs.renameSync(filePath, finalPath);
          }    
          // return res.json(req.file.path)
          const { secure_url, public_id } = await cloudinary.uploader.upload(finalPath, {
            folder: `${process.env.APPNAME}/school/schoolInfo`,
            resource_type: "auto",
          });
        
          // إعداد النتيجة النهائية مع الامتداد
          const secureUrlWithExtension = secure_url.endsWith(`.${fileExtension}`) ? secure_url : `${secure_url}.${fileExtension}`;
          req.body.schoolInfo = { secure_url: secureUrlWithExtension, public_id };
        
          // حذف الملف المحلي بعد الرفع (اختياري)
             //return res.json(public_id)
          //  return res.json({ teacherInfo: req.body.teacherInfo });
    
             
        }
           
           if(req.files.schoolPhoto){
            const schoolPhoto = req.files['schoolPhoto'] ? req.files['schoolPhoto'][0] : null;
           // return res.json(schoolPhoto)
           
           const {secure_url,public_id}= await cloudinary.uploader.upload(schoolPhoto.path,{folder:`${process.env.APPNAME}/school/schoolPhoto`})
          // return res.json(public_id)
          
          req.body.schoolPhoto={secure_url,public_id}
             }

    }         
  
    const school = await schoolModel.create(req.body)
      return next(new AppSucc("success",200))
  
  

}
export const getProfile=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =decoded.user.role;
  if(role!=="schoolAdmin"){
   return next(new AppError("you don'y have authentication to view school",404))
  }
  const email =decoded.user.email;
  //return res.json(email)
  const schoolAdmin =await schoolAdminModel.findOne({email})
  //return res.json(user)
  if(!schoolAdmin){
      return next(new AppError("user not found",404))
  }
  const school=await schoolModel.findOne({schoolAdminId:schoolAdmin._id})
 // return res.json(school)
  if(!school){
    return next(new AppError("school not found",404))
}
  return res.status(201).json({message:"success",school})
}   
export const updateSchool=async(req,res,next)=>{
  const {authorization}=req.headers;
  const token=authorization.split(process.env.BearerToken)[1]
  const decoded = jwt.verify(token,process.env.Signiture)
  // return res.json(decoded.user._id) 
  const role =decoded.user.role;
  if(role!=="schoolAdmin"){
   return next(new AppError("you don't have authentication to view school",404))
  }
  const email =decoded.user.email;
  //return res.json(email)
  const schoolAdmin =await schoolAdminModel.findOne({email})
  //return res.json(user)
  if(!schoolAdmin){
      return next(new AppError("user not found",404))
  }
  const school=await schoolModel.findOne({schoolAdminId:schoolAdmin._id})
 // return res.json(school)
  if(!school){
    return next(new AppError("school not found",404))
}
//return res.json(req.body)
const {schoolName,address,availableforTeacher,availableforStudent,status}=req.body;
//return res.json(req.body.schoolName)
if(req.body.schoolName){
 // return res.json("hi")
 req.body.schoolName=req.body.schoolName.toLowerCase();
    const name =req.body.schoolName;
    if(await schoolModel.findOne({name})){
        return next(new AppError("school exit",404))
      }
  school.schoolName=schoolName;
}
if(req.body.address){
  school.address=address;
}if(req.body.availableforTeacher){
  school.availableforTeacher=availableforTeacher;
}if(req.body.availableforStudent){
 // return res.json(days)
  school.availableforStudent=availableforStudent;
}
if(req.body.status){
  school.status=status
}
if (req.file){
  const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/school/schoolPhoto`})   
  req.body.schoolPhoto={secure_url,public_id}
  school.schoolPhoto=req.body.schoolPhoto
}
school.save();


  return res.status(201).json({message:"success",school})
} 

export const allCircles=async(req,res,next)=>{
  //const {schoolAdminId}=req.id
  const {schoolId}=req.params.id
  const school=await schoolModel.findById(schoolId)
  if(!school){
    return next(new AppError("school not found",404))
  }
  const circles=await circleModel.findById({schoolId,status:"active"})
  if(!circles){
    return next(new AppSucc("Your school does not have circles yet"))
  }
return res.status(201).json({message:"success",circles})
}

/*export const getReports=async(req,res,next)=>{
  try{
  const email=req.email;
  const schoolAdmin=await schoolAdminModel.findOne({email});
  if(!schoolAdmin){
    return next(new AppError("user not found",401))
  }
  const school=await schoolModel.findOne({schoolAdminId:schoolAdmin._id})
  if(!school){
    return next(new AppError("school not found",401))
  }
  const schoolId=school._id;

  
    const {  startDate, endDate } = req.body; // استلام المعرف والمدى الزمني من الطلب
    //return res.json(req.body)
   let totalHifz=0
   let totalReview=0
   let totalTathbit=0
    const circles = await circleModel
    .find({ schoolId: school._id })
    .populate('teacherId','userName') // ربط teacherId للحصول على اسم المعلم
    .select('circleName circleGender type')

    const reportsForAllCircles = [];
   
    for (const circle of circles) {
      const reportsForCircle = await dailyReportModel.find({
        circleId: circle._id,
        creationDate: { $gte: startDate, $lte: endDate },
      }).select('creationDate achievementType pageCount');
      let totalHifzPages=0;
      let totalReviewPages=0;
      let totalTathbeatPages=0;

     
   

    reportsForCircle.forEach((report) => {
      if(report.achievementType==="حفظ"){
        totalHifzPages=totalHifzPages+report.pageCount;
        console.log(totalHifz)
       
      }
      if(report.achievementType==="مراجعة"){
        totalReviewPages=totalReviewPages+report.pageCount;
       
       
      }
      if(report.achievementType==="تثبيت"){
        totalTathbeatPages=totalTathbeatPages+report.pageCount;
       

       
      }
    });
      // أضف التقارير الخاصة بالدائرة الحالية إلى القائمة العامة
      reportsForAllCircles.push({
        circleId: circle._id,
        reports: reportsForCircle,
        circleGender:circle.circleGender,
        teacherName:circle.teacherId.userName,
        circleName:circle.circleName,
        circleType:circle.type,
        totalHifzPages,
        totalReviewPages,
        totalTathbeatPages
      });
      totalHifz+=totalHifzPages;
      totalReview+=totalReviewPages;
      totalTathbit+=totalTathbeatPages
    }
    const summary={
      totalHifz,
      totalReview,
      totalTathbit
    }
    return res.json({message:"success",reportsForAllCircles,summary})
    
    // إضافة الكود للطباعة هنا

    // أكمل المعالجة أو أرجع البيانات إلى المستخدم
  } catch (err) {
    console.error('Error fetching reports:', err);
    return res.status(500).json({ error: 'حدث خطأ أثناء جلب التقارير.' });
  } 
}*/

export const getReports = async (req, res, next) => {
  try {
    const email = req.email;
    const schoolAdmin = await schoolAdminModel.findOne({ email });
    if (!schoolAdmin) {
      return next(new AppError("user not found", 401));
    }
    const school = await schoolModel.findOne({ schoolAdminId: schoolAdmin._id });
    if (!school) {
      return next(new AppError("school not found", 401));
    }
    const schoolId = school._id;

    const { startDate, endDate } = req.body; // استلام المعرف والمدى الزمني من الطلب

    let totalHifz = 0;
    let totalReview = 0;
    let totalTathbit = 0;

    const circles = await circleModel
      .find({ schoolId: school._id })
      .populate('teacherId', 'userName') // ربط teacherId للحصول على اسم المعلم
      .select('circleName circleGender type');

    const reportsForAllCircles = [];

    for (const circle of circles) {
      const reportsForCircle = await dailyReportModel.find({
        circleId: circle._id,
        creationDate: { $gte: startDate, $lte: endDate },
      }).select('teacherId creationDate achievementType pageCount');

      // إضافة المعلم مباشرة في التقارير
      const teacher = circle.teacherId; // بما أن هناك معلم واحد فقط لكل حلقة

      // تجميع التقارير حسب التاريخ ونوع الإنجاز
      const groupedReports = {};

      reportsForCircle.forEach((report) => {
        const date = report.creationDate.toISOString().split('T')[0]; // تنسيق التاريخ

        if (!groupedReports[date]) {
          groupedReports[date] = {
            totalHifzPages: 0,
            totalReviewPages: 0,
            totalTathbeatPages: 0,
          };
        }

        if (report.achievementType === "حفظ") {
          groupedReports[date].totalHifzPages += report.pageCount;
        } else if (report.achievementType === "مراجعة") {
          groupedReports[date].totalReviewPages += report.pageCount;
        } else if (report.achievementType === "تثبيت") {
          groupedReports[date].totalTathbeatPages += report.pageCount;
        }
      });

      // إنشاء تقرير لكل تاريخ
      Object.entries(groupedReports).forEach(([date, totals]) => {
        reportsForAllCircles.push({
          circleId: circle._id,
          circleGender: circle.circleGender,
          circleName: circle.circleName,
          circleType: circle.type,
          teacherName: teacher.userName, // إظهار اسم المعلم
          date, // إضافة التاريخ
          totalHifzPages: totals.totalHifzPages,
          totalReviewPages: totals.totalReviewPages,
          totalTathbeatPages: totals.totalTathbeatPages,
        });

        // تحديث الإجماليات العامة
        totalHifz += totals.totalHifzPages;
        totalReview += totals.totalReviewPages;
        totalTathbit += totals.totalTathbeatPages;
      });
    }

    const summary = {
      totalHifz,
      totalReview,
      totalTathbit,
    };

    return res.json({ message: "success", reportsForAllCircles, summary });

  } catch (err) {
   // console.error('Error fetching reports:', err);
    return res.status(500).json({ error: 'حدث خطأ أثناء جلب التقارير.' });
  }
};




