 import React from "react";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";
import BasicTabs from "../../pages/basicTabs/BasicTabs";
import SchoolAdminData from "./schoolAdminData/SchoolAdminData";
import SchoolData from "./schoolData/SchoolData";

//مربوط مع الrouts and user layout
//هاي الصفحة الاساسية 
export default function Profile() {
  return (
    <>
      <Dashboard_SubTitle title="الملف الشخصي" />
      <BasicTabs firstTap="المعلومات الشخصية" firstComponent={<SchoolAdminData/>} secondTap="معلومات المدرسة" secondComponent={<SchoolData/>} />
    </>
  );
}
