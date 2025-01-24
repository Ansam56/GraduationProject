import React from 'react'
import CommonTopNavSections from './common/CommonTopNavSections'
 
import Footer from '../footer/Footer';
import Cards from '../home/statistics/statisticsCard/Cards';
import Statistics from '../home/statistics/Statistics';

export default function StatisticsSP() {
  return (
<React.Fragment >
    <CommonTopNavSections title="الاحصائيات"/>
    <div > 
      <Statistics/>
    {/* <Cards/> */}
    </div>
    <Footer/>
 </React.Fragment>
  )
}
