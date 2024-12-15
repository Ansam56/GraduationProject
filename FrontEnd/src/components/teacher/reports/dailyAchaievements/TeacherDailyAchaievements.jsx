import React from 'react'
import Dashboard_SubTitle from '../../../pages/dashboardSubTitle/Dashboard_SubTitle';
import TeacherDailyAchaievementsTable from './dailyAchaievementsTable/TeacherDailyAchaievementsTable';
 //الصفحة الاساسية المربوطة مع الapp.jsx
export default function TeacherDailyAchaievements() {
  return (
  <>
    <Dashboard_SubTitle title=" تقرير الانجاز اليومي"/>  
    <TeacherDailyAchaievementsTable/>
  </>
  )
}
