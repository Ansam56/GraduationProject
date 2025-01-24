import userModel from '../../../DB/models/Admin/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../utils/sendEmail.js";
import { LoginSchema, registerSchema } from "./auth.validation.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import cloudinary from "../../utils/cloudinary.js";
import schoolAdminModel from "../../../DB/models/SchoolAdmin/schoolAdmin.js";
import adminModel from "../../../DB/models/Admin/admin.js";
import schoolModel from '../../../DB/models/schools/school.js'
import {nanoid ,customAlphabet} from 'nanoid'
import { sendCodeEmail } from '../../utils/sendEmail.js';
import teacherModel from '../../../DB/models/teacher.js';
import { sendActiveEmail ,sendRejectedEmail} from '../../utils/sendEmail.js';
import circleModel from '../../../DB/models/schools/circls.js'
import studentModel from '../../../DB/models/student.js';
import { fetchAyah, fetchData } from '../../../app.js';
import quranModel from '../../../DB/models/quran/quran.js';
export const register=async(req,res,next)=>{
    
        const{userName,email,password}=req.body;
        // validation
       // const result =await registerSchema.body.validate({email,password,userName,gender,cpassword},{abortEarly:false})
        //return res.json(result)
       // or
       //  const result =await registerSchema.validate({req.body},{abortEarly:false})

        // if(result.error?.details){
        //     return res.status(404).json({message:"error validation",error:result.error.details})
        //    }
        const user =await userModel.findOne({email}); //to confirm its new person
        if (user){
            return next(new AppError("you have account",409))
        }
        const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));

      /*  const html = `
        <div>
         <p style='color:tomato'>Dear : <b>${userName}</b></p>
         <h1 style='text-align:center;color:blue;width:40%'> Welcome in SARAHA SITE !</h1>
         <h2 style='text-align:center;color:blue;width:40%'>Hello <b>${userName}</b> , You are register in our site ,How can help you?</h2>
        </div>
        `
        sendEmail(email,"WELCOME",html);*/
        const newUser =await userModel.create({userName,password:hashPass,email});
        const Admin =await adminModel.create({userName,password:hashPass,email});
        return next(new AppSucc("success",201))
       // return res.status(201).json({message:"success"})

    
}


export const login = async(req,res,next)=>{
    const{email,password}=req.body;
    
    let user;
   
     user =await userModel.findOne({email});
    // const confirmEmail=user.confirmEmail;
    // return res.json(confirmEmail)
    if(!user){
        return next(new AppError("email not found",409))
    }
    if(!user.confirmEmail){
        return next(new AppError("PLZ confirm your email",409))
     }
        
     if((user.role!== "user" && user.role!=="student")&& (user.status=="suspend" ||user.status=="rejected") ){
        if(user.role==="schoolAdmin"){
        return next(new AppError(" SchoolAdmin account is blocked",409))
        }
        if(user.role==="teacher"){
            return next(new AppError(" Teacher account is blocked",409))
            }
     }
    const match=bcrypt.compareSync(password,user.password);
    if(!match){
        return next(new AppError("invalid password",409))
    }
    //return res.json(req.body)
    const token=await jwt.sign({user:user},process.env.Signiture,)
      //  return res.json(token._id)
//const decoded = jwt.verify(token,process.env.Signiture)
//return res.json(decoded)
   
    return res.status(201).json({message:"success",token})
    }
export const sendCode =async(req,res,next)=>{
    const {email}=req.body;
    const code= customAlphabet('1234567890abcdefABCDEF', 5)()
    const user =await userModel.findOneAndUpdate({email},{
        sendCode:code
    },{
        new:true
    })
    if(user.role==="schoolAdmin"){
          await schoolAdminModel.findOneAndUpdate({email},{sendCode:code},{new:true})
      }
    if(!user){
        return next(new AppError("email not found"))
    }
       const token =jwt.sign({email},process.env.confirmEmailToken)
        await sendCodeEmail(email," reset password ",user.userName,code)
        return next(new AppSucc("success",201))
       
    }


