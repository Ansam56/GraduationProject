import React, { useEffect } from 'react'
import Input from '../Input'
import { useFormik } from 'formik'
import { loginSchema } from '../validation/validate.js'
import axios from 'axios'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import SharedForm from '../sharedForm/SharedForm'

export default function Login({saveCurrentUser}) { 
  const navigate =useNavigate();
  
  const initialValues={//نفس اسماء متغيرات الname, اللي من الباك اند
         email:'',
         password:'',
  } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

  const onSubmit= async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,values);
    
    if(data.message=='success'){//الباك اند رح يرجع token 
     localStorage.setItem("userToken",data.token);
     saveCurrentUser();
     toast.success('Done', {  
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      navigate('/');
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
  /> 
  )
}