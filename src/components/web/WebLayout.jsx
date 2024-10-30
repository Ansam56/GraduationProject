import React from 'react'
import Navbar from './navbar/Navbar.jsx'
import Footer from './footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import style from './WebLayout.module.css'

export default function WebLayout({user,setUser}) {
  return (
    <>
    <div className={`${style.content}`}>
    <Navbar user={user} setUser={setUser}/>
    <Outlet/> 
    <Footer/>
    </div> 
    </> 
  )
}
