// import React from 'react'
// import style from './SchoolCard.module.css';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import GroupsIcon from "@mui/icons-material/Groups";
// import PersonIcon from '@mui/icons-material/Person';
// import SchoolIcon from "@mui/icons-material/School";
// import ZoomInIcon from '@mui/icons-material/ZoomIn';
// import { Link } from 'react-router-dom';

// //لازم احط صورة تلقائية للمدرسة
// export default function SchoolCard({ title, text, imageUrl="", studentNum, teacherNum, circlesNum }) {
//   return (
//     <Card style={{ width: '18rem' }} >
//        <div  className={`${style.image_container} position-relative`}>
//            <div title='عرض حلقات المدرسة' className={`${style.overlay}  d-flex justify-content-center align-items-center position-absolute top-0 end-0 start-0 bottom-0 `}>
//            <Link to="/circles" className={`${style.zoomInIcon}`} ><ZoomInIcon sx={{ fontSize: 30 }} /></Link>
//            </div>
//            <Card.Img variant="top" src={imageUrl} alt={title} className={`${style.img}`} />
//        </div>
//     <Card.Body className={`text-center ${style.card_body}`}>
//       <Card.Title>{title}</Card.Title>
//       <Card.Text>{text}</Card.Text>
//       {/* الاحصائيات */}
//       <div className={`d-flex justify-content-around `}>
//           <div className='text-center'>
//           <GroupsIcon sx={{ fontSize: 40 }} className={``}/>
//           <p>{studentNum}</p>
//           </div>
//           <div className='text-center'>
//           <PersonIcon sx={{ fontSize: 40 }} className={``}/>
//           <p>{teacherNum}</p>
//            </div>
//           <div className='text-center'>
//           <SchoolIcon sx={{ fontSize: 40 }} className={``}/>
//           <p>{circlesNum}</p>
//           </div>
//       </div>
//       {/* actions */}
//       <div className='d-flex justify-content-between'>
//       <Link className={`${style.links}`}>الانضمام كمعلم</Link>
//       <Link className={`${style.links}`}>الانضمام كطالب</Link>
//       </div>
//     </Card.Body>
//   </Card>
//   )
// }
import React, { useState } from "react";
import style from "./SchoolCard.module.css";
import Card from "react-bootstrap/Card";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Link } from "react-router-dom";
import ScrollDialog from "../../scrollingDialog/ScrollDialog";
import { Tooltip, Zoom } from "@mui/material";

export default function SchoolCard({
  title,
  text,
  imageUrl = "",
  studentNum,
  teacherNum,
  circlesNum,
}) {
  const [openDialog, setOpenDialog] = useState(false); // حالة للتحكم في فتح وإغلاق الـ Dialog

  const openScroll = () => {
    setOpenDialog(true); // فتح الـ Dialog
  };

  const closeScroll = () => {
    setOpenDialog(false); // إغلاق الـ Dialog
  };

  return (
    <React.Fragment>
      {/* الكارد الذي يحتوي على البيانات */}
      <Card style={{ width: "19rem" }} className=" pt-2 pb-2 custom-text">
        <div className={`${style.image_container} position-relative`}>
        <div
             className={`${style.overlay} d-flex justify-content-center align-items-center position-absolute top-0 end-0 start-0 bottom-0`}
          >
        <Tooltip  TransitionComponent={Zoom} title="عرض حلقات المدرسة">
            <Link onClick={openScroll} className={`${style.zoomInIcon}`}>
              <ZoomInIcon sx={{ fontSize: 30 }} />
            </Link>
       </Tooltip>
          </div>
        
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={title}
            className={`${style.img}`}
          />
        </div>
        <Card.Body className={`text-center ${style.card_body}`}>
          <Card.Title className={`${style.title}`}>{title}</Card.Title>
          <Card.Text className={`${style.text}`}>{text}</Card.Text>
          {/* الإحصائيات */}
          <div className="d-flex justify-content-around">
            <div className="text-center">
              <GroupsIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/>
              <p className={`${style.numbers}`}>{studentNum}</p>
            </div>
            <div className="text-center">
              <PersonIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/>
              <p className={`${style.numbers}`}>{teacherNum}</p>
            </div>
            <div className="text-center">
              <SchoolIcon sx={{ fontSize: 40 }} className={`${style.muiIcon}`}/>
              <p className={`${style.numbers}`}>{circlesNum}</p>
            </div>
          </div>
          {/* الروابط */}
          <div className="d-flex justify-content-between">
            <Link className={`${style.links}`} to="/TeacherForm">
              الانضمام كمعلم
            </Link>
            <Link className={`${style.links}`} to="/StudentForm">
              الانضمام كطالب
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* مكون الـ Dialog */}
      {openDialog && <ScrollDialog open={openDialog} onClose={closeScroll} />}
    </React.Fragment>
  );
}
