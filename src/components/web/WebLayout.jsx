import React from 'react'
import Navbar from './navbar/Navbar'
import { Outlet } from 'react-router-dom'
import style from './WebLayout.module.css'

export default function WebLayout({user,setUser}) {
  return (
    <>
    <div className={`${style.content}`}>
    <Navbar user={user} setUser={setUser}/>
    <Outlet/>  
    </div> 
    </> 
  )
}
