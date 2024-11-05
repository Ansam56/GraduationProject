import React, { useState } from "react";
import { useFormik } from "formik";
import {
  schoolFormSchema,
  managerFormSchema,
} from "../authentication/validation/validate";
import Input from "../authentication/Input";
import style from "./Form.module.css";
import formStyle from "../authentication/Auth.module.css";

export default function SchoolAndManagerForm() {
  const [step, setStep] = useState(1);
  const [schoolData, setSchoolData] = useState(null);
  const [logoFileName, setLogoFileName] = useState("شعار المدرسة");
  const [resumeFileName, setResumeFileName] = useState("السيرة الذاتية");

  const schoolFormik = useFormik({
    initialValues: {
      schoolName: "",
      address: "",
      description: "",
      logo: null,
    },
    validationSchema: schoolFormSchema,
    onSubmit: (values) => {
      setSchoolData(values);
      setStep(2);
    },
  });

  const managerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
      resume: null,
    },
    validationSchema: managerFormSchema,
    onSubmit: (managerValues) => {
      const finalData = {
        ...schoolData,
        manager: managerValues,
      };
      console.log("Final Data Submitted:", finalData);
    },
  });

  const schoolInputs = [
    {
      id: "schoolName",
      type: "text",
      name: "schoolName",
      title: "اسم المدرسة",
      value: schoolFormik.values.schoolName,
    },
    {
      id: "address",
      type: "text",
      name: "address",
      title: "العنوان",
      value: schoolFormik.values.address,
    },
    {
      id: "description",
      type: "textarea",
      name: "description",
      title: "وصف المدرسة",
      value: schoolFormik.values.description,
    },
    {
      id: "logo",
      type: "file",
      name: "logo",
      title: "شعار المدرسة",
      value: schoolFormik.values.logo,
    },
  ];

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    setLogoFileName(file ? file.name : "شعار المدرسة");
    schoolFormik.setFieldValue("logo", file);
  };

  const renderSchoolInputs = schoolInputs.map((input, index) => (
    <div key={index} className={`${formStyle.inputWrapper}`}>
      {input.type === "file" ? (
        <>
          <label htmlFor={input.id} className={formStyle.fileInputLabel}>
            {logoFileName}
          </label>
          <input
            id={input.id}
            type="file"
            name={input.name}
            className={formStyle.fileInput}
            onChange={handleLogoChange}
            onBlur={schoolFormik.handleBlur}
          />
        </>
      ) : (
        <Input
          id={input.id}
          type={input.type}
          name={input.name}
          title={input.title}
          value={input.value}
          errors={schoolFormik.errors}
          onChange={schoolFormik.handleChange}
          onBlur={schoolFormik.handleBlur}
          touched={schoolFormik.touched}
        />
      )}
    </div>
  ));

  const managerInputs = [
    {
      id: "firstName",
      type: "text",
      name: "firstName",
      title: "الاسم الأول",
      value: managerFormik.values.firstName,
    },
    {
      id: "lastName",
      type: "text",
      name: "lastName",
      title: "اسم العائلة",
      value: managerFormik.values.lastName,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "البريد الإلكتروني",
      value: managerFormik.values.email,
    },
    {
      id: "birthDate",
      type: "date",
      name: "birthDate",
      title: "تاريخ الميلاد",
      value: managerFormik.values.birthDate,
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      title: "رقم الجوال",
      value: managerFormik.values.phone,
    },
    {
      id: "gender",
      type: "select",
      name: "gender",
      title: "الجنس",
      value: managerFormik.values.gender,
      options: ["ذكر", "أنثى"],
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "كلمة المرور",
      value: managerFormik.values.password,
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      title: "تأكيد كلمة المرور",
      value: managerFormik.values.confirmPassword,
    },
    {
      id: "resume",
      type: "file",
      name: "resume",
      title: "السيرة الذاتية",
      value: managerFormik.values.resume,
    },
  ];

  const handleResumeChange = (event) => {
    const file = event.currentTarget.files[0];
    setResumeFileName(file ? file.name : "السيرة الذاتية");
    managerFormik.setFieldValue("resume", file);
  };

  const renderManagerInputs = managerInputs.map((input, index) => (
    <div key={index} className={`${formStyle.inputWrapper}`}>
      {input.type === "file" ? (
        <>
          <label htmlFor={input.id} className={formStyle.fileInputLabel}>
            {resumeFileName}
          </label>
          <input
            id={input.id}
            type="file"
            name={input.name}
            className={formStyle.fileInput}
            onChange={handleResumeChange}
            onBlur={managerFormik.handleBlur}
          />
        </>
      ) : (
        <Input
          id={input.id}
          type={input.type}
          name={input.name}
          title={input.title}
          value={input.value}
          errors={managerFormik.errors}
          onChange={managerFormik.handleChange}
          onBlur={managerFormik.handleBlur}
          touched={managerFormik.touched}
          options={input.options}
        />
      )}
    </div>
  ));

  return (
    <div className={`${style.form_container}`}>
      <div className={`${formStyle.formDesign}`}>
        {step === 1 && (
          <>
            <h2 className={`${formStyle.formTitle} text-center mt-3 mb-4`}>
              معلومات المدرسة
            </h2>
            <form
              onSubmit={schoolFormik.handleSubmit}
              className={`${formStyle.form}`}
            >
              <div className="container-fluid">
                {renderSchoolInputs}
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={!schoolFormik.isValid}
                    className={`${formStyle.button}`}
                  >
                    التالي
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className={`${formStyle.formTitle} text-center mt-3 mb-4`}>
              معلومات المدير
            </h2>
            <form
              onSubmit={managerFormik.handleSubmit}
              className={`${formStyle.form}`}
            >
              <div className="container-fluid">
                {renderManagerInputs}
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={!managerFormik.isValid}
                    className={`${formStyle.button}`}
                  >
                    ارسال
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
