import React, { useContext, useState } from "react";
import { Avatar, Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useFormik } from "formik";
import SharedInput_Profiles from "../../../pages/sharedInput_profiles/SharedInput_Profiles";
import { ErrorToast, SuccessToast } from "../../../pages/toast/toast";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { TeacherContext } from "../../../context/TeacherContext";

export default function CircleData() {
  const { circleInfo, setCircleInfo } = useContext(TeacherContext);
  const { userToken } = useContext(UserContext);

  const [previewImage, setPreviewImage] = useState(circleInfo?.logo.secure_url);

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
    circleGender: circleInfo?.circleGender,
    type: circleInfo?.type,
    startTime: circleInfo?.startTime || "",
    endTime: circleInfo?.endTime || "",
    availableForStudent: circleInfo?.avilableForStudent || false,
    days: {
      sunday: circleInfo?.days.includes("sunday") || false,
      monday: circleInfo?.days.includes("monday") || false,
      tuesday: circleInfo?.days.includes("tuesday") || false,
      wednesday: circleInfo?.days.includes("wednesday") || false,
      thursday: circleInfo?.days.includes("thursday") || false,
      friday: circleInfo?.days.includes("friday") || false,
      saturday: circleInfo?.days.includes("saturday") || false,
    },
    logo: circleInfo?.logo.secure_url || "",
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("startTime", values.startTime);
    formData.append("endTime", values.endTime);
    formData.append("days", JSON.stringify(Object.keys(values.days).filter((day) => values.days[day])));
    formData.append("availableForStudent", values.availableForStudent);
    formData.append("logo", values.logo);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/teacher/${values.teacherId}/circle/updateCircle`,
        formData,
        { headers: { Authorization: `Tuba__${userToken}` } }
      );
      setCircleInfo(data?.circle);
      SuccessToast("تم تعديل البيانات بنجاح");
    } catch (error) {
      ErrorToast("حدث خطأ أثناء تحديث البيانات");
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

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
      id: "startTime",
      type: "time",
      name: "startTime",
      title: "وقت بدء الحلقة",
      value: formik.values.startTime,
    },
    {
      id: "endTime",
      type: "time",
      name: "endTime",
      title: "وقت انتهاء الحلقة",
      value: formik.values.endTime,
    },
    {
      id: "days",
      formControlLable: true,
      title: "أيام الحلقة",
      formControlLables: Object.keys(formik.values.days).map((day) => ({
        name: `days.${day}`,
        value: formik.values.days[day],
        lable: day,
      })),
    }
    ,
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

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Box>
              <Avatar
                src={previewImage}
                alt="Circle Logo"
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  objectPosition: "center",
                  marginBottom: "10px",
                  border: ".1px solid gray",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </div>
          <div className="col-md-8">{renderInputs}</div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="rounded-5 border-1 w-50 btn btn-success" type="submit">
            حفظ التعديلات
          </button>
        </div>
      </div>
    </form>
  );
}
