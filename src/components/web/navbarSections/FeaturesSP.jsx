import React from 'react'
import CommonTopNavSections from './common/CommonTopNavSections'
 import FeaturesCards from '../home/features/FeaturesCards';

export default function FeaturesSP() {
  return (
    <>
       <CommonTopNavSections title="الميزات"/>
       <div className='mt-4 mb-5'> 
       <FeaturesCards/>
       </div>
    </>
  )
}
