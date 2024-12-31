import React, { useContext } from 'react'
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle';
// import BasicTabs from '../../pages/basicTabs/BasicTabs';
 
 
import { StudentContext } from '../../context/StudentContext';

export default function StudentProfile() {
    let {studentInfo}=useContext(StudentContext);
   
   return (
      <>
        <Dashboard_SubTitle title="الملف الشخصي" />
 
       </>
    );
}
