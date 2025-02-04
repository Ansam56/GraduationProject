import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "../Input";
import { forgetPasswordSchema } from "../validation/validate";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SharedForm from "../sharedForm/SharedForm";
import { ErrorToast, SuccessToast } from "../../pages/toast/toast";

export default function ForgetPassword() {
  const initialValues = {
    email: "",
    password: "",
    cpassword:"",
    code: "",
  };
  const navigate = useNavigate();
    const [loading,setLoading]=useState(false);

  const onSubmit = async (values) => {
    try{
      setLoading(true);
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/auth/forgetPassword`,values);
      setLoading(false);  
      if(data?.message=="success"){//الباك اند رح يرجع token 
        SuccessToast("!لقد تم تغيير كلمة المرور الخاصة بك بنجاح" ); 
        navigate("/login"); 
      }
    }catch(error){   
      if (error.response) {
        if(error.response.data.message==="email not found"){
          ErrorToast("عذرًا، البريد الإلكتروني الذي أدخلته غير مسجل لدينا");  
      } if(error.response.data.message==="invalid code"){
        ErrorToast("الكود الذي أدخلته غير صحيح");
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
  };
 
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: forgetPasswordSchema,
  });

  const inputs = [
    {
      id: "Email", //lable لربط الليبل مع الانبوت
      type: "email",
      name: "email",
      title: "البريد الإلكتروني",
      value: formik.values.email,
    },
    {
      id: "Password", //lable لربط الليبل مع الانبوت
      type: "password",
      name: "password",
      title: "كلمة المرور الجديدة",
      value: formik.values.password,
    },
    {
        id: "cpassword", //lable لربط الليبل مع الانبوت
        type: "password",
        name: "cpassword",
        title: "تأكيد كلمة المرور", 
        value:formik.values.cpassword,
    },
    {
      id: "Code", //lable لربط الليبل مع الانبوت
      name: "code",
      title: "الرمز",
      value: formik.values.code,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      onChange={formik.handleChange}
      errors={formik.errors}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      key={index}
    />
  ));
  return (
     <SharedForm
       title={'إعادة تعيين كلمة المرور'}
       formik_handelSubmit={formik.handleSubmit}
       renderInputs={renderInputs}
       secondaryAction={'تسجيل دخول'}
       mainAction={'اعادة التعيين'}
       formik_isValid={formik.isValid}
       secondaryAction_targetComponent={"/login"}
       loading={loading}
     /> 
  );
}
