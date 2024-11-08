import React from 'react'
import style from './CommonTopNavSections.module.css'
import SectionTitle from './../../home/shared/sectionTitle/SectionTitle';
import { Link } from 'react-router-dom';


export default function CommonTopNavSections({title}) {
  return (
    <div className={`${style.content} text-center custom-text`}>
         <SectionTitle title={title} /> 
         <h4><Link className={`${style.link}`} to='/'>الرئيسية</Link> &gt; {title} </h4> 
    </div>
  )
}
