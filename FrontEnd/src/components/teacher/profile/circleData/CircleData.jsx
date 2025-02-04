import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useFormik } from "formik";
import SharedInput_Profiles from "../../../pages/sharedInput_profiles/SharedInput_Profiles";
import { ErrorToast, SuccessToast } from "../../../pages/toast/toast";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { TeacherContext } from "../../../context/TeacherContext";
import SharedProfile from "../../../pages/sharedProflle/SharedProfile";

export default function CircleData() {
  const { circleInfo, setCircleInfo } = useContext(TeacherContext);
  const { userToken } = useContext(UserContext);
  console.log(circleInfo);
  const [previewImage, setPreviewImage] = useState(circleInfo?.logo.secure_url);
  const [selectedDays, setSelectedDays] = useState(circleInfo?.days || []);
  let [loader,setLoader]=useState(false);
  
  
  const formatTimeToArabic = (time) => {
    if (!time) return "";
    // حذف ال Am و Pm من التايم سترينغ
    const cleanedTime = time.replace(/ ?[APap][Mm]?/g, "").trim();
    // تقسيم الوقت لدقائق وساعات
    const [hour, minute] = cleanedTime.split(":");
    //تحويل الساعة من سترينغ لرقم 10 يعني بالنظام العشري
    let hourInt = parseInt(hour, 10);
    let period = "صباحًا"; //default to morning
    if (hourInt >= 12) {
      period = "مساءً"; //afternoon/evening
      if (hourInt > 12) hourInt -= 12;
    } else if (hourInt === 0) {
      //00:00 to 12:00
      hourInt = 12; //midnight case
    }
    return `${hourInt}:${minute} ${period}`;
  };
  const daysInArabic = {
    sunday: "الأحد",
    monday: "الإثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
  };
  const handleFieldChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("logo", file);
    }
  };
   
  const initialValues = {
    teacherId: circleInfo?.teacherId,
    circleName: circleInfo?.circleName,
    circleGender: circleInfo?.circleGender=== "Male" ? "ذكور" :circleInfo?.circleGender === "Female"?"اناث":"ذكور واناث",
    type: circleInfo?.type,
    startTime: circleInfo?.startTime ,
    endTime: circleInfo?.endTime ,
    availableForStudent: circleInfo?.avilableForStudent ,
    selectedDays: circleInfo?.days,
    days: {
      "sunday": circleInfo?.days.includes("sunday") || false,
      "monday": circleInfo?.days.includes("monday") || false,
     "tuesday": circleInfo?.days.includes("tuesday") || false,
      "wednesday": circleInfo?.days.includes("wednesday") || false,
      "thursday": circleInfo?.days.includes("thursday") || false,
      "friday": circleInfo?.days.includes("friday") || false,
      "saturday": circleInfo?.days.includes("saturday") || false,
    },
    logo: circleInfo?.logo.secure_url || "",
  };
 
  const onSubmit = async (values) => { 
    values.selectedDays = Object.keys(formik.values.days).filter(day => formik.values.days[day]);
    const formData = new FormData();
    formData.append("startTime", values.startTime);
    formData.append("endTime", values.endTime);
    values.selectedDays.forEach(day => {
      formData.append("days", day);
    });
    formData.append("avilableForStudent", values.availableForStudent);
    formData.append("logo", values.logo);
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/teacher/${values.teacherId}/circle/updateCircle`,
        formData,
        { headers: { Authorization: `Tuba__${userToken}` } }
      );
      setLoader(false); 
      setCircleInfo(data?.circle);
      SuccessToast("تم تعديل البيانات بنجاح");
    } catch (error) {
      ErrorToast("حدث خطأ أثناء تحديث البيانات");
      setLoader(false); 
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  console.log(formik.values.startTime);
  const Inputs = [
    {
      id: "circleName",
      type: "text",
      name: "circleName",
      title: "اسم الحلقة",
      value: formik.values.circleName,
      disabled: true,
    },
    {
      id: "circleGender",
      type: "text",
      name: "circleGender",
      title: "الفئة المستهدفة",
      value: formik.values.circleGender,
      disabled: true,
    },
    {
      id: "type",
      type: "text",
      name: "type",
      title: "نوع الحلقة",
      value: formik.values.type,
      disabled: true,
    }, 
    {
      id: "showTime",
      type: "text",
      name: "showTime",
      title: "وقت بدء الحلقة",
      value:formatTimeToArabic(circleInfo?.startTime),
      disabled: true,
    },
    {
      id: "startTime",
      type: "time",
      name: "startTime",
      title: "تعديل وقت بدء الحلقة",
      value: formik.values.startTime,
    },
    {
      id: "showTime",
      type: "text",
      name: "showTime",
      title: "وقت انتهاء الحلقة",
      value: formatTimeToArabic(circleInfo?.endTime),
      disabled: true,
    },
    {
      id: "endTime",
      type: "time",
      name: "endTime",
      title: "تعديل وقت انتهاء الحلقة",
      value: formik.values.endTime,
    },
    {
      id: "days",
      formControlLable: true,
      title: "أيام الحلقة",
      formControlLables: Object.keys(formik.values.days).map((day) => ({
      name: `days.${day}`,
      value: formik.values.days[day],
      lable: daysInArabic[day],
      })),
    },
    {
      id: "circleStatus",
      formControlLable: true,
      title: "حالة الحلقة",
      formControlLables: [
        {
          name: "availableForStudent",
          value: formik.values.availableForStudent,
          lable: "متاح للطلاب",
        },
      ],
    },
  
  ];

  const renderInputs = Inputs.map((input, index) => (
    <SharedInput_Profiles
      id={input.id}
      type={input.type}
      name={input.name}
      title={input.title}
      value={input.value}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      key={index}
      disabled={input.disabled}
      formControlLable={input.formControlLable}
      formControlLables={input.formControlLables}
    />
  ));

  useEffect(() => {
    setSelectedDays(circleInfo?.days || []);
  }, [circleInfo]);

  return (
    <>
     <SharedProfile
        formikHandelSubmit={formik.handleSubmit}
        renderInputs={renderInputs}
        avatarAlt="Circle Picture"
        previewImage={previewImage}
        handleFieldChange={handleFieldChange}
        handleBlur={formik.handleBlur}
        pictureErrors={formik.errors["logo"]}
        pictureTouched={formik.touched["logo"]}  
        loader={loader}
        formikIsValid={formik.isValid} 
        deleteIcon="false"
      /> 
    </>
  );
}
