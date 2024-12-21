import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { useFormik } from 'formik'
import { loginSchema } from '../validation/validate.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SharedForm from '../sharedForm/SharedForm'
import Loader from '../../pages/loader/Loader.jsx'
import { SuccessToast } from '../../pages/toast/toast.js'

export default function Login({saveCurrentUser}) { 
  const navigate =useNavigate();
  const [loading,setLoading]=useState(false);
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         email:'',
         password:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
    setLoading(true);
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,values);
    setLoading(false);
    console.log(data.message);
    if(data.message=="success"){//الباك اند رح يرجع token 
     localStorage.setItem("userToken",data.token);
     saveCurrentUser();
      SuccessToast("!تمت عملية تسجيل الدخول بنجاح " ); 
      navigate('/Admin'); 
    }
}
// const onSubmit = async (values) => {
//   try {
//     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values);
//     if (data.message === 'success') {
//       localStorage.setItem("userToken", data.token);
//       saveCurrentUser();
//       toast.success('Login successful');
//       navigate('/');
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     toast.error('An error occurred during login. Please try again.');
//   }
// };

   
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
if(loading){
  return  <Loader/>
}
  return ( 
    <SharedForm
    title={'تسجيل الدخول'}
    formik_handelSubmit={formik.handleSubmit}
    renderInputs={renderInputs}
    secondaryAction={'نسيت كلمة المرور؟'}
    secondaryAction_targetComponent={"/sendCode"}
    mainAction={'تسجيل دخول'}
    formik_isValid={formik.isValid} 
  /> 
  )
}