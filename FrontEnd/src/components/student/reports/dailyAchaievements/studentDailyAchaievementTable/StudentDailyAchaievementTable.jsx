import React from "react";
  import ReportTable from "../../../../pages/ReportTable/ReportTable";

//هون رح نجيب الداتا من الباك
//+رح نستخدم الجدول المشترك لكل التقارير لعرض هذه البيانات
export default function StudentDailyAchaievementTable() {
  // Table columns definition
  const columns = [ 
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
        id: "AchaievementType",
        label: "نوع الانجاز",
        minWidth: 170,
      } ,
    {
      id: "AchaievementDate",
      label: "التاريخ",
      minWidth: 170,
    }
   
  ];
  //code أتوقع نفسها id الطالب
  const rows = [
    {
      code: 1,
      notes:"انتبهي للحركات أكثر ,ولا تتسرعي أثناء القراءة",
      rating: 3.0,
      pagesNumber: 10,
      toSurah_Ayah: "آل عمران/8",
      fromSurah_Ayah: "آل عمران/1",
      AchaievementType: "مراجعة",
      AchaievementDate: "2024-12-14",

    },
    {
      code: 2,
      notes:"ممتاز ,استمر!",
      rating: 5.0,
      pagesNumber: 20,
      toSurah_Ayah: "النساء/10",
      fromSurah_Ayah: "النساء/1",
      AchaievementType: "حفظ",
      AchaievementDate: "2024-12-13",
     
    },
    {
      code: 3,
      notes:" jfkdjfkjskfjs lkjfljfojsofjsofkjo lksljsofjosjfos ljxjsofjsofjosjfosjfopsmx,vxjlfjorfs; fkldjofsj kdjskhdkshkdsjfjksf jkffffffffffffffffffffffff hgggggggggggggggggggggggggg jhdifhisjfisjfsjkoksssssssssssssssssssssssssssssss kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu tttttttttttttttttttttttttttttttttttt mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj ikjkj iojjkjm jkjkjfkhsk hdjkghdskhgsdfhsfh hjdkfhksdhgksdhfs hdfhsdlhfsdlijs dflksdhflsihf kdhgkhsdkjghsdkgh hdjfhskdhgkjsdhk hdjhskhgkdhgjdsk ffffffffffffffffffffffffffffffffffff kjfkjfkjs jfdkdkfjdkfjskjfksjkjskjdksjfksjkf ksjfksjfjskfjskfjksjf skjfkjskfskfj hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh انتبهي للحركات أكثر ,ولا تتسرعي أثناء القراءة",
      rating: 4.0,
      pagesNumber: 12,
      toSurah_Ayah: "المائدة/20",
      fromSurah_Ayah: "المائدة/5",
      AchaievementType: "مراجعة",
      AchaievementDate: "2024-12-12",
 
    },
    {
      code: 4,
      notes:"",
      rating: 3.5,
      pagesNumber: 8,
      toSurah_Ayah: "الأنعام/15",
      fromSurah_Ayah: "الأنعام/5",
      AchaievementType: "مراجعة",
      AchaievementDate: "2024-12-11",
   
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
          <ReportTable columns={columns} rows={rows} />
        </>
      )}
    </>
  );
}
