import React from 'react'
import Schools from './schools/Schools'
import Header from './header/Header'
import Statistics from './statistics/Statistics'
import Features from './features/Features'
import Loader from '../../pages/loader/Loader'
import Contact from './contact/Contact'
export default function Home() {
  return (
   <>
   <Header/>
   <Features/>
   <Statistics/>
   <Schools/>
   <Contact/>
   {/* <Loader/> */}
   </>
  )
}