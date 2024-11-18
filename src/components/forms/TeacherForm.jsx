import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
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
  const [resumeFileName, setResumeFileName] = useState("السيرة الذاتية");

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
      image: null,
    },
    validationSchema: circleFormSchema,
    validateOnChange: true,
    validateOnBlur: true,
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
      id: "",
      email: "",
      birthDate: "",
      phonePrefix: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
      resume: null,
      city: "",
    },
    validationSchema: teacherFormSchema,
    onSubmit: (teacherValues) => {
      const finalPhone = `${teacherValues.phonePrefix}${teacherValues.phone}`;
      const finalData = {
        ...circleData,
        teacher: { ...teacherValues, phone: finalPhone },
      };
      console.log("Final Data Submitted:", finalData);
      toast.success("تم رفع الطلب , سيتم التواصل معك عبر البريد الالكتروني");
    },
  });

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    setLogoFileName(file ? file.name : "شعار الحلقة");
    circleFormik.setFieldValue("image", file);
  };

  const handleResumeChange = (event) => {
    const file = event.currentTarget.files[0];
    setResumeFileName(file ? file.name : "السيرة الذاتية");
    teacherFormik.setFieldValue("resume", file);
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
      id: "image",
      type: "file",
      name: "image",
      title: "صورة الحلقة",
      value: circleFormik.values.image,
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
      id: "id",
      type: "text",
      name: "id",
      title: "رقم الهوية",
      value: teacherFormik.values.id,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "البريد الإلكتروني",
      value: teacherFormik.values.email,
    },
    {
      id: "city",
      type: "select",
      name: "city",
      title: "المدينة",
      value: teacherFormik.values.city,
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
      value: teacherFormik.values.birthDate,
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
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      title: "تأكيد كلمة المرور",
      value: teacherFormik.values.confirmPassword,
    },
    {
      id: "resume",
      type: "file",
      name: "resume",
      title: "السيرة الذاتية",
      value: teacherFormik.values.resume,
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
              {resumeFileName}
            </label>
            <input
              id={input.id}
              type="file"
              name={input.name}
              className={formStyle.fileInput}
              onChange={handleResumeChange}
              onBlur={teacherFormik.handleBlur}
            />
            {teacherFormik.errors.resume && teacherFormik.touched.resume && (
              <div className="text-danger">{teacherFormik.errors.resume}</div>
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
