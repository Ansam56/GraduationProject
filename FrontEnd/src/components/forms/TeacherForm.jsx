import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import {
  teacherFormSchema,
  circleFormSchema,
} from "../authentication/validation/validate";
import Input from "../authentication/Input";
import style from "./Form.module.css";
import formStyle from "../authentication/Auth.module.css";

export default function CircleAndTeacherForm() {
  const [step, setStep] = useState(1);
  const [circleData, setCircleData] = useState(null);
  const [selectedDays, setSelectedDays] = useState({
    الأحد: false,
    الإثنين: false,
    الثلاثاء: false,
    الأربعاء: false,
    الخميس: false,
    الجمعة: false,
    السبت: false,
  });

  const [logoFileName, setLogoFileName] = useState("شعار الحلقة");
  const [teacherInfoFileName, setteacherInfoFileName] =
    useState("السيرة الذاتية");

  const toggleDaySelection = (day) => {
    const updatedDays = { ...selectedDays, [day]: !selectedDays[day] };
    setSelectedDays(updatedDays);
    circleFormik.setFieldValue(
      "days",
      Object.keys(updatedDays).filter((day) => updatedDays[day])
    );
  };

  const circleFormik = useFormik({
    initialValues: {
      circleName: "",
      days: [],
      startTime: "",
      endTime: "",
      logo: null,
    },
    validationSchema: circleFormSchema,
    onSubmit: (values) => {
      const daysSelected = Object.keys(selectedDays).filter(
        (day) => selectedDays[day]
      );
      setCircleData({ ...values, days: daysSelected });
      setStep(2);
    },
  });

  const teacherFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      idNumber: "",
      email: "",
      phonePrefix: "",
      phone: "",
      gender: "",
      password: "",
      cpassword: "",
      teacherInfo: null,
      country: "",
    },
    validationSchema: teacherFormSchema,

    onSubmit: async (teacherValues) => {
      const finalPhone = `${teacherValues.phonePrefix}${teacherValues.phone}`;
      const genderInEnglish =
        teacherValues.gender === "ذكر" ? "Male" : "Female";
      const finalData = {
        ...circleData, //circle info from Step 1
        teacher: {
          userName: `${teacherValues.firstName} ${teacherValues.lastName}`, //combine names
          password: teacherValues.password,
          cpassword: teacherValues.cpassword,
          email: teacherValues.email,
          teacherInfo: teacherValues.teacherInfo,
          idNumber: teacherValues.idNumber,
          mobile: finalPhone,
          gender: genderInEnglish,
          country: teacherValues.country,
        },
      };

      // console.log("Final Data Submitted:", finalData.teacherInfo);

      try {
        //send a POST request to the backend (teacher registration)
        const teacherResponse = await axios.post(
          ` ${import.meta.env.VITE_API_URL}/teacher/register`,
          finalData.teacher //send teacher data
        );
        console.log("teacher response:", teacherResponse.data.userName);

        //extract teacher ID to use for the circle
        const teacherId = teacherResponse.data;

        //send another POST request to create the circle
        const circleFormData = new FormData();
        circleFormData.append("circleName", circleData.circleName);
        circleFormData.append("logo", circleData.logo);
        circleFormData.append("days", circleData.days);
        circleFormData.append("startTime", circleData.startTime);
        circleFormData.append("endTime", circleData.endTime);

        const circleResponse = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/teacher/${teacherId}/circle/createCircle`,
          circleFormData
        );

        console.log("Circle Created:", circleResponse.data);
        toast.success(
          " تم رفع الطلب , سيتم التواصل معك عبر البريد الالكتروني!"
        );
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error);
        toast.error("حدث خطأ أثناء رفع البيانات");
      }
    },
  });

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    setLogoFileName(file ? file.name : "شعار الحلقة");
    circleFormik.setFieldValue("logo", file);
  };

  const handleteacherInfoChange = (event) => {
    const file = event.currentTarget.files[0];
    setteacherInfoFileName(file ? file.name : "السيرة الذاتية");
    teacherFormik.setFieldValue("teacherInfo", file);
  };

  const circleInputs = [
    {
      id: "circleName",
      type: "text",
      name: "circleName",
      title: "اسم الحلقة",
      value: circleFormik.values.circleName,
    },
    {
      id: "startTime",
      type: "time",
      name: "startTime",
      title: "وقت البدء",
      value: circleFormik.values.startTime,
    },
    {
      id: "endTime",
      type: "time",
      name: "endTime",
      title: "وقت الانتهاء",
      value: circleFormik.values.endTime,
    },
    {
      id: "logo",
      type: "file",
      name: "logo",
      title: "صورة الحلقة",
      value: circleFormik.values.logo,
    },
    {
      id: "days",
      type: "checkbox-group",
      title: "اختر الأيام التي تناسبك",
      options: [
        "الأحد",
        "الإثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ],
    },
  ];

  const renderCircleInputs = circleInputs.map((input, index) => (
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
            onBlur={circleFormik.handleBlur}
          />
        </>
      ) : input.type === "checkbox-group" ? (
        <div className="mb-4">
          <h6>{input.title}</h6>
          {input.options.map((day) => (
            <div key={day} className="form-check form-switch mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id={day}
                checked={circleFormik.values.days.includes(day)}
                onChange={() => toggleDaySelection(day)}
              />
              <label className="form-check-label" htmlFor={day}>
                {day}
              </label>
            </div>
          ))}
          {circleFormik.errors.days && circleFormik.touched.days && (
            <div className="text-danger">{circleFormik.errors.days}</div>
          )}
        </div>
      ) : (
        <Input
          id={input.id}
          type={input.type}
          name={input.name}
          title={input.title}
          value={input.value}
          errors={circleFormik.errors}
          onChange={circleFormik.handleChange}
          onBlur={circleFormik.handleBlur}
          touched={circleFormik.touched}
        />
      )}
    </div>
  ));
  const teacherInputs = [
    {
      id: "firstName",
      type: "text",
      name: "firstName",
      title: "الاسم الأول",
      value: teacherFormik.values.firstName,
    },
    {
      id: "lastName",
      type: "text",
      name: "lastName",
      title: "اسم العائلة",
      value: teacherFormik.values.lastName,
    },
    {
      id: "idNumber",
      type: "text",
      name: "idNumber",
      title: "رقم الهوية",
      value: teacherFormik.values.idNumber,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "البريد الإلكتروني",
      value: teacherFormik.values.email,
    },
    {
      id: "country",
      type: "select",
      name: "country",
      title: "المدينة",
      value: teacherFormik.values.country,
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
      id: "phonePrefix",
      type: "select",
      name: "phonePrefix",
      title: "مقدمة الهاتف",
      value: teacherFormik.values.phonePrefix,
      options: ["+970", "+972"],
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      title: "رقم الجوال",
      value: teacherFormik.values.phone,
    },
    {
      id: "gender",
      type: "select",
      name: "gender",
      title: "الجنس",
      value: teacherFormik.values.gender,
      options: ["ذكر", "أنثى"],
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "كلمة المرور",
      value: teacherFormik.values.password,
    },
    {
      id: "cpassword",
      type: "password",
      name: "cpassword",
      title: "تأكيد كلمة المرور",
      value: teacherFormik.values.cpassword,
    },
    {
      id: "teacherInfo",
      type: "file",
      name: "teacherInfo",
      title: "السيرة الذاتية",
      value: teacherFormik.values.teacherInfo,
    },
  ];

  const renderTeacherInputs = teacherInputs.map((input, index) => {
    if (input.name === "phonePrefix" || input.name === "phone") {
      return null;
    }

    return (
      <div key={index} className={`${formStyle.inputWrapper}`}>
        {input.type === "file" ? (
          <>
            <label htmlFor={input.id} className={formStyle.fileInputLabel}>
              {teacherInfoFileName}
            </label>
            <input
              id={input.id}
              type="file"
              name={input.name}
              className={formStyle.fileInput}
              onChange={handleteacherInfoChange}
              onBlur={teacherFormik.handleBlur}
            />
            {teacherFormik.errors.teacherInfo &&
              teacherFormik.touched.teacherInfo && (
                <div className="text-danger">
                  {teacherFormik.errors.teacherInfo}
                </div>
              )}
          </>
        ) : (
          <Input
            id={input.id}
            type={input.type}
            name={input.name}
            title={input.title}
            value={input.value}
            errors={teacherFormik.errors}
            onChange={teacherFormik.handleChange}
            onBlur={teacherFormik.handleBlur}
            touched={teacherFormik.touched}
            options={input.options}
          />
        )}
      </div>
    );
  });

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
          value={teacherFormik.values.phonePrefix}
          errors={teacherFormik.errors}
          onChange={teacherFormik.handleChange}
          onBlur={teacherFormik.handleBlur}
          touched={teacherFormik.touched}
          options={["+970", "+972"]}
        />
      </div>
      <div className={`${formStyle.inputWrapper}`} style={{ flex: "1" }}>
        <Input
          id="phone"
          type="text"
          name="phone"
          title="رقم الجوال"
          value={teacherFormik.values.phone}
          errors={teacherFormik.errors}
          onChange={teacherFormik.handleChange}
          onBlur={teacherFormik.handleBlur}
          touched={teacherFormik.touched}
        />
      </div>
    </div>
  );

  return (
    <div className={`${style.form_container}`}>
      <div className={`${formStyle.formDesign}`}>
        {step === 1 ? (
          <>
            <h2 className={`${formStyle.formTitle} text-center mt-3 mb-4`}>
              معلومات الحلقة
            </h2>
            <form
              onSubmit={circleFormik.handleSubmit}
              className={`${formStyle.form}`}
            >
              {renderCircleInputs}
              <button
                type="submit"
                disabled={!circleFormik.isValid || circleFormik.isSubmitting}
                className={`${formStyle.button} mt-3`}
              >
                التالي
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className={`${formStyle.formTitle} text-center mt-3 mb-4`}>
              معلومات المعلم
            </h2>
            <form
              onSubmit={teacherFormik.handleSubmit}
              className={`${formStyle.form}`}
            >
              <div className="container-fluid">
                {renderTeacherInputs.map((field, index) =>
                  //render phone inputs directly after email field
                  teacherInputs[index]?.name === "email" ? (
                    <React.Fragment key={index}>
                      {field}
                      {phoneInputs}
                    </React.Fragment>
                  ) : (
                    field
                  )
                )}
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={!teacherFormik.isValid}
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