export const forgetPass =async(req,res,next)=>{
    const{email,password,code,cpassword}=req.body;
    const user =await userModel.findOne({email});
    if(!user){
        return next(new AppError("email not found",409))
    }
    if(user.sendCode!=code){
        return next(new AppError("invalid code",409))
    }
    if(password != cpassword){
        return next(new AppError("Passwords not match",409))
    }
    user.password=bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    user.sendCode=null;
    user.save();
    return next(new AppSucc("success",201))

}

 export const confirmEmail =async(req,res,next)=>{
   // return res.json(req.params)
        const {token} =req.params;
        const decoded =jwt.verify(token,process.env.confirmEmailToken)
        
        const user =await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true}) 
        const schoolAdmin=await schoolAdminModel.findOne({email:decoded.email})
       // return res.json(user.role)
        if(user.role ==="schoolAdmin"){
           // return res.json(schoolAdmin.role)
          //  return res.json(schoolAdmin.confirmEmail)
            await schoolAdminModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
          //  return res.json(schoolAdmin.confirmEmail)
        }
        if(user.role==="student" ||user.role==="user"){
            await studentModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
        }if(user.role==="teacher"){
           // return res.json("hi")
            await teacherModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})

        }
        return next(new AppSucc("success",200))
    }
 // ger All (schoolAdmin ,teacher,student)
