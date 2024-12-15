import React from 'react'
import Dashboard_SubTitle from '../../../pages/dashboardSubTitle/Dashboard_SubTitle';
import StudentDailyAchaievementTable from './studentDailyAchaievementTable/StudentDailyAchaievementTable.jsx';
export default function StudentDailyAchaievements() {
  return (
  <>
    <Dashboard_SubTitle title="تقرير الانجاز اليومي للطالب" />  
    <StudentDailyAchaievementTable/>
  </>
  )
}
