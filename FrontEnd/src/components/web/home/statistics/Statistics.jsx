import React, { useContext } from "react";
// import SectionTitle from "../shared/sectionTitle/SectionTitle";
import style from "./Statistics.module.css";
import Cards from "./statisticsCard/Cards";
import { UserContext } from "../../../context/UserContext";
import { useQuery } from "react-query";
import Loader from "../../../pages/loader/Loader";


export default function Statistics() { 
    let {getTubaStatistics}=useContext(UserContext);
              const getStatistics=async()=>{
                const TubaStatistics= await getTubaStatistics();
               return(TubaStatistics); 
               }
              const {data,isLoading} =useQuery("HomeBgStatistics",getStatistics);  
               if(isLoading){
                return <Loader/>
              }
  return (
    <>
      {/* <SectionTitle title="احصائيات الموقع" /> */}
      <section className={`${style.statistics} position-relative  py-5 mb-5`}>
         <Cards data={data}/> 
      </section>
    </>
  );
}
