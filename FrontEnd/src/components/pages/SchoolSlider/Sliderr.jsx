import React, { useContext } from 'react'
import style from './Sliderr.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import SchoolCard from "../../web/home/shared/schoolCard/SchoolCard";
import Alert from '../alert/Alert';
  
export default function Sliderr({data}) {
    //فيما بعد رح نجيب قيمتها من الكونتكست 
    //لان المدارس رح تيجي من الباك
   //data:{{....}}
    // تصفية البيانات لإظهار الكروت المتاحة فقط
 
    const settings = {
        centerMode: data?.length > 1, // تفعيل centerMode فقط إذا كان هناك أكثر من كارد واحد
        centerPadding: "60px",
        slidesToShow: data?.length > 3 ? 3 : data?.length, // عرض الكاردات المتاحة فقط
        infinite: data?.length > 1, // جعل السلايدر لانهائي فقط إذا كان هناك أكثر من كارد واحد
        speed: 500,
        autoplay: data?.length > 1, // تفعيل التشغيل التلقائي إذا كان هناك أكثر من كارد واحد
        autoplaySpeed: 2000, // مدة الانتقال بين الشرائح (2000 مللي ثانية = 2 ثانية)
        
      };
  
  return (
    <div className={`container ${data?.length ===1? style.single_card :''} mb-5`}>
    <div className="slider-container ">
      {data?.length > 0?(
 <Slider {...settings}>
 {/* مكرر */}
{data?.map((card, index) => (
 <div key={index} >
   <SchoolCard 
     title= {card.schoolName}
     text={card.address}
     imageUrl={card.schoolPhoto.secure_url}
     studentNum={card.totalStudents}
     teacherNum={card.totalTeachers}
     circlesNum={card.totalCircles}
     schoolId={card.id}
     availableforTeacher={card.availableforTeacher}
     availableforStudent={card.availableforStudent}
   />
 </div>
))}
</Slider>

      ):<Alert message=" لا يوجد مدارس لعرضها!"/>  }
      
    </div>
  </div>
  )
}
