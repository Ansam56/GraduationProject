import React from 'react'
import Schools from './schools/Schools.jsx'
import Header from './header/Header.jsx'
import Statistics from './statistics/Statistics.jsx'
import Features from './features/features.jsx'
import Loader from '../../pages/loader/Loader.jsx'
import Contact from './contact/Contact.jsx'
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