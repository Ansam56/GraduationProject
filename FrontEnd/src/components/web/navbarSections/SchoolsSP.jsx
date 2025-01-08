import React, { useContext } from 'react'
import CommonTopNavSections from './common/CommonTopNavSections' 
import SchoolCards from '../home/schools/SchoolCards'; 
import Footer from '../footer/Footer';
import SchoolCard from '../home/shared/schoolCard/SchoolCard';
import { UserContext } from '../../context/UserContext';
import { useQuery } from 'react-query';
import Loader from '../../pages/loader/Loader';

export default function SchoolsSP() {
   let {getActiveSchools}=useContext(UserContext);
      const getSchools=async()=>{
        const ActiveSchools= await getActiveSchools();
        return(ActiveSchools);  
       }
      const {data,isLoading} =useQuery("activeSchools",getSchools); 
     
       if(isLoading){
        return <Loader/>
      }
  return (
    <>
    <CommonTopNavSections title="المدارس المشاركة"/>
    <div className="container">
      <div className='d-flex justify-content-evenly flex-wrap gap-4 mt-4 mb-5'> 
        {data?.length > 0?(
           data?.map((card, index) => (
            <div key={index} >
                <SchoolCard 
                           title= {card.schoolName}
                           text={card.address}
                           imageUrl={card.schoolPhoto.secure_url}
                           studentNum={card.totalStudents}
                           teacherNum={card.totalTeachers}
                           circlesNum={card.totalCircles}
                           schoolId={card.id}
                           availableforTeacher={card.availableforTeacher}
                           availableforStudent={card.availableforStudent}
                         />
            </div>
          ))
        ):<div className="alert alert-info text-center mt-2 w-100" role="alert">
        لا يوجد مدارس لعرضها!
      </div>} 
            
      </div> 
    </div>
    <Footer/>
    
    </>
  )
}