export const getAllUsers=async(req,res)=>{
   
    const users =await userModel.find();

    return res.status(201).json({message:"success",users})
   
}
//get all schoolsAdmins [active]
export const getAllSchoolsAdmins=async(req,res)=>{
   
    const schoolAdmin =await schoolAdminModel.find({status:"active"});
   // return res.json(schoolAdmin[1]._id)

    return res.status(201).json({message:"success",schoolAdmin})
   
}
//get all schoolsAdmins [suspend,rejected]
export const getAllSchoolAdminReq=async(req,res)=>{
   
    const schoolsAdmins =await schoolAdminModel.find({status:["suspend","rejected"]});

    return res.status(201).json({message:"success",schoolsAdmins})
   
}
export const getAllSchools=async(req,res,next)=>{
    
    const schools =await schoolModel.find({status:"active"});
   // return res.json(schoolAdmin[1]._id)

    return res.status(201).json({message:"success",schools})
}
export const getAllSchoolsReq=async(req,res)=>{
   
    const schools =await schoolModel.find({status:["suspend"]});

    return res.status(201).json({message:"success",schools})
   
}
//teacher active 
export const getAllTeacher=async(req,res,next)=>{
    const teachers =await teacherModel.find({status:"active"});
    return res.status(201).json({message:"success",teachers})
}
//teacher suspend , rejected
export const getAllTeacherReq=async(req,res,next)=>{
    const teachers =await teacherModel.find({status:["suspend","rejected"]});
    return res.status(201).json({message:"success",teachers})
}
//student active
export const getAllCircles=async(req,res,next)=>{
    const circles =await circleModel.find({status:"active"});
    return res.status(201).json({message:"success",circles})
}
//teacher suspend , rejected
export const getAllCirclesReq=async(req,res,next)=>{
    const circle =await circleModel.find({status:["suspend","rejected"]});
    return res.status(201).json({message:"success",circle})
}
//make schollAdmin active user
export const updateStatus=async(req,res,next)=>{
    let email;
 //  return res.json(req.params.id)
    const teacher=await teacherModel.findById(req.params.id)
   // return res.json(teacher)
    const schoolAdmin=await schoolAdminModel.findById(req.params.id)
    const student=await studentModel.findById(req.params.id)
    //return res.json(student)
   //if it teacher
    if(teacher){
      if(!teacher.confirmEmail){
        return next(new AppError("PLZ confirm your email",409))
    }
        const teacherId=teacher._id;
        email=teacher.email;
        //  return res.json(teacherId)
        const circle= await circleModel.findOne({teacherId})
        //return res.json(teacherUser)  
    if(!circle){
        return next(new AppError("you don't have a circle",404))
    }
    const activeUser ="active";
    const newTeacher= await teacherModel.findByIdAndUpdate(teacherId,{
        status:activeUser,
        role:"teacher"
    },{
        new:true
    })
    circle.status="active";
    circle.save();
    const school=await schoolModel.findById(teacher.schoolId)
    school.totalCircles=school.totalCircles+1;
    school.totalTeachers=school.totalTeachers+1;
    school.save();
    }
    if(schoolAdmin){
        if(!schoolAdmin.confirmEmail){
           return next(new AppError("PLZ confirm your email",409))
            }
        const schoolAdminId=schoolAdmin._id;
        email=schoolAdmin.email;
         // return res.json(schoolAdminId)
        const schoolAdminUser= await schoolModel.findOne({schoolAdminId})
   // return res.json(schollAdminUser)
    if(!schoolAdminUser){
        return next(new AppError("you don't have a school",404))
    }
    const activeUser ="active";
    const newSchoolAdmin= await schoolAdminModel.findByIdAndUpdate(schoolAdminId,{
        status:activeUser,
        role:"schoolAdmin"
    },{
        new:true
    })
    const newSchool= await schoolModel.findOneAndUpdate(schoolAdminId,{
        status:activeUser
    },{
        new:true
    })
   schoolAdminUser.status=activeUser;
   schoolAdminUser.save();
   
    

}
    if(student){
        if(!student.confirmEmail){
            return next(new AppError("PLZ confirm your email",409))
        }
        if(!student.schoolId){
            return next(new AppError("PLZ join to school",409))
        }
        if(!student.circleId){
            return next(new AppError("PLZ join to circle",409))
        }
       const activeUser ="active";
       email=student.email;
       const newStudent= await studentModel.findByIdAndUpdate(req.params.id,{
        status:activeUser,
        role:"student"
    },{
        new:true
    })
    const school=await schoolModel.findById(student.schoolId)
    const circle=await circleModel.findById(student.circleId)
    circle.totalStudents=circle.totalStudents+1;
    circle.save();
   school.totalStudents=school.totalStudents+1;
   school.save();
}
    /*const newSchool= await schoolModel.findOneAndUpdate({schoolAdminId},{
        status:activeSchool
    },{
        new:true
    })
*/
   // }
  
   /* const newUser =await userModel.create({userName:newSchoolAdmin.userName,email:newSchoolAdmin.email,confirmEmail:newSchoolAdmin.confirmEmail,
        password:newSchoolAdmin.password,cpassword:newSchoolAdmin.cpassword,age:newSchoolAdmin.age,gender:newSchoolAdmin.gender,
        profilePicture:newSchoolAdmin.profilePicture,role:newSchoolAdmin.role,status:newSchoolAdmin.status,sendCode:newSchoolAdmin.sendCode
    });
    */
   // return res.json(user.email)
   //const newuser =await userModel.create(newSchoolAdmin)
  // return res.json(newuser)
  if(!teacher && !schoolAdmin &&!student){
    return next(new AppError("user not found",404))
  }
  const user = await userModel.findOne({email});
    const newUser= await userModel.findOneAndUpdate({email:user.email},{
        status:"active",
       role:user.role
    },{
        new:true
    })
   const userName=newUser.userName;
    // return res.json(userName)
   const token =jwt.sign({email},process.env.confirmEmailToken)
   await sendActiveEmail(email,"WELCOME in TUBA",userName,user.role);
    return next(new AppSucc("success",201))
}
//reject school request
export const rejectedReq=async(req,res,next)=>{
    let email;
      const teacher=await teacherModel.findById(req.params.id)
      const schoolAdmin=await schoolAdminModel.findById(req.params.id)
      const student =await studentModel.findById(req.params.id)
  //if it teacher
      if(teacher){
       if(!teacher.confirmEmail){
          return next(new AppError("PLZ confirm your email",409))
      }
          const teacherId=teacher._id;
          email=teacher.email;
          //  return res.json(teacherId)
        /*  const teacherUser= await circleModel.findOne({teacherId})
          //return res.json(teacherUser)
      
      if(!teacherUser){
          return next(new AppError("you don't have a circle",404))
      }
  */
      const activeUser ="rejected";
      const newTeacher= await teacherModel.findByIdAndUpdate(teacherId,{
          status:activeUser,
         // role:"teacher"
      },{
          new:true
      })
      const newCircle= await circleModel.findOneAndUpdate({teacherId},{
          status:activeUser
      },{
          new:true
      })
  
      }
      if(schoolAdmin){
         if(!schoolAdmin.confirmEmail){
             return next(new AppError("PLZ confirm your email",409))
              }
          const schoolAdminId=schoolAdmin._id;
          email=schoolAdmin.email;
        //    return res.json(schoolAdminId)
          const schoolAdminUser= await schoolModel.findOne({schoolAdminId})
     // return res.json(schollAdminUser)
    /*  if(!schoolAdminUser){
          return next(new AppError("you don't have a school",404))
      }*/
  
      const rejectedUser ="rejected";
      schoolAdminUser.status=rejectedUser;
      schoolAdminUser.save();
      //return res.json(schoolAdminId)
      const newSchoolAdmin= await schoolAdminModel.findByIdAndUpdate(schoolAdminId,{
          status:rejectedUser,
        //  role:"schoolAdmin"
      },{
          new:true
      })
     const newSchool= await schoolModel.findOneAndUpdate(schoolAdminId,{
        status:rejectedUser,
    },{
        new:true
    })
  //  return res.json(newSchool)
  
  }
      if(student){
    const student=await studentModel.findOne({email})
    if(!student.confirmEmail){
        return next(new AppError("PLZ confirm your email",409))
    }
    if(!student.schoolId){
        return next(new AppError("PLZ join to school",409))
    }
    if(!student.circleId){
        return next(new AppError("PLZ join to circle",409))
    }
   const activeUser ="rejected";
   const newStudent= await studentModel.findByIdAndUpdate(req.params.id,{
    status:activeUser,
    role:"student"
},{
    new:true
})
}
  if(!teacher && !schoolAdmin && !student){
    return next(new AppError("user not found",404))
  }
    
    const user = await userModel.findOne({email});
    //return res.json(user)
      const newUser= await userModel.findOneAndUpdate({email},{
          status:"rejected",
         role:user.role
      },{
          new:true
      })
     const userName=newUser.userName;
      // return res.json(userName)
      if(newUser.confirmEmail){
     const token =jwt.sign({email},process.env.confirmEmailToken)
     await sendRejectedEmail(email,"WELCOME in TUBA",userName,user.role);
      }
      return next(new AppSucc("success",201))
  
  



}
export const UploadImage=async(req,res,next)=>{
   // return res.json(req.file)

   // const imgUrl =req.file.destination +"/"+req.file.filename;
   const{secure_url}=await cloudinary.uploader.upload(req.file.path);
   // const user=await userModel.findByIdAndUpdate(req.id,{profilePicture:imgUrl})
   const user=await userModel.findByIdAndUpdate(req.id,{profilePicture:secure_url})
    return next(new AppSucc("success",200))
}
//user progile
export const getProfile=async(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization.split(process.env.BearerToken)[1]
    const decoded = jwt.verify(token,process.env.Signiture)
    // return res.json(decoded.user._id)   
    const email =decoded.user.email;
    //return res.json(email)
    const user =await userModel.findOne({email})
    //return res.json(user)
    if(!user){
        return next(new AppError("user not found",404))
    }
    return res.status(201).json({message:"success",user})
}   



