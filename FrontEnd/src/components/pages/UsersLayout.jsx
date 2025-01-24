import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import PersistentDrawerRight from "./sharedDashboard/PersistentDrawerRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
 
import Logo from "./logo/Logo";
import { SchoolAdminContext } from "../context/SchoolAdminContext";
import { TeacherContext } from "../context/TeacherContext";
import { UserContext } from "../context/UserContext";
import { StudentContext } from "../context/StudentContext"; 
import DescriptionIcon from '@mui/icons-material/Description';
import  HomeIcon  from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PieChartIcon from '@mui/icons-material/PieChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function UsersLayout() {
  let {userData}=useContext(UserContext);

  let SideBarLinks = [];
  let NavTitle = "";
  let SideBarTitle = "";
  let image;

  if (userData?.role === "schoolAdmin") {
    let {schoolAdminInfo,schoolInfo}=useContext(SchoolAdminContext); 
    SideBarLinks = [
      {
        name: "عرض طلبات انضمام المعلمين",
        icon: <GroupAddIcon />,
        target: "/SchoolAdmin/TeachersRequests",
      },
      {
        name: "اعدادات الحساب",
        icon: <SettingsIcon />,
        target: "/SchoolAdmin/ProfileSettings",
      },
      {
        name: "الأخبار",
        icon: <NewspaperIcon/>,
        target: "/SchoolAdmin/posts",
      },
      {
        name:"تقرير انجاز الحلقات",
        icon: <DescriptionIcon />,
        target: "/SchoolAdmin/CirclesAchievementsReport",
      }
      //  {
      //   name:"احصائيات المدرسة",
      //   icon:<InboxIcon />,
      //   target:"/SchoolAdmin/ProfileSettings"
      //   },
    ];
    NavTitle =schoolInfo?.schoolName;
    SideBarTitle = "بوابة الإدارة";
    image=schoolAdminInfo?.profilePicture.secure_url;

  } else if (userData?.role === "teacher") {
    let {circleInfo,teacherInfo,schoolName}=useContext(TeacherContext);
    SideBarLinks = [
      {
        name: "الرئيسية",
        icon: <HomeIcon />,
        target: "/Teacher",
      },
      {
        name: "اعدادات الحساب",
        icon: <SettingsIcon/>,
        target: "/Teacher/ProfileSettings",
      },
      {
        name: "طلبات انضمام الطلاب",
        icon: <GroupAddIcon />,
        target: "/Teacher/StudentsRequests",
      },
      {
        name: "ادارة شؤون الطلاب",
        icon: <SchoolIcon />,
        target: "/Teacher/StudentManagement",
      },
      {
        name: "التقارير", 
        icon: <BarChartIcon />, 
        children: [
          {
            name: "تقرير الانجاز اليومي",
            icon: <DescriptionIcon />,
            target: "/Teacher/DailyAchievementReport",
          } ,
          
        ],
      },
      {
        name: "الاحصاءات",
        // subName: "احصاءات الانجاز ",
        icon: <PieChartIcon/>,
        // target: "/Teacher/DailyAchievementReport",
      },
      {
        name: "الاختبارات",
        icon: <AssignmentIcon />,
        target: "/Teacher/exams",
      },
    ];
    // NavTitle = "ملتقى فلسطين التقنية خضوري > بالقرآن نحيا";
    NavTitle =`${schoolName} > ${circleInfo?.circleName}` ;
    SideBarTitle = "بوابة المعلم";
    image=teacherInfo?.profilePicture.secure_url;
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
    let {studentInfo,circleName,schoolName}=useContext(StudentContext); 
    console.log(studentInfo);
    console.log(userData);
    if(userData?.role==="student" &&userData?.status==="active"){
      SideBarLinks = [
        {
          name: "الرئيسية",
          icon: <HomeIcon />,
          target: "/Student",
        },
        {
          name: "اعدادات الحساب",
          icon: <SettingsIcon />,
          target: "/Student/Profile",
        },
        {
          name: "تقرير الانجاز اليومي",
          icon: <DescriptionIcon />,
          target: "/Student/DailyAchievementReport",
        },
         {
          name: "الاختبارات",
          icon: <AssignmentIcon />,
          target: "/Student/Exams",
        }
      ];
      NavTitle = `${schoolName} > ${circleName}`;
    }else if(userData?.role==="user"||(userData?.role==="student"&&userData?.status==="suspend")){
      SideBarLinks = [
        {
          name: "الرئيسية",
          icon: <HomeIcon />,
          target: "/Student",
        } ,
        {
          //هاي لازم انقلها للطالب الزائر بس مؤقتا رح أشتغلها هون
          name:"حلقات المدرسة",
          icon :<SchoolIcon />,
          target:`/Student/SchoolCircles/${studentInfo?.schoolId}`
        },
         
      ];
      NavTitle = `مرحباً بك في المدرسة القرآنية : ${schoolName} `;
    }
    //from studentInfo
    SideBarTitle = "بوابة الطالب";
    image=studentInfo?.profilePicture.secure_url;
  }

  return (
    <>
      <PersistentDrawerRight
        component={<Outlet />}
        links={SideBarLinks}
        title={NavTitle}
        SideBarTitle={SideBarTitle}
        image={image}
      />
    </>
  );
}
