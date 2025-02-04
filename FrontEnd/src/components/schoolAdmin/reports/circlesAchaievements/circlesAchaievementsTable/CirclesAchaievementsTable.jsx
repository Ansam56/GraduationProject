import React, { useContext, useEffect } from "react";
import ReportTable from './../../../../pages/ReportTable/ReportTable';
import { SchoolAdminContext } from "../../../../context/SchoolAdminContext";
 
//هون رح نجيب الداتا من الباك
//+رح نستخدم الجدول المشترك لكل التقارير لعرض هذه البيانات
export default function CirclesAchaievementsTable() {
  // Table columns definition
  const columns = [ 
    {
        id: "totalTathbeatPages",
        label: "عدد صفحات التثبيت",
        minWidth: 170,
    }, 
    {
        id: "totalReviewPages",
        label: "عدد صفحات المراجعة",
        minWidth: 170,
    },
    {
      id: "totalHifzPages",
      label: "عدد صفحات الحفظ",
      minWidth: 170,
    },
    {
      id: "date",
      label: "التاريخ",
      minWidth: 170,
    },
    {
      id: "circleGender",
      label: "الفئة",
      minWidth: 170,
    },
    {
      id: "circleType",
      label: "نوع الحلقة ",
      minWidth: 170,
    },
    {
        id: "circleName",
        label: "اسم الحلقة",
        minWidth: 170,
      } ,
    {
      id: "teacherName",
      label: "اسم المعلم",
      minWidth: 170,
    }
   
  ];
  
  let {getSchoolReportByDate,getAllSchoolAdminReports,reportRows,reportStatistics} =useContext(SchoolAdminContext);

  const DateFitlerFunction=async(minDate,maxDate)=>{
    await getSchoolReportByDate(minDate,maxDate); 
   }
   const ResetRowsFunction=async()=>{
    await getAllSchoolAdminReports();
   }
  useEffect(()=>{
    getAllSchoolAdminReports();
  },[])
  return (
    <> 
        <> 
          <ReportTable columns={columns} rows={reportRows} reportStatistics={reportStatistics} role="مدير" DateFitlerFunction={DateFitlerFunction} ResetRowsFunction={ResetRowsFunction}  />
        </>
      
    </>
  );
}
