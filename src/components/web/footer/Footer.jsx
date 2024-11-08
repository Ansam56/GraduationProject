import React from 'react'
import style from './Footer.module.css'
import Logo from '../../pages/logo/Logo'
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function Footer() {
  return (
  <footer  >
  <div className="container">
    <div className="row row-gap-3 ">
      <div className="col-md-4 p-0 text-center ">
        <p>© 2025 طوبى~. جميع الحقوق محفوظة.</p>
      </div>
      <div className="col-md-4 p-0 text-center">
        <div className={` mx-auto ${style.logoDiv}`}>
          <Logo/>
        </div>
      </div>
      <div className="col-md-4 p-0 text-center"> 
        <p>طولكرم-فلسطين <span className="text-main-color"> <LocationOnIcon/></span></p>
      </div>
    </div>
  </div>
</footer>

  )
}

