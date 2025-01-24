import React, { useContext, useEffect } from "react";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import Sliderr from '../../../pages/schoolSlider/Sliderr';
import SchoolCards from "./SchoolCards";
import { UserContext } from "../../../context/UserContext";
import Loader from "../../../pages/loader/Loader";
import { useQuery } from "react-query";
//الاساسي

export default function Schools() {
  let {getActiveSchools}=useContext(UserContext);
    const getSchools=async()=>{
      const ActiveSchools= await getActiveSchools();
      return(ActiveSchools);  
     }
    const {data,isLoading} =useQuery("activeSchools",getSchools);
     console.log(data); 
     
     if(isLoading){
      return <Loader/>
    }
  return (
    <>
      <SectionTitle title="المدارس المشاركة" />  
      <Sliderr data={data}  />
    </>
  );
}
