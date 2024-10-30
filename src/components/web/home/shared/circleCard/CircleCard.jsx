import React from "react";
import { Card } from "react-bootstrap";
import Image from "../../../img/test.jpg";
import style from "./CircleCard.module.css";
import { Link } from "react-router-dom";
//لازم امنع التكرار اكثر
export default function CircleCard({
  id,
  teacherName,
  name,
  type,
  gender,
  availability,
  instructions,
  days,
  time,
}) {
  return (
    <>
      <Card
        style={{ width: "18rem" }}
        className={`${style.card} text-center p-2 m-auto position-relative`}
      >
        <div className={`${style.image_container} `}>
          <Card.Img
            variant="top"
            src={Image}
            alt="circle image"
            className={`${style.img}`}
          />
        </div>
        <Card.Title className="mt-3">{name}</Card.Title>
        <div className="d-flex justify-content-around">
          <span>نوع الحلقة: </span>
          <span>{type}</span>
        </div>
        <div
          className={`${style.overlay} d-flex justify-content-center align-items-center position-absolute top-0 end-0 start-0 bottom-0`}
        >
          <Card.Body className={`text-center ${style.card_body}`}>
            <div className="d-flex justify-content-around">
              <p>اسم المعلم: </p>
              <Card.Text>{teacherName}</Card.Text>
            </div>
            <div className="d-flex justify-content-around">
              <p>الفئة: </p>
              <Card.Text>{gender}</Card.Text>
            </div>
            <div className="d-flex justify-content-around">
              <p>الأيام: </p>
              <Card.Text>{days}</Card.Text>
            </div>
            <div className="d-flex justify-content-around">
              <p>الوقت: </p>
              <Card.Text>{time}</Card.Text>
            </div>

            {/*الرابط عليه شروط يمكن متل هيك :اذا في توكن للطالب نظهرله هالزر وواذا لا ما نظهر  */}
            <div>
              <Link className={`${style.links}`}>الانضمام للحلقة</Link>
            </div>
          </Card.Body>
        </div>
      </Card>

      {/* <div>{availability}</div>
    <div>{instructions}</div> */}
    </>
  );
}
