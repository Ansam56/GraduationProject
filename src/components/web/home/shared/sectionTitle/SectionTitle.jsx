import React from 'react'
import style from './SectionTitle.module.css'
import Icon from '../../../img/quranIconNew.png'
export default function SectionTitle({title}) {
  return (
 <div className={`${style.top_section} text-center p-4`}>
  <div className={`${style.title}`}>
    <h2>{title}</h2>
    <div className={`${style.title_logo}`}>
     <img  src={Icon} alt="Quran Icon" />
    </div>
  </div>
</div>


  )
}
