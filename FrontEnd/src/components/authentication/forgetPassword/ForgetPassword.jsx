import React from "react";
import { useFormik } from "formik";
import Input from "../Input";
import { forgetPasswordSchema } from "../validation/validate";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SharedForm from "../sharedForm/SharedForm";

export default function ForgetPassword() {
  const initialValues = {
    email: "",
    password: "",
    // confirmPassword:"",
    code: "",
  };
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/auth/forgetPassword`,
      values
    );
    if (data.message == "success") {
      toast.success("لقد تم تغيير كلمة المرور الخاصة بك بنجاح", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
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
    // {
    //     id: "confirmPassword", //lable لربط الليبل مع الانبوت
    //     type: "password",
    //     name: "confirmPassword",
    //     title: "تأكيد كلمة المرور", 
    //     value:formik.values.confirmPassword,
    // },
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
     /> 
  );
}
