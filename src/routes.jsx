import {createBrowserRouter} from "react-router-dom";
import Home from './components/web/home/Home.jsx';
import WebLayout from './components/web/WebLayout.jsx';
import Login from './components/web/login/Login';
 

export const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout/>,
      children:[
        {
          path:"home",
          element: <Home/>
        },
        {
          path:"*",
          element:<p className="m-0">Not Found Page</p>
        }
      ]
    },
    {
      path:"/Login",
      element:<Login/>
    }
  ]);
  