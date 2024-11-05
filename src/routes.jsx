import {createBrowserRouter} from "react-router-dom";
import Home from './components/web/home/Home';
import WebLayout from './components/web/WebLayout';
import Login from './components/web/login/Login';
import SchoolForm from './components/schoolAdmin/form/SchoolForm';
 

// export const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <WebLayout/>,
//       children:[
//         {
//           path:"/home",
//           element: <Home/>
//         },
//         {
//           path:"SchoolForm",
//           element:<SchoolForm/>
//         },
//         {
//           path:"*",
//           element:<p className="m-0">Not Found Page</p>
//         }
//       ]
//     },
//     {
//       path:"/Login",
//       element:<Login/>
//     }
//   ]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout />, // Main layout containing Navbar and Footer
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "SchoolForm",
          element: <SchoolForm />,
        },
        
      ],
    },
  ]);

  export default router;
  