import React from 'react'
import CommonTopNavSections from './common/CommonTopNavSections'
import Cards from '../home/statistics/Cards';

export default function StatisticsSP() {
  return (
<React.Fragment >
    <CommonTopNavSections title="الاحصائيات"/>
    <div className= "mt-4 mb-5"> 
    <Cards/>
    </div>
 </React.Fragment>
  )
}
