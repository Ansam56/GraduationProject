import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 

import Loader from "../pages/loader/Loader"; 
import { UserContext } from "./UserContext";
import { ErrorToast } from "../pages/toast/toast";

export let StudentContext =createContext(); 
/*
student
: 
birthDate:"2024-12-20T00:00:00.000Z"
confirmEmail:false
country:"نابلس"
createdAt:"2024-12-31T12:43:15.018Z"
email:"raghadmoqady@gmail.com"
gender:"Female"
idNumber:112233445
mobile:"+970998877666"
password:"$2a$08$w1l0gRgjC1R.nlG16b5pdeWiga4LkRCW6t6ghodYjfuAJNstvzHra"
role:"user"
schoolId:"67738acb7a5c44806ffd1995"
status:"suspend"
updatedAt:"2024-12-31T12:43:15.018Z"
userName:"Raghad Moqady"
__v:0
_id:"6773e6e302de1983b5230fd4"
*/
export default function StudentContextProvider({children}) {
    const {userToken,Logout}= useContext(UserContext); 
    const [studentInfo,setStudentInfo]=useState(null);  
    const [loading,setLoading]=useState(true);

    console.log("hi from student context");
    const getStudentData=async()=>{ 
       if(userToken){
        try{
          const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/student/profile`,
            { headers: {Authorization:`Tuba__${userToken}`} } )  ; 
            setStudentInfo(data?.student); 
        }catch(error){ 
          if (error.response) {
            // if(error.response.data.message==="you are not student"){
            //   ErrorToast("عذرًا، أنت لست طالب.");
            //   Logout(); 
            //    }   
              if(error.response.data.message==="user not found"){
              ErrorToast("عذرًا، المستخدم غير موجود.");
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
    
    // const joinToSpecificCircle=async(circleId,studentId)=>{
    //   // console.log(circleId);
    //   // console.log(studentId);
    //     try{
    //       const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/student/joinCircle/${circleId}/${studentId}`);
    //       return(data);
            
    //     }catch(error){

    //     }
    // }
    useEffect(()=>{
      getStudentData();
    },[])

  if(loading){
    return <Loader/>
  }
  return (<StudentContext.Provider value={{studentInfo,getStudentData,setStudentInfo}} >
    {children}
  </StudentContext.Provider>
  )
}
 