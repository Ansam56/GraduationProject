import { Divider } from '@mui/material'
import React from 'react'
import style from './Dashboard_SubTitle.module.css'

export default function Dashboard_SubTitle({title}) {
  return (
  <>
    <h2 className={`${style.title}`}>{title}</h2>
    <Divider className={`${style.divider} mb-5`} />
  </>
  )
}
