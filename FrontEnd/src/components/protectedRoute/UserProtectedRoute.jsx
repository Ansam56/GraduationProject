//بنعملها عشان اليوزر اللي مش عامل تسجيل دخول لسا نمنعه من الوصول لصفحات خاصة بالمسجلين وذلك عند كتابتها فوق بالرابط 
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Loader from '../pages/loader/Loader';
import Cookies from "js-cookie";

export default function UserProtectedRoute({children, role=""} ) {//هون بدي أتأكد هل اليوزر مسجل دخوله؟عن طريق التوكن +هون متل الشرطي بمنع وصول اشخاص معينين للمكان المطلوب 
  let {userData,loading}= useContext(UserContext); 
  console.log("hi from user protected");
    // if(localStorage.getItem("userToken")== null){//(لا يوجد لديه صلاحية)اذاً اليوزر عامل تسجيل خروج وممنوع يدخل على الراوت اللي كتبه
    //     return <Navigate to='/login'/>
    // }  
    //في حال ما كان مسجل دخول
    if (localStorage.getItem("userToken")== null) {
        return <Navigate to="/login" />;
    }
    //في حال كان مسجل دخول
    //1)ما كان اله الصلاحية
     if (userData && userData.role!== role) {
      return <Navigate to='/' />;
     }
    //  if(loading ){
    //   return <Loader/>
    // }
    //2)كان فيه اله صلاحية 
   
   return children
}
