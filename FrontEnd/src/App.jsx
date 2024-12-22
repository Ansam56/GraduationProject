import React, { useContext, useEffect} from "react";
import { RouterProvider} from "react-router-dom"; 
import { router } from "./routes.jsx";
import { UserContext } from "./components/context/UserContext.jsx";
import Loader from "./components/pages/loader/Loader.jsx";
 
export default function App() {
 
  //لحل مشكلة ال refresh
  //لما نعمل ريفريش رح تصير القيمة بالاول null
  //بعدين بتيجي هون عالapp وتتحقق
  let {setUserToken}=useContext(UserContext); 
  useEffect(()=>{
   if(localStorage.getItem("userToken")!=null){//اليوزر مسجل دخوله
      setUserToken(localStorage.getItem("userToken"));
   } 
},[])
 
  return<RouterProvider router={router} />;
}

