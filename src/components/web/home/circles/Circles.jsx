
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CircleCard from "../shared/circleCard/CircleCard";
import style from './Circles.module.css';
//في ما بعد هذه الصفحة سيتم استخدامها في السكرول وفي صفحة الطالب
//وهون بس رح استدعي المتغير الموجود بالكونتكست المخزن فيه ارري اوف اوبجيكت جبتهم من الباك بعد ما طلبتهم من الباك وذلك بالضغط على العدسة عند مدرسة معينة بالهوم بيج مثلا وتلقائيا عند التسجيل كطالب بستدعي فنكشن يجيب حلقات مدرسة معينة وبخزنهم في المتغير عشان اشوفهم هون بشكل متزامن
//يعني وين ما فيه اي دي معين بشتدعي فنكشن من الكونتكست عشان يجيبهم ويخزنهم وهون او باخر محطة عند العرض بجيب هاد المتغير من الكونتكست وبعرض المعلومات
//حاليا رح اعمل شيء محلي وفيما بعد بستبدله مع الباك

export default function Circles() {
   
  // الحالة لحفظ بيانات الحلقات
  const schoolCircles = [
    {
      //الصورة نفسها للكل 
      id: 1,
      teacherName:"خالد عمر",
      name: "انا نبشرك",
      type:"حفظ ومراجعة",
      gender:"ذكور",
      availability:"true",
      instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
      //الايام الاحسن ما تكون تكست
      days:"أحد ثلاثاء خميس",
      time:"4:00-6:00 pm", 
    },
    {
      //الصورة نفسها للكل 
      id: 2,
      teacherName:"رغد موقدي",
      name: "بالقرآن نهتدي",
      type:"تثبيت",
      gender:"اناث",
      availability:"true",
      instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
      days:"أحد ثلاثاء خميس",
      time:"4:00-6:00 pm", 
    },
    {
      //الصورة نفسها للكل 
      id: 3,
      teacherName:"رغد موقدي",
      name: "نور على نور ",
      type:"حفظ ومراجعة",
      gender:"ذكور",
      availability:"true",
      instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
      days:"أحد ثلاثاء خميس",
      time:"4:00-6:00 pm", 
    },
    {
      //الصورة نفسها للكل 
      id: 4,
      teacherName:"رغد موقدي",
      name: "انا نبشرك",
      type:"تثبيت",
      gender:"اناث",
      availability:"true",
      instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
      days:"أحد ثلاثاء خميس",
      time:"4:00-6:00 pm", 
    },
    {
      //الصورة نفسها للكل 
      id: 5,
      teacherName:"رغد موقدي",
      name: "انا نبشرك",
      type:"حفظ ومراجعة",
      gender:"ذكور",
      availability:"true",
      instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
      days:"أحد ثلاثاء خميس",
      time:"4:00-6:00 pm", 
    },
    {
      //الصورة نفسها للكل 
      id: 6,
      teacherName:"رغد موقدي",
      name: "انا نبشرك",
      type:"حفظ ومراجعة",
      gender:"اناث",
      availability:"true",
      instructions:"يجب الالتزام بالتسميع بحيث اذا تم التغيب عن التسميع لأكثر من 4 مرات سيتم الغاء انضمامك للحلقة وسيكون التسميع متاحا بشكل الكتروني ويجب تسميع  مالم يقل عن صفحة واحدة خلال الاسبوع ",
      days:"أحد ثلاثاء خميس",
      time:"4:00-6:00 pm", 
    },
    
    // المزيد من الحلقات
  ];
  // الحالة لحفظ قيم الفلاتر
  
  // حالة (state) لحفظ النص المدخل في خانة البحث
  //لان القيمة فارغة فبالبداية يتم عرض جميع الحلقات
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState(""); // فلتر الجنس
  const [typeFilter, setTypeFilter] = useState(""); // فلتر نوع الحلقة

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
  const filteredCircles = schoolCircles.filter((circle) => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter ? circle.gender === genderFilter : true;
    const matchesType = typeFilter ? circle.type === typeFilter : true;

    return matchesSearch && matchesGender && matchesType;
  });

  return (
    <>
      <div className='d-flex justify-content-between'>
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
        <div className="row row-gap-4 ">
          {filteredCircles.length > 0 ? (
            filteredCircles.map((circle) => (
              <div key={circle.id} className="col-lg-4">
                <CircleCard
                  id={circle.id}
                  teacherName={circle.teacherName}
                  name={circle.name}
                  type={circle.type}
                  gender={circle.gender}
                  availability={circle.availability}
                  instructions={circle.instructions}
                  days={circle.days}
                  time={circle.time}
                />
              </div>
            ))
          ) : (
            <p>لا توجد حلقات مطابقة للبحث</p>
          )}
        </div>
      </div>
    </>
  );
}

 
