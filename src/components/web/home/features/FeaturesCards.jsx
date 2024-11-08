import React from 'react'
import SchoolIcon from "@mui/icons-material/School";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import GroupsIcon from "@mui/icons-material/Groups";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import style from "./FeaturesCards.module.css";

export default function FeaturesCards() {
    const cards=[
        {
          icon:<GroupsIcon sx={{fontSize: 40 }} className={`${style.muiIcon}`} />,
          cardTitle:"إدارة الطلاب والمعلمين",
          cardText:"تشمل كلّ ما يتعلق بالطالب والمعلّم، بداية من التسجيل في المدرسة.. مروراً بكافّة العمليات التّعليمية والإدارية."
        },
        {
          icon:<SchoolIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/> ,
          cardTitle:"إدارة شؤون الحلقات",
          cardText:"تشمل كلّ ما يتعلّق بالحلقات من انشاء الحلقات و إضافة وإسناد  الطّلاب والمعلّمين وغيرها من العمليّات التنظيمية"  
        },
        {
          icon:<PictureAsPdfIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/> ,
          cardTitle:"التقارير",
          cardText:"تقارير كتابية وبيانية شاملة، حول الحلقات والحفظ والمراجعة والحضور والغياب، يستفيد منها المشرف والمعلّم وكذلك الطالب"  
        },
        {
          icon:<PodcastsIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/> ,
          cardTitle:"إدارة الأخبار والإعلانات",
          cardText:"يمكن ادارة الأخبار المتعلّقة بالمدرسة، ليكون الطّالب والمعلم ووليّ الأمر على اطّلاع مستمر بكافّة أحداث وفعاليات المدرسة القرآنية."  
        },
      ]
  return (
    <div className="container ">
          <div className="row row-gap-4 custom-text">
            {cards.map((card,index)=>
            <div key={index} className="col-lg-4">
              <div className={`${style.card}`}>
                <div className={`${style.cardIcon} st-purple-box`}>
                  {card.icon}
                </div>
                <h2 className={`${style.cardTitle}`}>
                 {card.cardTitle}
                </h2>
                <div className={`${style.cardText}`}>
                  <p>
                  {card.cardText}
                  </p>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
  )
}
