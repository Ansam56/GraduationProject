import Home from "./components/web/home/Home";
import WebLayout from "./components/web/WebLayout";
import Login from "./components/authentication/login/Login";
import SendCode from "./components/authentication/sendCode/SendCode";
import ForgetPassword from "./components/authentication/forgetPassword/ForgetPassword";
import ScrollDialog from "./components/web/home/scrollingDialog/ScrollDialog";
import Profile from "./components/schoolAdmin/profile/Profile"; 
import UsersLayout from "./components/pages/UsersLayout";
import TeacherProfile from "./components/teacher/profile/TeacherProfile";
import StudentForm from "./components/forms/StudentForm";
import SchoolForm from "./components/forms/SchoolForm";
import TeacherForm from "./components/forms/TeacherForm";
import Admin from "./components/admin/schoolsRequest/Admin";
import TeachersRequests from "./components/schoolAdmin/TeachersRequests/TeachersRequests";
import StudentsRequests from "./components/teacher/StudentsRequests/StudentsRequests";
// import EditProfile from "./components/schoolAdmin/editProfile/EditProfile";
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
import ExamTable from "./components/teacher/exam/ExamTable"; 
import CirclesAchaievements from "./components/schoolAdmin/reports/circlesAchaievements/CirclesAchaievements";
import ExamForm from "./components/forms/ExamForm";
import Exams from "./components/student/Exams/Exams";
import {createBrowserRouter } from "react-router-dom";  
import UserProtectedRoute from "./components/protectedRoute/UserProtectedRoute";
 
import PageNotFound from "./components/pages/PageNotFound";
 
import AuthProtectedRoute from "./components/protectedRoute/AuthProtectedRoute";
import SchoolAdminContextProvider from "./components/context/SchoolAdminContext";
import TeacherContextProvider from "./components/context/TeacherContext";
 

export const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout/>,
      children: [
        {
          // path :'/',
          index: true,
          element: <Home />,
        },
        {
          path: "SchoolForm",
          element: 
          <AuthProtectedRoute>
            <SchoolForm />
          </AuthProtectedRoute>
        },
        {
          path: "StudentForm",
          element: 
          <AuthProtectedRoute>
            <StudentForm />
          </AuthProtectedRoute>
        },
        {
          path: "TeacherForm",
          element:
          <AuthProtectedRoute>
            <TeacherForm />
          </AuthProtectedRoute>
        },
        {
          path: "*",
         element:<PageNotFound/>,
        },
        {
          path: "login",
          element:
          <AuthProtectedRoute>
            <Login/>
          </AuthProtectedRoute>
           
        },

        {
          path: "sendCode",
          element: 
          <AuthProtectedRoute> 
            <SendCode />
          </AuthProtectedRoute> 
        },
        {
          path: "forgetPassword",
          element:
          <AuthProtectedRoute> 
            <ForgetPassword />
          </AuthProtectedRoute>
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
      element:
      <UserProtectedRoute role="admin" >
        <UsersLayout role="admin" />
        {/* الرول هون ممكن تنحذف */}
      </UserProtectedRoute>,
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
      element:
         <UserProtectedRoute role="schoolAdmin">
      <SchoolAdminContextProvider>
            <UsersLayout role="schoolAdmin" />
      </SchoolAdminContextProvider>
         </UserProtectedRoute>,
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
        // {
        //   path: "EditProfile",
        //   element: <EditProfile />,
        // },
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
        {
          path:"CirclesAchievementsReport",
          element:<CirclesAchaievements/>,
        }
      ],
    },
    {
      path: "/Teacher",
      element:
      <UserProtectedRoute role="teacher" >
      <TeacherContextProvider>
        <UsersLayout role="teacher" />
      </TeacherContextProvider>
      </UserProtectedRoute> ,
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
          path: "exams",
          element: <ExamTable />,
        },
        {
          path: "ExamForm",
          element: <ExamForm />,
        },
      ],
    },
    {
      path: "/Student",
      element: 
      <UserProtectedRoute role="student">
        <UsersLayout role="student" />
      </UserProtectedRoute>,
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
        },
       {
          path: "Exams",
          element: <Exams />,
        },
       
      ],
    },
  ]);
