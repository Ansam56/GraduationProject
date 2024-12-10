import TubaaLogo from '../../web/img/TubaaLogo.png';
import styles from "./Logo.module.css";
import React from 'react'

export default function Logo() {
  return (
     <>
      <img src={TubaaLogo} alt="Tubaalogo" className={`${styles.img}`}/>
     </>
  )
}
