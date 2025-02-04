import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 

import Loader from "../pages/loader/Loader"; 
import { UserContext } from "./UserContext";
import { ErrorToast } from "../pages/toast/toast";

export let TeacherContext =createContext(); 
 /*
 {message: 'success', teacher: {…}, circle: {…}}
 circle
: 
circleName: "انا نبشرك"
createdAt:"2024-12-30T21:50:14.005Z"
days:['الأحد,الثلاثاء,الخميس']
endTime:"03:45"
id:"67731596857121ce7fdf86ac"
logo:{secure_url: 'https://res.cloudinary.com/dff9dgomp/image/upload/…3/TUBA/circle/circleLogo/sz4coiagad5bxo4efkcp.png', public_id: 'TUBA/circle/circleLogo/sz4coiagad5bxo4efkcp'}
or not defined ازا ما دخلت اشي من البداية ما برجع 
startTime:"01:45"
status:"suspend"
teacherId:"67731591857121ce7fdf86a7"
updatedAt:"2024-12-30T21:50:14.005Z"
__v:0
_id:"67731596857121ce7fdf86ac"
____________________________________________
teacher: 
confirmEmail:true
country:"القدس"
createdAt:"2024-12-30T21:50:09.275Z"
email:"raghadmoqady@gmail.com"
gender:"Female"
idNumber:111111111
mobile:"+970597362232"
password:"$2a$08$Ntv/JgQvfMG/FQwsKa9MOOpcTwkTp6Lo2LbjK2yovEIdlUiE3WspG"
role:"teacher"
status:"active"
teacherInfo:{secure_url: 'https://res.cloudinary.com/dff9dgomp/image/upload/…5595408/TUBA/teacherInfo/klz94aysq0hjx5lo0fok.pdf', public_id: 'TUBA/teacherInfo/klz94aysq0hjx5lo0fok'}
updatedAt:"2024-12-30T21:59:29.518Z"
userName:"رغد عماد موقدي"
__v:0
_id:"67731591857121ce7fdf86a7"
 */
