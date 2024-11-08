import React from 'react'
import CommonTopNavSections from './common/CommonTopNavSections' 
import SchoolCards from '../home/schools/SchoolCards'; 

export default function SchoolsSP() {
  return (
    <>
    <CommonTopNavSections title="المدارس المشاركة"/>
    <div className="container">
      <div className='d-flex justify-content-evenly flex-wrap gap-4 mt-4 mb-5'> 
          <SchoolCards/>
      </div> 
    </div>
    
    </>
  )
}
