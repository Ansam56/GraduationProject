import React from "react";
import ReportTable from './../../../../pages/ReportTable/ReportTable';
 
//هون رح نجيب الداتا من الباك
//+رح نستخدم الجدول المشترك لكل التقارير لعرض هذه البيانات
export default function CirclesAchaievementsTable() {
  // Table columns definition
  const columns = [ 
    {
        id: "tathbeetPagesNum",
        label: "عدد صفحات التثبيت",
        minWidth: 170,
    }, 
    {
        id: "revisionPagesNum",
        label: "عدد صفحات المراجعة",
        minWidth: 170,
    },
    {
      id: "savedPagesNum",
      label: "عدد صفحات الحفظ",
      minWidth: 170,
    },
    {
      id: "AchaievementDate",
      label: "التاريخ",
      minWidth: 170,
    },
    {
      id: "gender",
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
  //code أتوقع نفسها id الطالب
  const rows = [
    {
      code: 1,
      tathbeetPagesNum:0,
      revisionPagesNum:10,
      savedPagesNum:20, 
      AchaievementDate: "10/10/2024",
      gender: "ذكور",
      circleType: "حفظ ومراجعة",
      circleName: "مشكاة",
      teacherName: "أحمد السيد", 
    },
    {
        code: 2,
        tathbeetPagesNum:0,
        revisionPagesNum:10,
        savedPagesNum:20, 
        AchaievementDate: "10/10/2024",
        gender: "ذكور",
        circleType: "حفظ ومراجعة",
        circleName: "مشكاة",
        teacherName: "أحمد السيد", 
      },
      {
        code: 3,
        tathbeetPagesNum:0,
        revisionPagesNum:10,
        savedPagesNum:20, 
        AchaievementDate: "10/10/2024",
        gender: "ذكور",
        circleType: "حفظ ومراجعة",
        circleName: "مشكاة",
        teacherName: "أحمد السيد", 
      },
      {
        code: 4,
        tathbeetPagesNum:0,
        revisionPagesNum:10,
        savedPagesNum:20, 
        AchaievementDate: "10/11/2024",
        gender: "ذكور",
        circleType: "حفظ ومراجعة",
        circleName: "مشكاة",
        teacherName: "أحمد السيد", 
      },
      
    
  ];
  return (
    <>
      {rows.length === 0 ? (
        <div className="alert alert-info text-center mt-2" role="alert">
          لا يوجد بيانات لعرضها!
        </div>
      ) : (
        <> 
          <ReportTable columns={columns} rows={rows} role="مدير" />
        </>
      )}
    </>
  );
}
