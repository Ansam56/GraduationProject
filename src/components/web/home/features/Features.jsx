import React from "react";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import FeaturesCards from "./FeaturesCards";
 

// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
 
export default function Features() {
 
  return (
    <>
      <SectionTitle title="ميزات الموقع" />

      <section className="featuresSection py-4 mb-5">
        <FeaturesCards/>
      </section>
    </>
  );
}
