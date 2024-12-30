import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 

import Loader from "../pages/loader/Loader"; 
import { UserContext } from "./UserContext";
import { ErrorToast } from "../pages/toast/toast";

export let TeacherContext =createContext(); 
 
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
            // setTeacherInfo(data.teacher);
            // setCircleInfo(data.circle); 
        }catch(error){
          //you are not teacher
           if (error.response) {
              if(error.response.data.message==="you are not teacher"){
              ErrorToast("عذرًا، أنت لست معلم.");
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
 