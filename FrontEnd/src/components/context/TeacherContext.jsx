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
    const [loading,setLoading]=useState(true);

    console.log("hi from teacher context");
    const getTeacherData=async()=>{ 
       if(userToken){
        try{
          const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/teacher/profile`,
            { headers: {Authorization:`Tuba__${userToken}`} } )  ;
            console.log(data);
            setTeacherInfo(data.teacher);
            // setCircleInfo(data.circle); 
        }catch(error){
          //you are not teacher
           if (error.response) {
            // if(error.response.data.message==="you are not teacher"){
            //   ErrorToast("عذرًا، أنت لست معلم!.");
            //   Logout(); 
            //    }   
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
    
    useEffect(()=>{
      getTeacherData();
    },[])

  if(loading){
    return <Loader/>
  }
  return (<TeacherContext.Provider value={{teacherInfo,circleInfo}} >
    {children}
  </TeacherContext.Provider>
  )
}
 