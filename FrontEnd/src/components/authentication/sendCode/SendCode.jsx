import React from "react";
import Input from "../Input";
import { useFormik } from "formik";
import { sendCodeSchema } from "../validation/validate.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SharedForm from "../sharedForm/SharedForm";

export default function SendCode() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const onSubmit = async (values) => {
    const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/auth/sendCode`, values);
    
    if (data.message == "success") {
      toast.success("يرجى التحقق من بريدك الإلكتروني", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/forgetPassword");
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
  />
  );
}
