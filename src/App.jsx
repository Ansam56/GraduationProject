import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/web/home/Home";
import WebLayout from "./components/web/WebLayout.jsx";
import { jwtDecode } from "jwt-decode";
import Login from "./components/authentication/login/Login.jsx";
import SendCode from "./components/authentication/sendCode/SendCode.jsx";
import ForgetPassword from "./components/authentication/forgetPassword/ForgetPassword.jsx";
import ScrollDialog from "./components/web/home/scrollingDialog/ScrollDialog.jsx"; 
import Profile from "./components/schoolAdmin/profile/Profile.jsx";
// import PersistentDrawerRight from "./components/schoolAdmin/drawer/PersistentDrawerRight.jsx";
import UsersLayout from './components/pages/UsersLayout';
import TeacherProfile from "./components/teacher/profile/teacherProfile.jsx";

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
        // {
        //   path:"circles",
        //   element:<ScrollDialog/>
        // }
      ],
    },
    {
      path: "/SchoolAdmin",
      element: <UsersLayout role="schoolAdmin"/>,
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
          element: <Profile/>,
        },

      ],
    },
    {
      path: "/Teacher",
      element: <UsersLayout role="teacher"/>,
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
          element: <TeacherProfile/>,
        },

      ],
    }
  ]);
  return <RouterProvider router={router} />;
}
