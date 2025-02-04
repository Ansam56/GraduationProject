import React, { useState } from "react";
import Input from "../Input";
import { useFormik } from "formik";
import { sendCodeSchema } from "../validation/validate.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SharedForm from "../sharedForm/SharedForm";
import { ErrorToast, SuccessToast } from "../../pages/toast/toast.js";

export default function SendCode() {
  const navigate = useNavigate();
    const [loading,setLoading]=useState(false);
  const initialValues = {
    email: "",
  };

  const onSubmit = async (values) => {
     try {
      setLoading(true);
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/auth/sendCode`, values);
       setLoading(false); 
      SuccessToast("يرجى التحقق من بريدك الإلكتروني");
      navigate("/forgetPassword"); 
    } catch (error) {
       if (error.response) {
        if(error.response.data.message==="email not found"){
          ErrorToast("عذراً هذا البريد الالكتروني غير موجود");
       }if(error.response.status===500){
        ErrorToast(" حدث خطأ داخلي في السيرفر "); 
       }  
      }else if (error.request){
       // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
        ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
      }else {  // خطأ آخر
              ErrorToast(`حدث خطأ: ${error.message}`); 
        } 
        setLoading(false);  
    }
  };
  
  
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendCodeSchema,
  });
  const renderInputs=(
    <Input
              id="email"
              type="email"
              name="email"
              title="البريد الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              errors={formik.errors}
              onBlur={formik.handleBlur} //لتتبع الحقول التي تمت زيارتها
              touched={formik.touched} //لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت
     />
  )  

  return (
    <SharedForm
    title={'تحقق من البريد الإلكتروني الخاص بك'}
    formik_handelSubmit={formik.handleSubmit}
    renderInputs={renderInputs}
    mainAction={'إرسال الرمز'}
    formik_isValid={formik.isValid} 
    loading={loading}
  />
  );
}

