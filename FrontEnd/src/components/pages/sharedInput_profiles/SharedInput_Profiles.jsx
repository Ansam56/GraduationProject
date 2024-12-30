import React from 'react'


export default function SharedInput_Profiles({type='text',id,name,title,value ,onChange,errors,onBlur,touched,disabled = false }) {//Props:destructing==> const{name,type}=props
 //السطر 10 يعني ازا انا كنت عاملة زيارة لهاد الانبوت ومع هيك ضل في اخطاء اظهرلي اياها 
  return (
    <> 
    <div className="mb-3 row ">
       <label htmlFor={id} className="col-md-4 col-form-label">{title}</label>
       <div className="col-md-8">
         <input disabled={disabled} placeholder={title} type={type} className="form-control rounded-0 shadow-none  " name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
         {touched[name]&&errors[name]&&<p className='text text-danger w-100'>{errors[name]}</p>} 
       </div>
     </div>
    </>
  )
}
