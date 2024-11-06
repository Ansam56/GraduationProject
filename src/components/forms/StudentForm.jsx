import React, { useState } from "react";
import { useFormik } from "formik";
import { studentFormSchema } from "../authentication/validation/validate";
import Input from "../authentication/Input";
import style from "./Form.module.css";
import formStyle from "../authentication/Auth.module.css";
export default function StudentForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      gender: "",
      city: "",
    },
    validationSchema: studentFormSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  const inputs = [
    {
      id: "firstName",
      type: "text",
      name: "firstName",
      title: "الاسم الأول",
      value: formik.values.firstName,
    },
    {
      id: "lastName",
      type: "text",
      name: "lastName",
      title: "اسم العائلة",
      value: formik.values.lastName,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "البريد الإلكتروني",
      value: formik.values.email,
    },
    {
      id: "city",
      type: "select",
      name: "city",
      title: "المدينة",
      value: formik.values.city,
      options: [
        "القدس",
        "رام الله",
        "نابلس",
        "الخليل",
        "جنين",
        "بيت لحم",
        "أريحا",
        "قلقيلية",
        "طولكرم",
        "سلفيت",
        "غزة",
        "رفح",
        "خان يونس",
        "جباليا",
        "دير البلح",
      ],
    },
    {
      id: "birthDate",
      type: "date",
      name: "birthDate",
      title: "تاريخ الميلاد",
      value: formik.values.birthDate,
    },
    {
      id: "gender",
      type: "select",
      name: "gender",
      title: "الجنس",
      value: formik.values.gender,
      options: ["ذكر", "أنثى"],
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "كلمة المرور",
      value: formik.values.password,
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      title: "تأكيد كلمة المرور",
      value: formik.values.confirmPassword,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
      key={index}
      id={input.id}
      type={input.type}
      name={input.name}
      title={input.title}
      value={input.value}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      options={input.options}
    />
  ));

  return (
    <div className={`${style.form_container} `}>
      <div className={`${formStyle.formDesign} `}>
        <h2 className={`${formStyle.formTitle} text-center mt-3 mb-4`}>
          تسجيل الطالب
        </h2>
        <form onSubmit={formik.handleSubmit} className={`${formStyle.form}`}>
          <div className="container-fluid">
            {renderInputs}

            <div className="  mt-3">
              <button
                type="submit"
                disabled={!formik.isValid}
                className={`${formStyle.button}  `}
              >
                ارسال
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
