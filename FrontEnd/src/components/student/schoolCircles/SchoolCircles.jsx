import React, { useContext } from 'react'
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle'
import Circles from '../../web/home/circles/Circles'
import { useParams } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';
import Alert from '../../pages/alert/Alert';

export default function SchoolCircles() {
    const {schoolId}=useParams();
    let {studentInfo,setStudentInfo}=useContext(StudentContext); 

  if(studentInfo?.role==="student"&&studentInfo?.status==="suspend"){
    return <Alert message="شكراً لك على تقديم طلب الانضمام إلى الحلقة! سيتم مراجعة طلبك من قبل المعلم والرد عليك قريباً. نسعد بانضمامك معنا!"/>
  }
  //في حال كان الرول ==يوزر سيتم عرض الحلقات ليتمكن الطالب من الانضمام الى حلقة واحدة فقط 
  return (
    <>
    <Dashboard_SubTitle title="حلقات المدرسة" />
    {/* هاد كومبوننت مشترك ما بشوف غير اليوزر ما بشوف student context
    عشان هيك لازم نبعتله معلومات للطالب من الكونتكست */}
    <Circles schoolId={schoolId} from="initialStudentDashboard" setStudentInfo={setStudentInfo} studentId={studentInfo?._id} />
    </>
  )
}
