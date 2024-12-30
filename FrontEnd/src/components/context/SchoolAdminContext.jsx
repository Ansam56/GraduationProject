import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 

import Loader from "../pages/loader/Loader"; 
import { UserContext } from "./UserContext";
import { ErrorToast } from "../pages/toast/toast";

export let SchoolAdminContext =createContext(); 
 
export default function SchoolAdminContextProvider({children}) {
    const {userToken,Logout}= useContext(UserContext); 
    const [schoolAdminInfo,setSchoolAdminInfo]=useState(null);
    const [schoolInfo,setSchoolInfo]=useState(null);
    const [loading,setLoading]=useState(true);
    console.log("hi");
    const getSchoolAdminData=async()=>{ 
       if(userToken){
        try{
          const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/schoolAdmin/profile`,
            { headers: {Authorization:`Tuba__${userToken}`} } )  ;
            setSchoolAdminInfo(data.schoolAdmin);
            setSchoolInfo(data.school); 
        }catch(error){
           if (error.response) {
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
      getSchoolAdminData();
    },[])

  if(loading){
    return <Loader/>
  }
  return (<SchoolAdminContext.Provider value={{schoolAdminInfo,schoolInfo}} >
    {children}
  </SchoolAdminContext.Provider>
  )
}
 