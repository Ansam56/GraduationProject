import React from 'react'
import Img1 from '../../img/Ellipse1.png';
import Img2 from '../../img/Ellipse2.png';
import Img3 from '../../img/Ellipse3.png'; 
import SchoolCard from "../shared/schoolCard/SchoolCard";

export default function SchoolCards() {
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
          title: "ملتقى القرآن الكريم",
          text: "جامعة النجاح الوطنية-نابلس",
          imageUrl: Img3,
          studentNum:"20",
          teacherNum:"4",
          circlesNum:"14"
        }, 
        {
          title: "ملتقى القرآن الكريم",
          text: "جامعة النجاح الوطنية-نابلس",
          imageUrl: Img3,
          studentNum:"20",
          teacherNum:"4",
          circlesNum:"14"
        }, 
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
  return ( 
    <>
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
    </>
   
  )
}
