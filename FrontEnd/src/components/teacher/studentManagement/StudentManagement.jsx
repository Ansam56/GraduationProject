import React from 'react'
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle'
import DataTable from '../../pag../../pages/dataTable/DataTable'
 


 

export default function StudentManagement() {

  return (
    <>
     <Dashboard_SubTitle title=" ادارة شؤون الطلاب"/> 
     {/* <h3 className='mt-3 text-center'>حلقة بالقرآن نحيا</h3> */}
     <DataTable/>
    </>
  )
}
