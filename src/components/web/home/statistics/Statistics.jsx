import React from "react";
// import SectionTitle from "../shared/sectionTitle/SectionTitle";
import style from "./Statistics.module.css";
import Cards from "./Cards";


export default function Statistics() { 
  return (
    <>
      {/* <SectionTitle title="احصائيات الموقع" /> */}
      <section className={`${style.statistics} position-relative  py-4 mb-5`}>
         <Cards/> 
      </section>
    </>
  );
}
