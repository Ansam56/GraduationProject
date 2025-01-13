import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import PersistentDrawerRight from "./sharedDashboard/PersistentDrawerRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Logo from "./logo/Logo";
import { SchoolAdminContext } from "../context/SchoolAdminContext";
import { TeacherContext } from "../context/TeacherContext";
import { UserContext } from "../context/UserContext";
import { StudentContext } from "../context/StudentContext";

export default function UsersLayout() {
  let {userData}=useContext(UserContext);

  let SideBarLinks = [];
  let NavTitle = "";
  let SideBarTitle = "";

  if (userData?.role === "schoolAdmin") {
    let {schoolAdminInfo,schoolInfo}=useContext(SchoolAdminContext);
    
    SideBarLinks = [
      {
        name: "عرض طلبات انضمام المعلمين",
        icon: <InboxIcon />,
        target: "/SchoolAdmin/TeachersRequests",
      },
      {
        name: "اعدادات الحساب",
        icon: <InboxIcon />,
        target: "/SchoolAdmin/ProfileSettings",
      },
      {
        name: "الأخبار",
        icon: <InboxIcon />,
        target: "/SchoolAdmin/posts",
      },
      {
        name:"تقرير انجاز الحلقات",
        icon: <InboxIcon />,
        target: "/SchoolAdmin/CirclesAchievementsReport",
      }
      //  {
      //   name:"احصائيات المدرسة",
      //   icon:<InboxIcon />,
      //   target:"/SchoolAdmin/ProfileSettings"
      //   },
    ];
    NavTitle = schoolInfo?.schoolName ;
    SideBarTitle = "بوابة الإدارة";
    
  } else if (userData?.role === "teacher") {
    let {circleInfo,teacherInfo}=useContext(TeacherContext);
    SideBarLinks = [
      {
        name: "الرئيسية",
        icon: <InboxIcon />,
        target: "/Teacher",
      },
      {
        name: "اعدادات الحساب",
        icon: <InboxIcon />,
        target: "/Teacher/ProfileSettings",
      },
      {
        name: "طلبات انضمام الطلاب",
        icon: <InboxIcon />,
        target: "/Teacher/StudentsRequests",
      },
      {
        name: "ادارة شؤون الطلاب",
        icon: <InboxIcon />,
        target: "/Teacher/StudentManagement",
      },
      {
        name: "التقارير",
        subName: "تقرير الانجاز اليومي",
        icon: <InboxIcon />,
        target: "/Teacher/DailyAchievementReport",
      },
      {
        name: "الاحصاءات",
        subName: "احصاءات الانجاز ",
        icon: <InboxIcon />,
        target: "/Teacher/DailyAchievementReport",
      },
      {
        name: "الاختبارات",
        icon: <InboxIcon />,
        target: "/Teacher/exams",
      },
    ];
    // NavTitle = "ملتقى فلسطين التقنية خضوري > بالقرآن نحيا";
    NavTitle = teacherInfo?.userName;
    SideBarTitle = "بوابة المعلم";
  } else if (userData?.role === "admin") {
    SideBarLinks = [
      {
        name: "ادارة الطلبات",
        icon: <InboxIcon />,
        target: "/Admin/SchoolRequests",
      },
    ];
    NavTitle = "موقع طوبى";
    SideBarTitle = " بوابة المسؤولون";
  } else if (userData?.role === "student"||userData?.role==="user") {
    let {studentInfo}=useContext(StudentContext); 
    console.log(studentInfo);
    console.log(userData);
    if(userData?.role==="student" &&userData?.status==="active"){
      SideBarLinks = [
        {
          name: "الرئيسية",
          icon: <InboxIcon />,
          target: "/Student",
        },
        {
          name: "الملف الشخصي",
          icon: <InboxIcon />,
          target: "/Student/Profile",
        },
        {
          name: "تقرير الانجاز اليومي",
          icon: <InboxIcon />,
          target: "/Student/DailyAchievementReport",
        },
         {
          name: "الاختبارات",
          icon: <InboxIcon />,
          target: "/Student/Exams",
        }
      ];
     
    }else if(userData?.role==="user"||(userData?.role==="student"&&userData?.status==="suspend")){
      SideBarLinks = [
        {
          name: "الرئيسية",
          icon: <InboxIcon />,
          target: "/Student",
        } ,
        {
          //هاي لازم انقلها للطالب الزائر بس مؤقتا رح أشتغلها هون
          name:"حلقات المدرسة",
          icon :<InboxIcon />,
          target:`/Student/SchoolCircles/${studentInfo?.schoolId}`
        }
      ];
     
    }
    //from studentInfo
    NavTitle = "ملتقى فلسطين التقنية خضوري > حلقة بالقرآن نحيا";
    SideBarTitle = "بوابة الطالب";
  }

  return (
    <>
      <PersistentDrawerRight
        component={<Outlet />}
        links={SideBarLinks}
        title={NavTitle}
        SideBarTitle={SideBarTitle}
      />
    </>
  );
}
