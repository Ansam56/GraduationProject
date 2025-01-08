import React, { useContext } from 'react'
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle'
import Circles from '../../web/home/circles/Circles'
import { useParams } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';
import Alert from '../../pages/alert/Alert';

export default function SchoolCircles() {
    const {schoolId}=useParams();
     let {studentInfo}=useContext(StudentContext); 

  if(studentInfo?.role==="student"&&studentInfo?.status==="suspend"){
    return <Alert message="شكراً لك على تقديم طلب الانضمام إلى الحلقة! سيتم مراجعة طلبك من قبل المعلم والرد عليك قريباً. نسعد بانضمامك معنا!"/>
  }
  //في حال كان الرول ==يوزر سيتم عرض الحلقات ليتمكن الطالب من الانضمام الى حلقة واحدة فقط 
  return (
    <>
    <Dashboard_SubTitle title="حلقات المدرسة" />
    <Circles schoolId={schoolId} from="initialStudentDashboard" studentId={studentInfo?._id} />
    </>
  )
}
