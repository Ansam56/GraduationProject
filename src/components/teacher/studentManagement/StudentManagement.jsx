import React from 'react'
import Dashboard_SubTitle from '../../pages/dashboardSubTitle/Dashboard_SubTitle'
import DataTable from '../../pag../../pages/dataTable/DataTable'


 

export default function StudentManagement() {

  return (
    <>
     <Dashboard_SubTitle title=" ادارة شؤون الطلاب"/> 
     <h4 className='mt-2 text-center'>حلقة بالقرآن نحيا</h4>
     <DataTable/>
    </>
  )
}
