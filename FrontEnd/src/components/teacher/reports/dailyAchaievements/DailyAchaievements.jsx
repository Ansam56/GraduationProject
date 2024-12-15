import React from 'react'
import Dashboard_SubTitle from './../../../pages/dashboardSubTitle/Dashboard_SubTitle';
import DailyAchaievementsTable from './dailyAchaievementsTable/DailyAchaievementsTable';
 //الصفحة الاساسية 
export default function DailyAchaievements() {
  return (
  <>
    <Dashboard_SubTitle title=" تقرير الانجاز اليومي"/>  
    <DailyAchaievementsTable/>
  </>
  )
}
