import React, { useContext, useEffect } from "react";
import ReportTable from "../../../../pages/ReportTable/ReportTable";
import { TeacherContext } from "../../../../context/TeacherContext";
import { SuccessToast } from "../../../../pages/toast/toast";
  
//هون رح نجيب الداتا من الباك
//+رح نستخدم الجدول المشترك لكل التقارير لعرض هذه البيانات
export default function TeacherDailyAchaievementsTable() {
  // Table columns definition
  const columns = [
    {
      id: "operations",
      label: "الاجراءات",
      minWidth: 170,
    },
    {
      id: "notes",
      label: "الملاحظات",
      minWidth: 170,
    },
    {
      id: "rating",
      label: "التقييم",
      minWidth: 170,
    },
    {
      id: "pagesNumber",
      label: "عدد الصفحات",
      minWidth: 170,
    },
    {
      id: "toSurah_Ayah",
      label: "إلى (السورة/الآية)",
      minWidth: 170,
    },
    {
      id: "fromSurah_Ayah",
      label: "(من (السورة/الآية",
      minWidth: 170,
    },
    {
      id: "creationDate",
      label: "التاريخ",
      minWidth: 170,
    },
    {
      id: "achievementType",
      label: "نوع الانجاز",
      minWidth: 170,
    },
    // {
    //   id: "circle",
    //   label: "الحلقة",
    //   minWidth: 170,
    // },
    {
      id: "studentName",
      label: "اسم الطالب",
      minWidth: 170,
    },
  ];
  //code أتوقع نفسها id الطالب
  // const rows = [
  //   {
  //     code: 1,
  //     circleType:"حفظ ومراجعة",
  //     notes:"انتبهي للحركات أكثر ,ولا تتسرعي أثناء القراءة",
  //     rating: 3.0,
  //     pagesNumber: 10,
  //     toSurah_Ayah: "آل عمران/8",
  //     fromSurah_Ayah: "آل عمران/1",
  //     AchaievementDate: "2024-12-14",//
  //     AchaievementType: "مراجعة",//
  //     circle: "بالقرآن نحيا",
  //     studentName: "سارة علي",
  //   },
  //   {
  //     code: 2,
  //     circleType:"حفظ ومراجعة",
  //     notes:"ممتاز ,استمر!",
  //     rating: 5.0,
  //     pagesNumber: 20,
  //     toSurah_Ayah: "النساء/10",
  //     fromSurah_Ayah: "النساء/1",
  //     AchaievementDate: "2024-12-13",
  //     AchaievementType: "حفظ",
  //     circle: "بالقرآن نحيا",
  //     studentName: "أحمد سعيد",
  //   }, 
  //   {
  //     code: 5,
  //     circleType:"حفظ ومراجعة",
  //     notes:"ممتاز ,استمر!",
  //     rating: 5.0,
  //     pagesNumber: 3,
  //     toSurah_Ayah: "النساء/10",
  //     fromSurah_Ayah: "النساء/1",
  //     AchaievementDate: "2024-12-13",
  //     AchaievementType: "حفظ",
  //     circle: "بالقرآن نحيا",
  //     studentName: "بسام سعيد",
  //   },
 
  // ];

 let {getCircleReportByDate ,getAllTeacherReports,reportRows,reportStatistics,deleteReport} =useContext(TeacherContext); 
  //2nd
  const DateFitlerFunction=async(minDate,maxDate)=>{
    await getCircleReportByDate(minDate,maxDate); 
   }
    
   const ResetRowsFunction=async()=>{
    await getAllTeacherReports();
   }

   const deleteSpecificReport=async(reportId)=>{
   const response= await deleteReport(reportId);
    if(response=="success"){ 
           SuccessToast("تم حذف التقرير بنجاح");
           //page refresh 
           getAllTeacherReports();
        } 
   }
  useEffect(()=>{
    getAllTeacherReports();
  },[]) 
  return (
    <>
      {/* {rows.length === 0 ? (
        <div className="alert alert-info text-center mt-2" role="alert">
          لا يوجد تقارير !
        </div>
      ) : ( */}
        <> 
          <ReportTable columns={columns} rows={reportRows} reportStatistics={reportStatistics} role="معلم" DateFitlerFunction={DateFitlerFunction} ResetRowsFunction={ResetRowsFunction} deleteReport={deleteSpecificReport} />
        </>
      {/* )} */}
    </>
  );
}
