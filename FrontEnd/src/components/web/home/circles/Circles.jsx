
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CircleCard from "../shared/circleCard/CircleCard";
import style from './Circles.module.css';
import { useQuery } from "react-query";
import { UserContext } from "../../../context/UserContext";

import Alert from "../../../pages/alert/Alert";
import Loader from "../../../pages/loader/Loader";
//في ما بعد هذه الصفحة سيتم استدعاءها في السكرول وفي صفحة الطالب
//وهون بس رح استدعي المتغير الموجود بالكونتكست المخزن فيه ارري اوف اوبجيكت جبتهم من الباك بعد ما طلبتهم من الباك وذلك بالضغط على العدسة عند مدرسة معينة بالهوم بيج مثلا وتلقائيا عند التسجيل كطالب بستدعي فنكشن يجيب حلقات مدرسة معينة وبخزنهم في المتغير عشان اشوفهم هون بشكل متزامن
//يعني وين ما فيه اي دي معين بشتدعي فنكشن من الكونتكست عشان يجيبهم ويخزنهم وهون او باخر محطة عند العرض بجيب هاد المتغير من الكونتكست وبعرض المعلومات
//حاليا رح اعمل شيء محلي وفيما بعد بستبدله مع الباك Done
//سيتم استدعاءها بinitialDashboard for student 
//يتم استدعاءها من scroll
export default function Circles({schoolId,from="",studentId="",setStudentInfo=""}) {
 
  // الحالة لحفظ بيانات الحلقات
  // const schoolCircles = [
  //   {
  //     //الصورة نفسها للكل 
  //     id: 1,
  //     teacherName:"خالد عمر",
  //     name: "انا نبشرك",
  //     type:"حفظ ومراجعة",
  //     gender:"ذكور",
  //     availability:"true",
  //     instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
  //     //الايام الاحسن ما تكون تكست
  //     days:"أحد ثلاثاء خميس",
  //     time:"4:00-6:00 pm", 
  //   },
  //   {
  //     //الصورة نفسها للكل 
  //     id: 2,
  //     teacherName:"رغد موقدي",
  //     name: "بالقرآن نهتدي",
  //     type:"تثبيت",
  //     gender:"اناث",
  //     availability:"true",
  //     instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
  //     days:"أحد ثلاثاء خميس",
  //     time:"4:00-6:00 pm", 
  //   },
  //   {
  //     //الصورة نفسها للكل 
  //     id: 3,
  //     teacherName:"رغد موقدي",
  //     name: "نور على نور ",
  //     type:"حفظ ومراجعة",
  //     gender:"ذكور",
  //     availability:"true",
  //     instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
  //     days:"أحد ثلاثاء خميس",
  //     time:"4:00-6:00 pm", 
  //   },
  //   {
  //     //الصورة نفسها للكل 
  //     id: 4,
  //     teacherName:"رغد موقدي",
  //     name: "انا نبشرك",
  //     type:"تثبيت",
  //     gender:"اناث",
  //     availability:"true",
  //     instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
  //     days:"أحد ثلاثاء خميس",
  //     time:"4:00-6:00 pm", 
  //   },
  //   {
  //     //الصورة نفسها للكل 
  //     id: 5,
  //     teacherName:"رغد موقدي",
  //     name: "انا نبشرك",
  //     type:"حفظ ومراجعة",
  //     gender:"ذكور",
  //     availability:"true",
  //     instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
  //     days:"أحد ثلاثاء خميس",
  //     time:"4:00-6:00 pm", 
  //   },
  //   {
  //     //الصورة نفسها للكل 
  //     id: 6,
  //     teacherName:"رغد موقدي",
  //     name: "انا نبشرك",
  //     type:"حفظ ومراجعة",
  //     gender:"اناث",
  //     availability:"true",
  //     instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
  //     days:"أحد ثلاثاء خميس",
  //     time:"4:00-6:00 pm", 
  //   },
    
  //   // المزيد من الحلقات
  // ];
  // الحالة لحفظ قيم الفلاتر
  
  // حالة (state) لحفظ النص المدخل في خانة البحث
  //لان القيمة فارغة فبالبداية يتم عرض جميع الحلقات
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState(""); // فلتر الجنس
  const [typeFilter, setTypeFilter] = useState(""); // فلتر نوع الحلقة
//الربط مع الباكإند
let {getSchoolCircles}=useContext(UserContext);
const getCircles=async()=>{
  const schoolCircles= await getSchoolCircles(schoolId);
  return(schoolCircles);  
 }
const {data,isLoading} =useQuery("schoolCircles",getCircles); 
console.log(data);
 if(isLoading){
  return <Loader/>
}
  // دالة تحديث النص المدخل في خانة البحث
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // دالة تحديث فلتر الجنس
  const handleGenderFilter = (e) => {
    setGenderFilter(e.target.value);
  };

  // دالة تحديث فلتر نوع الحلقة
  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };


  // تصفية الحلقات بناءً على جميع الفلاتر
  const filteredCircles = data?.filter((circle) => {
    const matchesSearch = circle.circleName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter
  ? (genderFilter === "ذكور" && circle.gender === "Male") ||
    (genderFilter === "إناث" && circle.gender === "Female") ||
    (genderFilter === "ذكور و إناث" && circle.gender !== "Male" && circle.gender !== "Female")
  : true;
    const matchesType = typeFilter ? circle.type === typeFilter : true;

     return matchesSearch && matchesType && matchesGender;
  });
  let circleDaysInArabic = (days) => {
    const daysInArabic = {
      sunday: "الأحد",
      monday: "الإثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت",
    };
  
    // تحويل الأيام إلى اللغة العربية والانضمام باستخدام ", "
    return days?.map((day) => daysInArabic[day]).join("، ");
  }; 
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

  return (
    <>
      <div className='d-flex justify-content-between custom-text'>
  {/* خانة البحث */}
  <input
        type="text"
        placeholder="اكتب اسم الحلقة ..."
        value={searchTerm}
        onChange={handleSearch}
        className={`${style.filter}`}
      />

      {/* فلتر الجنس */}
      <select value={genderFilter} onChange={handleGenderFilter} className={`${style.filter}`} >
        <option value="">الجنس (الكل)</option>
        <option value="اناث">إناث</option>
        <option value="ذكور">ذكور</option>
        <option value="ذكور و إناث">ذكور و إناث</option>
      </select>

      {/* فلتر نوع الحلقة */}
      <select value={typeFilter} onChange={handleTypeFilter} className={`${style.filter}`} >
        <option value="">نوع الحلقة (الكل)</option>
        <option value="حفظ ومراجعة">حفظ ومراجعة</option>
        <option value="تثبيت">تثبيت</option>
      </select>
      </div>
    

      {/* عرض الحلقات المطابقة */}
      <div className="container">
        <div className="row row-gap-4">
          {filteredCircles?.length > 0 ? (
            filteredCircles?.map((circle) => (
              <div key={circle?.id} className="col-lg-4">
                <CircleCard
                  circleId={circle?.id}
                  teacherName={circle?.teacherId.userName}
                  name={circle?.circleName}/////
                  type={circle?.type}////
                  gender={circle?.circleGender=="Male"?"ذكور":circle?.circleGender=="Female"?"إناث":"ذكور و إناث"}
                  startTime={formatTimeToArabic(circle?.startTime)}////
                  endTime={formatTimeToArabic(circle?.endTime)}////
                  days={circleDaysInArabic(circle?.days)||"_"}
                  // schoolId={circle?.schoolId}////
                  circleImg={circle?.logo?.secure_url} 
                  //good to join circle ,came from student initial dashboard
                  from={from}
                  studentId={studentId}
                  setStudentInfo={setStudentInfo}
                />
              </div>
            ))
          ) : (
            <Alert message=" لا توجد حلقات مطابقة للبحث!"/> 
          )}
        </div>
      </div>
    </>
  );
}

 
