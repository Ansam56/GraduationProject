import React from 'react'
import Dashboard_SubTitle from '../../../pages/dashboardSubTitle/Dashboard_SubTitle'
import CirclesAchaievementsTable from './circlesAchaievementsTable/CirclesAchaievementsTable'
  
//الصفحة الاساسية المربوطة مع الapp.jsx and usersLayout

export default function CirclesAchaievements() {
  return (
  <>
    <Dashboard_SubTitle title=" تقرير انجاز حلقات المدرسة"/>  
    <CirclesAchaievementsTable/>
  </>
  )
}