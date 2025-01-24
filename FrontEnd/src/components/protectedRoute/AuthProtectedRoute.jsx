import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

 

export default function AuthProtectedRoute({children}) {
      
   if(localStorage.getItem("userToken")!=null){
    return <Navigate to='/' />;
   } 
   
  return children
}
