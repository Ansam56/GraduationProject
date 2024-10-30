import React from "react";
// import SectionTitle from "../shared/sectionTitle/SectionTitle";
import style from "./Statistics.module.css";
import MosqueIcon from '@mui/icons-material/Mosque';
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from "@mui/icons-material/School";

export default function Statistics() {
  const cards=[
    {
      icon:<MosqueIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/>,
      cardTitle:"20",
      cardText:"عدد المدارس"
    },
    {
      icon:<GroupsIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/>,
      cardTitle:"200",
      cardText:"عدد الطلاب"  
    },
    {
      icon: <PersonIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/> ,
      cardTitle:"100",
      cardText:"عدد المعلمين"  
    },
    {
      icon:<SchoolIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/> ,
      cardTitle:"60",
      cardText:"عدد الحلقات"  
    },
  ]
  return (
    <>
      {/* <SectionTitle title="احصائيات الموقع" /> */}
      <section className={`${style.statistics} position-relative  py-4`}>
        
        <div className="container">
          <div className="row">
            
          <div className={`col-lg-6 ${style.right_content}`}>
            </div>
            <div className={`col-lg-6 ${style.left_content}`}>
              <div className="row row-gap-4">
              {cards.map((card,index)=>
              <div key={index} className="col-lg-6 ">
              <div className={` ${style.box}`}>
                <div className={`${style.box_icon}`}>
                {card.icon}
                </div>
                <h2 className={`${style.box_title}`}>{card.cardTitle}</h2>
                <div className={`${style.box_text} w-100 text-center`}>
                  <p className="w-100">{card.cardText}</p>
                </div>
              </div>
            </div>
            )}
               
              </div>
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
}
