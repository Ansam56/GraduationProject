import axios from "axios";
import { createContext, useEffect, useState } from "react"; 
import { ErrorToast } from "../pages/toast/toast";
import Loader from "../pages/loader/Loader";
import Cookies from "js-cookie";

export let UserContext =createContext(); 
//اله علاقة بالمستخدم تسجيل دخوله وخروجه context
//general context
export default function UserContextProvider({children}) {
  // const [userToken,setUserToken]= useState(Cookies.get("userToken")||null);
    const [userToken,setUserToken]= useState(localStorage.getItem("userToken")||null);//توكن مشفرة مهمة جدا
    const [userData,setUserData]=useState(null);//برسل التوكن المشفرة للباك عشان يرجعلي بيانات اليوزر المسجل دخوله وبخزنها هون وبنشرها 
    const [loading,setLoading]=useState(true);
    //تم استخدامها في صفحة تسجيل الدخول +ProtectedRoutes
    console.log("hi from user context");

    const Logout = ()=>{
      localStorage.removeItem("userToken");
      setUserToken(null);
      setUserData(null);  
      //مباشرة رح يتم ارسالي الى الlogin 
      //من ال protected route 
    }
    const getUserData=async()=>{ 
       if(userToken){
        try{
          const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`,
            { headers: {Authorization:`Tuba__${userToken}`} } )  ;
            // console.log(data);
            setUserData(data.user); 
        }catch(error){ 
          if (error.request) {
            // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
            ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
          }  
        }  
       }  
      setLoading(false);
    }
//يتم استدعاءها اول ما يحمل الموقع + بعد تسجيل الدخول مباشرة عندما تتغير قيمة اليوزر توكن
    useEffect(()=>{
     getUserData();
    },[userToken])
   
    if (loading) {
      return <Loader/>;
    }
  return (<UserContext.Provider value={{userToken,setUserToken,Logout,userData,loading}} >
    {children}
  </UserContext.Provider>
  )
}
 