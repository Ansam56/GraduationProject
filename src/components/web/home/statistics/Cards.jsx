import React from 'react'
import MosqueIcon from '@mui/icons-material/Mosque';
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from "@mui/icons-material/School";
import style from "./Cards.module.css";
export default function Cards() {
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
    <div className="container"> 
    <div className={` ${style.content} custom-text`}>
      <div className="row row-gap-12">
      {cards.map((card,index)=>
      <div key={index} className="col-lg-3 ">
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
  )
}
