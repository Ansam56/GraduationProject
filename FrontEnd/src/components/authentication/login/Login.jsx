import React, { useContext, useEffect, useState } from 'react'
import Input from '../Input'
import { useFormik } from 'formik'
import { loginSchema } from '../validation/validate.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SharedForm from '../sharedForm/SharedForm'
import Loader from '../../pages/loader/Loader.jsx'
import { SuccessToast } from '../../pages/toast/toast.js'
import { UserContext } from '../../context/UserContext.jsx'

export default function Login() { 
  const navigate =useNavigate();
  let {setUserToken,userRole}= useContext(UserContext);
  const [loading,setLoading]=useState(false);
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         email:'',
         password:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 

    setLoading(true);
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,values);
    setLoading(false); 

    if(data.message=="success"){//الباك اند رح يرجع token 
     localStorage.setItem("userToken",data.token);
     setUserToken(data.token);
     
     SuccessToast("!تمت عملية تسجيل الدخول بنجاح " ); 
if (userRole=="admin"){
  navigate('/Admin'); 
}else if(userRole=="schoolAdmin"){
  navigate('/SchoolAdmin'); 
}else if(userRole=="teacher"){
  navigate('/Teacher'); 
}else if(userRole=="student"){
  navigate('/Student'); 
}
    }
}
// const onSubmit = async (values) => {
//   try {
//     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values);
//     if (data.message === 'success') {import { UserContext } from './../../context/UserContext';

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