// log in user

/*export const loginUser = async(req,res,next)=>{
    const{email,password}=req.body;
   // return res.json(req.body)

   
   
    const user =await userModel.findOne({email});
    if(!user){
        return next(new AppError("email not found",409))
    }
    const match=bcrypt.compareSync(password,user.password);
    if(!match){
        return next(new AppError("invalid password",409))
    }
    const token=await jwt.sign({id:user._id,role:user.role},process.env.Signiture,
        )

    return res.status(201).json({message:"success",token})
    }

*/


  

 // student active
  export const getAllStudent=async(req,res,next)=>{
    const students =await studentModel.find({status:"active"});
    return res.status(201).json({message:"success", students})
}
//student suspend , rejected
export const getAllStudentReq=async(req,res,next)=>{
    const  students =await studentModel.find({ role: "student", status: { $in: ["suspend", "rejected"] } } );
    return res.status(201).json({message:"success", students})
}
//all student register>>user without circle
export const getAllStudentUser=async(req,res,next)=>{
    const  students =await studentModel.find({ role: "user" } );
    return res.status(201).json({message:"success", students})
}
//allScoolHmePage
export const getAllSchoolHomePage=async(req,res,next)=>{
 //   const schoolId=req.params.id;
 const schools = await schoolModel.find(
    {
      status: "active", // شرط أن تكون حالة المدرسة "active"
      $or: [ // أحد الحقلين يجب أن يكون مفعّلاً
        { availableforTeacher: true },
        { availableforStudent: true },
      ],
    },
    "schoolName address schoolPhoto totalTeachers totalCircles totalStudents availableforTeacher availableforStudent" // الحقول المطلوبة فقط
  );
   if(!schools){
        return next(new AppError("schools not found",404))
    }
    //const totalCircles = await circleModel.countDocuments({schoolId});
   /* const totalCircles = school.totalCircles
    const totalTeachers = school.totalTeachers
    const totalStudents = school.totalStudents
    const schoolName=school.schoolName;
    const schoolPhoto = school.schoolPhoto;
    const availableForTeacher=school.availableforTeacher;
    const availableForStudent=school.availableforStudent;
    const address=school.address*/

    return res.json({message:"success",schools})

}

