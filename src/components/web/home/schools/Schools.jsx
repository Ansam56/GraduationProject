import React from "react";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SchoolCard from "../shared/schoolCard/SchoolCard";
import style from './Schools.module.css';
import Img1 from '../../img/Ellipse1.png';
import Img2 from '../../img/Ellipse2.png';
import Img3 from '../../img/Ellipse3.png';

//قسم لعرض السلايدر وكل الكاردز
export default function Schools() {

  const cards = [
    {
      title: "ملتقى القرآن الكريم",
      text: "جامعة النجاح الوطنية-نابلس",
      imageUrl: Img3,
      studentNum:"20",
      teacherNum:"4",
      circlesNum:"14"
    }, 
    {
      title: "مدرسة الاتقان لتحفيظ القرآن",
      text: "غزة-الشيخ رضوان",
      imageUrl: Img2,
      studentNum:"30",
      teacherNum:"12",
      circlesNum:"16"
    }, 
    {
      title: "ملتقى القرآن الكريم",
      text: "جامعة فلسطين التقنية خضوري-طولكرم",
      imageUrl: Img1,
      studentNum:"40",
      teacherNum:"22",
      circlesNum:"18"
    },
  ];
  const settings = {
    centerMode: cards.length > 1, // تفعيل centerMode فقط إذا كان هناك أكثر من كارد واحد
    centerPadding: "60px",
    slidesToShow: cards.length > 3 ? 3 : cards.length, // عرض الكاردات المتاحة فقط
    infinite: cards.length > 1, // جعل السلايدر لانهائي فقط إذا كان هناك أكثر من كارد واحد
    speed: 500,
    autoplay: cards.length > 1, // تفعيل التشغيل التلقائي إذا كان هناك أكثر من كارد واحد
    autoplaySpeed: 2000, // مدة الانتقال بين الشرائح (2000 مللي ثانية = 2 ثانية)
 
  };
  return (
    <>
      <SectionTitle title="المدارس المشاركة" />

      <div className={`container ${cards.length ===1? style.single_card :''}`}>
        <div className="slider-container ">
          <Slider {...settings}>
            {cards.map((card, index) => (
              <div key={index} >
                <SchoolCard 
                  title= {card.title}
                  text={card.text}
                  imageUrl={card.imageUrl}
                  studentNum={card.studentNum}
                  teacherNum={card.teacherNum}
                  circlesNum={card.circlesNum}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
