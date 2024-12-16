import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/web/home/Home";
import WebLayout from "./components/web/WebLayout";
import { jwtDecode } from "jwt-decode";
import Login from "./components/authentication/login/Login";
import SendCode from "./components/authentication/sendCode/SendCode";
import ForgetPassword from "./components/authentication/forgetPassword/ForgetPassword";
import ScrollDialog from "./components/web/home/scrollingDialog/ScrollDialog";
import Profile from "./components/schoolAdmin/profile/Profile";
// import PersistentDrawerRight from "./components/schoolAdmin/drawer/PersistentDrawerRight";
import UsersLayout from "./components/pages/UsersLayout";
import TeacherProfile from "./components/teacher/profile/TeacherProfile";
import StudentForm from "./components/forms/StudentForm";
import SchoolForm from "./components/forms/SchoolForm";
import TeacherForm from "./components/forms/TeacherForm";
import Admin from "./components/admin/schoolsRequest/Admin";
import TeachersRequests from "./components/schoolAdmin/TeachersRequests/TeachersRequests";
import StudentsRequests from "./components/teacher/StudentsRequests/StudentsRequests";
import EditProfile from "./components/schoolAdmin/editProfile/EditProfile";
import FeaturesSP from "./components/web/navbarSections/FeaturesSP";
import SchoolsSP from "./components/web/navbarSections/SchoolsSP";
import StatisticsSP from "./components/web/navbarSections/StatisticsSP";
 
import PostForm from "./components/forms/PostForm";
import Posts from "./components/pages/Posts/Posts";
import StudentManagement from "./components/teacher/studentManagement/StudentManagement";
import DefaultTeacherBage from "./components/teacher/defaultTeacherBage/DefaultTeacherBage";
import TeacherDailyAchaievements from "./components/teacher/reports/dailyAchaievements/TeacherDailyAchaievements";
import DefaultStudentBage from "./components/student/defaultStudentBage/DefaultStudentBage";
import StudentDailyAchaievements from "./components/student/reports/dailyAchaievements/StudentDailyAchaievements";
import CertificateForm from "./components/forms/CertificateForm";
import Certificates from "./components/pages/Certificates/Certificates";


export default function App() {
  //استفدت منه باظهار واخفاء جزء من الكود حسب هو مسجل دخوله او لا !
  //استفدت منه بتغيير حالة اليوزر الى نل في حال سجل خروجه
  const [user, setUser] = useState(null);

  //سيتم استدعاءه مرتين من صفحة اللوغ ان ومن اليوز افكت اول ما نعمل ريفريش للصفحة علما بانه بنكون مسجلين دخولنا من قبل
  const saveCurrentUser = () => {
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    console.log(decoded);
    setUser(decoded);
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveCurrentUser();
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout user={user} setUser={setUser} />,
      children: [
        {
          // path :'/',
          index: true,
          element: <Home />,
        },
        {
          path: "SchoolForm",
          element: <SchoolForm />,
        },
        {
          path: "StudentForm",
          element: <StudentForm />,
        },
        {
          path: "TeacherForm",
          element: <TeacherForm />,
        },
        {
          path: "*",
          element: <p className="m-0">Not Found Page</p>,
        },
        {
          path: "login",
          element: <Login saveCurrentUser={saveCurrentUser} />,
        },

        {
          path: "sendCode",
          element: <SendCode />,
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "features",
          element: <FeaturesSP />,
        },
        {
          path: "schools",
          element: <SchoolsSP />,
        },
        {
          path: "statistics",
          element: <StatisticsSP />,
        },
      ],
    },
    {
      path: "/Admin",
      element: <UsersLayout role="admin" />,
      //الشيلدرن بوخدها من الكومبوننت الخاصة بكل يوزر
      children: [
        {
          index: true,
          element: <Admin />,
        },
        {
          path: "*",
          element: <p className="m-0">Not Found Page</p>,
        },
        {
          path: "SchoolRequests",
          element: <Admin />,
        },
      ],
    },
    {
      path: "/SchoolAdmin",
      element: <UsersLayout role="schoolAdmin" />,
      //الشيلدرن بوخدها من الكومبوننت الخاصة بكل يوزر
      children: [
        // {
        //   // path :'/',
        //   index: true,
        //   element: <Home />,
        // },
        {
          path: "*",
          element: <p className="m-0">Not Found Page</p>,
        },
        {
          path: "ProfileSettings",
          element: <Profile />,
        },
        {
          path: "EditProfile",
          element: <EditProfile />,
        },
        {
          path: "TeachersRequests",
          element: <TeachersRequests />,
        },
        {
          path: "PostForm",
          element: <PostForm />,
        },
        {
          path: "Posts",
          element: <Posts />,
        },
      ],
    },
    {
      path: "/Teacher",
      element: <UsersLayout role="teacher" />,
      //الشيلدرن بوخدها من الكومبوننت الخاصة بكل يوزر
      children: [
        {
          // path :'/',
          index: true,
          element: <DefaultTeacherBage/>,
        },
        {
          path: "*",
          element: <p className="m-0">Not Found Page</p>,
        },
        {
          path: "ProfileSettings",
          element: <TeacherProfile />,
        },
        {
          path: "StudentsRequests",
          element: <StudentsRequests />,
        },
        {
          path:"StudentManagement",
          element:<StudentManagement/>
        },
        {
          path:"DailyAchievementReport",
          element:<TeacherDailyAchaievements/>
        },
        {
          path: "CertificateForm",
          element: <CertificateForm />,
        },
        {
          path: "Certificates",
          element: <Certificates />,
        },
      ],
    },
    {
      path: "/Student",
      element: <UsersLayout role="student" />,
      //الشيلدرن بوخدها من الكومبوننت الخاصة بكل يوزر
      children: [
        { // path :'/',
          index: true,
          element: <DefaultStudentBage/>,
        },
        {
          path: "*",
          element: <p className="m-0">Not Found Page</p>,
        } ,
        {
          path:"DailyAchievementReport",
          element:<StudentDailyAchaievements/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
