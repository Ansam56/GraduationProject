import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { studentFormSchema } from "../authentication/validation/validate";
import Input from "../authentication/Input";
import style from "./Form.module.css";
import formStyle from "../authentication/Auth.module.css";
export default function StudentForm() {
  const { schoolId } = useParams(); //from Raghad

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      idNumber: "",
      email: "",
      birthDate: "",
      password: "",
      cpassword: "",
      gender: "",
      phonePrefix: "",
      phone: "",
      country: "",
    },
    validationSchema: studentFormSchema,
    onSubmit: async (values) => {
      const finalPhone = `${values.phonePrefix}${values.phone}`;
      const genderInEnglish = values.gender === "ذكر" ? "Male" : "Female";
      const userName = `${values.firstName} ${values.lastName}`;
      // const schoolId = "67738acb7a5c44806ffd1995";

      const payload = {
        userName,
        idNumber: values.idNumber,
        email: values.email,
        birthDate: values.birthDate,
        password: values.password,
        cpassword: values.cpassword,
        gender: genderInEnglish,
        mobile: finalPhone,
        country: values.country,
      };

      try {
        const studentResponse = await axios.post(
          ` ${import.meta.env.VITE_API_URL}/student/register/${schoolId}`,
          payload //send student data
        );
        toast.success(" تم انشاء الحساب ");
        navigate("../");
        console.log("teacher response:", studentResponse.data);
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error);
        const errorMessage = error.response?.data?.message;
        if (errorMessage === "email exit" || errorMessage === "user exit") {
          toast.error("عذرا المستخدم موجود مسبقا قم بتسجيل الدخول ");
          navigate("/Login");
        } else if (errorMessage === "Passwords not match")
          toast.error(" عذرا كلمة المرورو غير صحيحة  ");
        else if (errorMessage === "user not found")
          toast.error(" عذرا المستخدم غير موجود ");
        else if (errorMessage === "school not exit")
          toast.error(" عذرا المدرسة غير موجودة مسبقا ");
        else if (errorMessage === "school not active yet .")
          toast.error(" عذراالمدرسة غير متاحة حاليا");
        else if (errorMessage === "circle not found")
          toast.error(" عذرا الحلقة غير موجودة ");
        else if (errorMessage === "circle not active now ,try another time.")
          toast.error(" عذراالحلقة غير متاحة حاليا حاول لاحقا");
        else if (errorMessage === "you can not join many circles")
          toast.error(" عذرا لا يمكنك الانضمام لأكثر من حلقة واحدة");
        else toast.error("حدث خطأ أثناء رفع البيانات");
      }
      // console.log("Form Submitted:", values);
      // toast.success("تم رفع الطلب , سيتم التواصل معك عبر البريد الالكتروني");
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
      id: "idNumber",
      type: "text",
      name: "idNumber",
      title: "رقم الهوية",
      value: formik.values.idNumber,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "البريد الإلكتروني",
      value: formik.values.email,
    },
    {
      id: "country",
      type: "select",
      name: "country",
      title: "المدينة",
      value: formik.values.country,
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
        "طوباس",
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
      id: "cpassword",
      type: "password",
      name: "cpassword",
      title: "تأكيد كلمة المرور",
      value: formik.values.cpassword,
    },
    {
      id: "phonePrefix",
      type: "select",
      name: "phonePrefix",
      title: "مقدمة الهاتف",
      value: formik.values.phonePrefix,
      options: ["+970", "+972"],
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      title: "رقم الجوال",
      value: formik.values.phone,
    },
  ];

  const phoneInputs = (
    <div className="d-flex align-items-center" key="phoneFields">
      <div
        className={`${formStyle.inputWrapper} me-2`}
        style={{ flex: "0 0 25%" }}
      >
        <Input
          id="phonePrefix"
          type="select"
          name="phonePrefix"
          title="مقدمة الهاتف"
          value={formik.values.phonePrefix}
          errors={formik.errors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          options={["+970", "+972"]}
        />
      </div>
      <div className={`${formStyle.inputWrapper}`} style={{ flex: "1" }}>
        <Input
          id="phone"
          type="text"
          name="phone"
          title="رقم الجوال"
          value={formik.values.phone}
          errors={formik.errors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
        />
      </div>
    </div>
  );

  const renderInputs = inputs.map((input, index) => {
    if (input.name === "phonePrefix" || input.name === "phone") {
      return null;
    }

    if (input.name === "birthDate") {
      return (
        <React.Fragment key={index}>
          <Input
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
          {phoneInputs}
        </React.Fragment>
      );
    }

    return (
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
    );
  });

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
