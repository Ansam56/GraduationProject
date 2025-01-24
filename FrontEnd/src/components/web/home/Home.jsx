import React, { useContext } from 'react'
import Schools from './schools/Schools'
import Header from './header/Header'
import Statistics from './statistics/Statistics'
import Features from './features/Features'
 
import Footer from '../footer/Footer'
 

export default function Home() {
  
  return (
   <>
   <Header/>
   <Features/>
   <Statistics/>
   <Schools/> 
   <Footer/> 
   </>
  )
}