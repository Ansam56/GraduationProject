import React from 'react'
import CommonTopNavSections from './common/CommonTopNavSections'
import Cards from '../home/statistics/Cards';
import Footer from '../footer/Footer';

export default function StatisticsSP() {
  return (
<React.Fragment >
    <CommonTopNavSections title="الاحصائيات"/>
    <div className= "mt-4 mb-5"> 
    <Cards/>
    </div>
    <Footer/>
 </React.Fragment>
  )
}
