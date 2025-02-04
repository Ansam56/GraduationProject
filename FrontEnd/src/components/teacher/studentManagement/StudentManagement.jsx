import React, { useContext, useEffect, useState } from 'react'
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle'
import DataTable from '../../pag../../pages/dataTable/DataTable'
import { TeacherContext } from '../../context/TeacherContext';
import { useQuery } from 'react-query';
import Loader from '../../pages/loader/Loader';
import { SuccessToast } from '../../pages/toast/toast';

export default function StudentManagement() {
    let {getStudentManagment,students,deleteStudentFromCircle} =useContext(TeacherContext); 
    let [loader,setLoader]=useState(false);

        const getAllStudents=async()=>{
          setLoader(true);
          await getStudentManagment(); 
          setLoader(false);
         }

        const deleteStudent=async(studentId)=>{
            const response= await deleteStudentFromCircle(studentId);
            if(response?.message=="success"){ 
                       SuccessToast("تم حذف الطالب من الحلقة بنجاح");
                       //page refresh 
                       getStudentManagment();
                    } 
        }
   useEffect(()=>{
     getAllStudents();
   },[])
    if(loader){
      return <Loader/>
    }
   return (
    <>
     <Dashboard_SubTitle title=" ادارة شؤون الطلاب"/> 
     <DataTable data={students} deleteStudent={deleteStudent}/> 
    </>
  )
}
