import { Divider } from '@mui/material'
import React from 'react'
import style from './Dashboard_SubTitle.module.css'

export default function Dashboard_SubTitle({title}) {
  return (
  <>
    <legend className={`${style.title}`}>{title}</legend>
    <Divider />
  </>
  )
}
