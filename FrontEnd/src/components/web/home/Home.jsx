import React, { useContext } from 'react'
import Schools from './schools/Schools'
import Header from './header/Header'
import Statistics from './statistics/Statistics'
import Features from './features/Features' 
import Footer from '../footer/Footer'
import { useMediaQuery } from '@mui/material'
 

export default function Home() {
  const isLargScreen = useMediaQuery('(max-width:1200px)'); // الشاشات الصغيرة أقل من 600px

  return (
   <>
   <Header/>
   <Features/>
   <Statistics/>
   {!isLargScreen && <Schools />} {/* إخفاء Schools إذا كانت الشاشة صغيرة */}
   <Footer/> 
   </>
  )
}