export const getStatistics=async(req,res,next)=>{
    let statistics=[]
    const availableSchoolsCount = await schoolModel.countDocuments({ status: "active" });
    const schoolAdminCount=await schoolAdminModel.countDocuments({ status: "active"})
    const circleCount=await circleModel.countDocuments({ status: "active"})
    const teacherCount=await teacherModel.countDocuments({ status: "active"})
    const studentCount=await studentModel.countDocuments({ status: "active"})
    statistics.push({"schoolAdmins no ":schoolAdminCount})
    statistics.push({"schools no ":availableSchoolsCount})
    statistics.push({"teachers no ":teacherCount})
    statistics.push({"circles no ":circleCount})
    statistics.push({"students no ":studentCount})

    return next(new AppSucc({statistics},201))





}

export const allCircles=async(req,res,next)=>{
    //const {schoolAdminId}=req.id
    const schoolId =req.params.id
    const school=await schoolModel.findById(req.params.id)
  //  return res.json(req.params)
    if(!school){
      return next(new AppError("school not found",404))
    }
    const circles=await circleModel.find({schoolId: req.params.id, status: "active",avilableForStudent:true}).populate({
        path: "teacherId", // اسم الحقل المرتبط بالمعلم
        select: "userName email", // الحقول التي تريدها من بيانات المعلم
      });

//return res.json(circles)
    if (school.totalCircles===0 || !circles || circles.length === 0) {
        return next(new AppSucc("Your school does not have circles yet",201));
      }
      
      // استخدم Promise.all لجلب بيانات المعلمين لكل حلقة
    /*  const circlesWithTeachers = await Promise.all(
        circles.map(async (circle) => {
          const teacher = await teacherModel.findById(circle.teacherId); // افتراض أن الحقل teacherId موجود في circle
          return {
            circleName: circle.circleName,
            teacherName: teacher ? teacher.userName : "Teacher not found",
          };
        })
    )*/
    //const teacher=await teacherModel.findOne({teacherId:circles.teacherId})
  return res.status(201).json({message:"success",circles})
  }


  export const deletePhoto=async(req,res,next)=>{
    const email=req.email;
    const user =await userModel.findOne({email})
    let userUpdate=null;
    if(!user){
    return next(new AppError("user not found",404))
  }
  const profilePicture={secure_url:"https://res.cloudinary.com/dff9dgomp/image/upload/v1737492452/default_zcjitd.jpg",
    public_id:"TUBA/default_zcjitd.jpg"
}
  if(user.role==="schoolAdmin"){
    const schoolAdmin=await schoolAdminModel.findOne({email})
    await cloudinary.uploader.destroy(schoolAdmin.profilePicture.public_id)
    schoolAdmin.profilePicture=profilePicture;
    schoolAdmin.save()
    userUpdate=schoolAdmin
  }
  if(user.role==="teacher"){
    const teacher=await teacherModel.findOne({email})
    await cloudinary.uploader.destroy(teacher.profilePicture.public_id)
    teacher.profilePicture=profilePicture;
    teacher.save()
    userUpdate=teacher
  }
  if(user.role==="student"){
    const student=await studentModel.findOne({email})
    await cloudinary.uploader.destroy(student.profilePicture.public_id)
    student.profilePicture=profilePicture;
    student.save()
    userUpdate=student
  }

  await cloudinary.uploader.destroy(user.profilePicture.public_id)
  user.profilePicture=profilePicture;
  user.save();
  return res.status(201).json({message:"success",userUpdate})
  return next(new AppSucc("success",201))
  }





  export const getSuraData = async (req, res, next) => {
    // const data = []; // مصفوفة لتخزين البيانات
     try {
        const surahNum = parseInt(req.params.chapterNum, 10); 
         if(surahNum>114|| surahNum<1){
             return next(new AppError("surah just between number 1 to 114",500))
         }
       //  return res.json(surahNum)
      // const chapterNumber = 3; // استبدل الرقم المطلوب
    //   const chapter = await fetchData(surahNum); // استدعاء الفنكشن وحفظ البيانات
     //  const chapter = await fetchData(); // استدعاء الفنكشن وحفظ البيانات
       const surah=await quranModel.findOne({surahNum})
      // data.push(chapterName); // إضافة البيانات إلى المصفوفة
     // const page=chapter[2]
     // const verses =chapter[1]
     // const name=chapter[0]
       return res.json(surah); // إرسال المصفوفة كاستجابة
     } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'حدث خطأ في جلب البيانات' });
     }
   };

  export const getSurah =async(req,res,next)=>{
    const chapters = await fetchData(); // استدعاء الفنكشن وحفظ البيانات
    const generateAyatArray = (versesCount) => {
        return Array.from({ length: versesCount }, (_, index) => index + 1);
      };
  // return res.json(chapters)
  if(chapters){
        // تحويل البيانات إلى صيغة مناسبة للنموذج
        const processedData = chapters.map(chapter => ({
          surahName: chapter.name_arabic, // اسم السورة
          surahNum: chapter.id, // رقم السورة
         // surahChapter: chapter.chapter_number || chapter.id, // رقم الفصل (إذا موجود)
          verses_count: chapter.verses_count, // عدد الآيات
          pages: chapter.pages, // الصفحات
          verses: generateAyatArray(chapter.verses_count)
        }));
  
        // حفظ البيانات في قاعدة البيانات باستخدام quranModel
        await quranModel.insertMany(processedData);
      
  return res.json(processedData)
      } else {
       return res.json('No chapters data found in response');
      }
    
  }

  export const getPageAyah = async (verse_key) => {
    try {
      if (!verse_key) {
        throw new AppError('verse_key is required', 400);
      }
  
      const pageData = await fetchAyah(verse_key);
  
      if (!pageData || !pageData.verse) {
        throw new AppError('Invalid verse data or page not found', 404);
      }
  
      return { pageNumber: pageData.verse.page_number };
    } catch (error) {
      throw new AppError('Failed to fetch verse page', 500);
    }
  };
  