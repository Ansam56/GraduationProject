import React from 'react'
import style from './Auth.module.css'

export default function Input({type='text',id,name,title,value ,onChange,errors,onBlur,touched}) {//Props:destructing==> const{name,type}=props
 //السطر 10 يعني ازا انا كنت عاملة زيارة لهاد الانبوت ومع هيك ضل في اخطاء اظهرلي اياها 
  return (
    // <>
    // <div className={` mb-2 w-50 ${style.InputDesign}`}>
    //      <label htmlFor={id} className='mb-2' >{title}</label>
    //      <input placeholder={title} type={type} className="form-control rounded-5 shadow-none border-1 p-2 " name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
    //      {touched[name]&&errors[name]&&<p className='text text-danger w-100'>{errors[name]}</p>} 
    // </div>
    // </>
    // <>
    // <div className={` ${style.field_holder} form-floating`}>
    //      <input placeholder='' type={type} className='form-control' name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
    //      <label htmlFor={id} className={`${style.label} bg-none`} >{title}</label>
    //      {touched[name]&&errors[name]&&<p className={`${style.text} alert `}>{errors[name]}</p>} 
    // </div>
    // </>

    <>
    <div className={` ${style.field_holder}`}>
         <input type={type} className='form-control' name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
         <label htmlFor={id} className={`${style.lable}`} >{title}</label>
         {touched[name]&&errors[name]&&<p className={`${style.text} alert `}>{errors[name]}</p>} 
    </div>
    </>
  )
}
