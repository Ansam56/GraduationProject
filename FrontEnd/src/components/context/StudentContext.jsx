import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 

import Loader from "../pages/loader/Loader"; 
import { UserContext } from "./UserContext";
import { ErrorToast } from "../pages/toast/toast";

export let StudentContext =createContext(); 
 
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
            console.log(data);
            setStudentInfo(data.student);
         
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
    
    useEffect(()=>{
      getStudentData();
    },[])

  if(loading){
    return <Loader/>
  }
  return (<StudentContext.Provider value={{studentInfo}} >
    {children}
  </StudentContext.Provider>
  )
}
 