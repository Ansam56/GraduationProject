import React, { useContext, useEffect, useState } from 'react'
import Input from '../Input'
import { useFormik } from 'formik'
import { loginSchema } from '../validation/validate.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SharedForm from '../sharedForm/SharedForm'
import Loader from '../../pages/loader/Loader.jsx'
import { ErrorToast, SuccessToast } from '../../pages/toast/toast.js'
import { UserContext } from '../../context/UserContext.jsx'
import Cookies from "js-cookie";

export default function Login() { 
  const navigate =useNavigate();
  let {setUserToken,userData}= useContext(UserContext);
  const [loading,setLoading]=useState(false);
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         email:'',
         password:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
    try{
      setLoading(true);
      const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,values); 
      setLoading(false);  
      if(data?.message=="success"){//الباك اند رح يرجع token 
        // Cookies.set("userToken", data.token, {
        //   expires:  1 / 96,  // 8 ساعات (1/3 يوم)
        //   secure: true,    // تُرسل الكوكيز عبر HTTPS فقط
        //   httpOnly: false, // يُضبط إذا كنت تعمل على خادم
        //   sameSite: "Strict" // يمنع الإرسال عبر المواقع الأخرى
        // });
        // Cookies.set("userToken", data.token );
        localStorage.setItem("userToken",data.token);
  
       setUserToken(data.token);
       //Go to UserContext=>getUserData from backend and change this values:userData,userRole
       SuccessToast("!تمت عملية تسجيل الدخول بنجاح " ); 
      //  console.log(userData);
       navigate('/'); 
  //      if (userData&&userData.role=="admin"){
  //   navigate('/Admin'); 
  // }else if(userData&&userData.role=="schoolAdmin"){
  //   navigate('/SchoolAdmin'); 
  // }else if(userData&&userData.role=="teacher"){
  //   navigate('/Teacher'); 
  // }else if(userData&&userData.role=="student"){
  //   navigate('/Student'); 
  // } 
      }
    }catch(error){   
      if (error.response) {
        if(error.response.data.message==="email not found"){
          ErrorToast("عذرًا، البريد الإلكتروني الذي أدخلته غير مسجل لدينا");  
      } if(error.response.data.message==="PLZ confirm your email"){
        ErrorToast("يرجى التحقق من بريدك الإلكتروني وتأكيده");
      }if(error.response.data.message==="invalid password"){
        ErrorToast("تعذر تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى.")
      }if(error.response.data.message===" SchoolAdmin account is blocked"){
        ErrorToast("هذا الحساب غير مفعل بعد ! سيتم معالجة الطلب من قبل مسؤول الموقع قريباً واخبارك بالقبول أو الرفض عبر الايميل")
      }if(error.response.data.message===" Teacher account is blocked"){
        ErrorToast("هذا الحساب غير مفعل بعد ! سيتم معالجة الطلب من قبل مدير المدرسة قريباً واخبارك بالقبول أو الرفض عبر الايميل")
      }
        // // الخطأ من الخادم (مثل بيانات خاطئة أو مشكلة بالباك)
        // if (error.response.status === 404) {
        //   ErrorToast("عذرًا، المستخدم غير موجود. يرجى التحقق من البيانات المدخلة.");
        // } else if (error.response.status === 401) {
        //   ErrorToast("بيانات تسجيل الدخول غير صحيحة. يرجى المحاولة مرة أخرى.");
        // } else {
        //   ErrorToast("حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.");
        // }
      } else if (error.request) {
        // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
        ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
      } else {
        // خطأ آخر
        ErrorToast(`حدث خطأ: ${error.message}`); 
      } 
      setLoading(false); 
      navigate('/login'); 
    } 
   
} 
  const formik =useFormik({
      initialValues, 
      onSubmit,
      validationSchema:loginSchema
  });
 
   const inputs=[  
    {
      id:'Email',//lable لربط الليبل مع الانبوت 
      type:'email',
      name:'email',
      title:'البريد الإلكتروني',
      value: formik.values.email,
    },
    {
      id:'Password',//lable لربط الليبل مع الانبوت 
      type:'password',
      name :'password',
      title:'كلمة المرور',
      value: formik.values.password,
    },
  ]

  const renderInputs= inputs.map((input,index)=>//array
  <Input
   id={input.id}
   type={input.type}
   name={input.name}
   title={input.title}
   value={input.value} 
   errors={formik.errors} 
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}//لتتبع الحقول التي تمت زيارتها 
   touched={formik.touched}//لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت 
   key={index} />
   )
 
  return ( 
    <SharedForm
    title={'تسجيل الدخول'}
    formik_handelSubmit={formik.handleSubmit}
    renderInputs={renderInputs}
    secondaryAction={'نسيت كلمة المرور؟'}
    secondaryAction_targetComponent={"/sendCode"}
    mainAction={'تسجيل دخول'}
    formik_isValid={formik.isValid} 
    loading={loading}
   /> 
  )
}