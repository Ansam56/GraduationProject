import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
export let UserContext =createContext();

//اله علاقة بالمستخدم تسجيل دخوله وخروجه context
export default function UserContextProvider({children}) {
    const [userToken,setUserToken]= useState(null);//توكن مشفرة 
    const [userData,setUserData]=useState(null);//برسل التوكن المشفرة للباك عشان يرجعلي بيانات اليوزر المسجل دخوله وبخزنها هون وبنشرها 
    const [loading,setLoading]=useState(true);
    const [userRole,setUserRole]=useState("student");

    const Logout = ()=>{
      localStorage.removeItem("userToken");
      setUserToken(null); 
      setUserData(null);
      // <Navigate to='/login'/>
    }
    // const getUserData=async()=>{ 
    //    if(userToken){
    //      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
    //      { headers: {Authorization:`Tariq__${userToken}`} } )   
    //     // console.log(data);message and user info 
    //      setUserData(data.user); 
    //      setUserRole(data.role);
    //      setLoading(false);
    //    } 
    // }

    // useEffect(()=>{
    //  getUserData();
    // },[userToken])
   
  return (<UserContext.Provider value={{userToken,setUserToken,Logout,userData,setUserData,loading,setLoading, userRole}} >
    {children}
  </UserContext.Provider>
  )
}
