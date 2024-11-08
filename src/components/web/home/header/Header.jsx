import React from 'react'
import style from './Header.module.css'
// import Shape from '../../img/banner-shape.svg'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className={`${style.header} position-relative mb-5`}>
    {/* <img src={Shape} alt="header_background_shape" className="position-absolute bottom-0 w-100 " /> */}
    {/* <svg className=' position-absolute bottom-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F1ECE1" fill-opacity="1" d="M0,224L48,202.7C96,181,192,139,288,149.3C384,160,480,224,576,250.7C672,277,768,267,864,229.3C960,192,1056,128,1152,90.7C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
    
    <div className={`${style.header_cover} d-flex justify-content-center align-items-center `}>
       <div className={`${style.header_content} `}>
          <div className={`${style.title} text-center  `}>
              <h1>طوبى</h1>
          </div>
          <div className={`${style.description} text-center  `}>
             <h2>منصة إلكترونية لإدارة المدارس القرآنية في فلسطين</h2>
          </div>
          <div className={`${style.typer}  `}>
             <p>الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ طُوبَىٰ لَهُمْ وَحُسْنُ مَآبٍ</p>
          </div>
          
          <div className={`${style.joinBtn} text-center `}> 
          <Link className={`${style.btn} btn `} to="/SchoolForm">
            أنشئ مدرستك القرآنية الآن
          </Link>
          </div>

       </div>
    </div>
   </header>
  )
}