export default function TeacherContextProvider({children}) {
    const {userToken,Logout}= useContext(UserContext); 
    const [teacherInfo,setTeacherInfo]=useState(null);
    const [circleInfo,setCircleInfo]=useState(null);
    const [schoolName,setSchoolName]=useState(null);
    const [loading,setLoading]=useState(true);

    const [reportRows,setReportRows]=useState(null);
    const [reportStatistics,setReportStatistics]=useState(null);

    const [students,setStudents]=useState(null);
    const [allSurah,setAllSurah]=useState(null);

    // console.log("hi from teacher context");
    //يتم استدعاءه مباشرة عند الدخول على بوابة المعلم 
    const getTeacherData=async()=>{ 
       if(userToken){
        try{
          const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/teacher/profile`,
            { headers: {Authorization:`Tuba__${userToken}`} } )  ;
            // console.log(data);
            setTeacherInfo(data?.teacher);
            setCircleInfo(data?.circle);
            setSchoolName(data?.schoolName); 
        }catch(error){
           if (error.response) {
              if(error.response.data.message==="user not found"){
              ErrorToast("عذرًا، المستخدم غير موجود.");
              Logout(); 
               }   
               if(error.response.data.message==="circle not found"){
                ErrorToast("عذرًا،الحلقة غير موجودة.");
                Logout(); 
                 }   
           } else if (error.request) {
                  // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
                  ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
           } else {
                  // خطأ آخر
                  ErrorToast(`حدث خطأ: ${error.message}`); 
          } 
          setLoading(false);  
        }  
       }
       setLoading(false);
    } 

    //Reports
    //يتم استدعاءه مباشرة عند الدخول على صفحة ادارة شؤون الطلاب  from StudentManagement.jsx
    //doc: Teacher=>Student=>GETstudentManagment Done Done
    const getStudentManagment=async()=>{
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/teacher/studentsManagement`,
          { headers: {Authorization:`Tuba__${userToken}`} } )  ;  
          setStudents(data?.student); // برجع حميع الطلاب في الحلقة المفعلين (الاسم،العمر،الجنس)
      }catch(error){
        if (error.request) {
          // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
          ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
   } else {
          // خطأ آخر
          ErrorToast(`حدث خطأ: ${error.message}`); 
  }  
      }
    }
    //doc: Teacher=>Student=>rejectStudent from StudentManagement.jsx Done Done
    const deleteStudentFromCircle = async (studentId) => {   
      try { 
        const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/teacher/rejectStudent/${studentId}`,
          {}, 
          {
            headers: {
              Authorization: `Tuba__${userToken}` // تمرير التوكن في الهيدر
            }
          }
        );   
        console.log(data);
        return data;  
      } catch (error) {
        if (error.response) {
          if(error.response.data.message==="student not found"){
          ErrorToast("عذرًا، الطالب غير موجود."); 
           }    
       } else if (error.request) {
              // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
              ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
       } else {
              // خطأ آخر
              ErrorToast(`حدث خطأ: ${error.message}`); 
      } 
      }
    };
      
   //getAllTeacherReports Done Done
   const getAllTeacherReports=async()=>{
    try{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/teacher/circleReports`,
        { headers: {Authorization:`Tuba__${userToken}`} } )  ;
        console.log(data?.reports.details);   
        setReportRows(data?.reports.details); 
        setReportStatistics(data?.reports.summary); 
    }catch(error){
      //في حال تم حذف كل التقارير وعمل ريفريش للصفحة ورجع ايرور 
      if (error.response) {
        setReportRows(null);
        setReportStatistics(null);  
      }else if (error.request) {
        // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
        ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
      } 
    }
  }

    //get circleReportByDate using filter Done Done
    const getCircleReportByDate=async(minDate,maxDate)=>{
      console.log(minDate);
      console.log(maxDate);
      try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/teacher/circleReportsByDate`,
          {
              startDate: minDate,
              endDate: maxDate,
          },
          { headers: {Authorization:`Tuba__${userToken}`} } )  ;  
        setReportRows(data?.reports.details); 
        setReportStatistics(data?.reports.summary);
      }catch(error){ 
        if (error.response) {
          ErrorToast(error.response.data.message);
        }else if (error.request){
          // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
          ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
        }else {
          // خطأ آخر
          ErrorToast(`حدث خطأ: ${error.message}`); 
  } 
      }
    }

    //deleteReport Done Done
    const deleteReport=async(reportId)=>{
      console.log(reportId);
      try{
        const {data}=await axios.delete(`${import.meta.env.VITE_API_URL}/teacher/deleteReport/${reportId}`,
          { headers: {Authorization:`Tuba__${userToken}`} } )  ;  
        return (data?.message);
      }catch(error){ 
        if (error.response) {
          if(error.response.data.message==="report not found"){
          ErrorToast("عذرًا، التقرير غير موجود."); 
           }    
       } else if (error.request) {
              // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
              ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
       } else {
              // خطأ آخر
              ErrorToast(`حدث خطأ: ${error.message}`); 
      } 
      }
    }
    //getAllSurah Done Done
    const getAllSurah=async()=>{
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/auth/allSurah`);
        console.log(data);
        setAllSurah(data?.map(surah => surah.surahName));   
      }catch(error){ 
        if (error.request) {
          // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
          ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
   } else {
          // خطأ آخر
          ErrorToast(`حدث خطأ: ${error.message}`); 
  } 
      }
    }
    //getSurahInfo by send surah num Done Done
    const getSurahInfo=async(surahNum)=>{
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/auth/getSurah/${surahNum}`);
        return(data);  
      }catch(error){ 
        if (error.request) {
          // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
          ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
   } else {
          // خطأ آخر
          ErrorToast(`حدث خطأ: ${error.message}`); 
  } 
      }
    }

    //get report info 
    //يتم استدعاءه اول ما تتحمل صفحة تعديل تقرير معين لجلب معلومات التقرير وعرضها كقيم أولية 
    //stop 2/2/2025
    const getReportInfo=async(reportId)=>{
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/teacher/getReport/${reportId}`,
          {
            headers: {
              Authorization: `Tuba__${userToken}` // تمرير التوكن في الهيدر
            }
          }
        );
       return(data?.report);  
      }catch(error){ 
        if (error.response) {
          if(error.response.data.message==="report not found"){
          ErrorToast("عذرًا، التقرير غير موجود."); 
           }    
       } else if (error.request) {
              // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
              ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
       } else {
              // خطأ آخر
              ErrorToast(`حدث خطأ: ${error.message}`); 
      }
      }
    }
    useEffect(()=>{
      getTeacherData();
    },[])

  if(loading){
    return <Loader/>
  }
  return (<TeacherContext.Provider value={{teacherInfo,setTeacherInfo,circleInfo ,setCircleInfo,schoolName,getStudentManagment,students,deleteStudentFromCircle,getAllTeacherReports,getCircleReportByDate,deleteReport ,reportRows,reportStatistics,getAllSurah,allSurah,getSurahInfo,getReportInfo}} >
    {children}
  </TeacherContext.Provider>
  )
}
 