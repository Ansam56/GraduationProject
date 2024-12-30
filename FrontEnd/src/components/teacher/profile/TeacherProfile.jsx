import React, { useContext } from 'react'
import { TeacherContext } from '../../context/TeacherContext';
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle';
import BasicTabs from '../../pages/basicTabs/BasicTabs';
import TeacherData from './teacherData/TeacherData';
import CircleData from './circleData/CircleData';

export default function TeacherProfile() {
    let {circleInfo,teacherInfo}=useContext(TeacherContext);
   
   return (
      <>
        <Dashboard_SubTitle title="الملف الشخصي" />
        <BasicTabs firstTap="المعلومات الشخصية" firstComponent={<TeacherData/>} secondTap="معلومات الحلقة القرآنية" secondComponent={<CircleData/>} />
      </>
    );
}
