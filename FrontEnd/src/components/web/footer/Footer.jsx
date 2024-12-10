import React from 'react'
import style from './Footer.module.css'
import Logo from '../../pages/logo/Logo'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Contact from '../home/contact/Contact';
export default function Footer() {
  return (
  <footer  >
  <div className="container">
    <div className="row row-gap-3 ">
      <div className="col-md-4 p-0 text-center ">
        <p className='custom-text'>© 2025 طوبى~. جميع الحقوق محفوظة.</p>
      </div>
      <div className="col-md-4 p-0 text-center ">
        <div className={` mx-auto ${style.logoDiv}`}>
          <Logo/>
        </div>
        <div className='mt-4 ms-4'>
        <Contact/>
        </div>
      </div>
      <div className="col-md-4 p-0 text-center"> 
        <p className='custom-text'>طولكرم-فلسطين <span className="text-main-color"> <LocationOnIcon/></span></p>
      </div>
    </div>
  </div>
</footer>

  )
}

