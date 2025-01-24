import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
/*
 {input.id=="schoolStatus"?<SharedInput_Profiles 
               
               formControlLables:[
            {
                name:"availableforStudent",
                value:formik.values.availableforStudent,
                lable:"متاح للطلاب"
            },
            { 
              name:"availableforTeacher",
              value:formik.values.availableforTeacher,
              lable:"متاح للمعلمين"
            }
          ]
         
*/

export default function SharedInput_Profiles({type='text',id,name,title,value ,onChange,errors,onBlur,touched,disabled = false,formControlLable,formControlLables ,options}) {//Props:destructing==> const{name,type}=props
 //السطر 10 يعني ازا انا كنت عاملة زيارة لهاد الانبوت ومع هيك ضل في اخطاء اظهرلي اياها 
   
 return (
    <> 
    <div className="mb-3 row ">
       <label htmlFor={id} className="col-md-4 col-form-label">{title}</label>
       <div className="col-md-8">
        {/* input: on off */}
         {formControlLable?
         formControlLables?.map((input,index)=>(
          <FormControlLabel key={index} dir="ltr"
          control={
            <Switch
              name={input.name}
              checked={input.value}
              onChange={onChange}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'green', // لون الدائرة عند التفعيل
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'green', // لون الخلفية عند التفعيل
                },
              }}
            />
          }
          label={input.lable}
    />
         )) 
         :
         <>
         {/* input: select options */}
          {type=="select"?
            <select name={name}  id={id}  className="form-control rounded-0 shadow-none" value={value} // ربط القيمة بـ Formik
            onChange={onChange} 
            onBlur={onBlur}>
              {options?.map((option,index)=>( 
                <option key={index} value={option}>{option}</option>  
              ))} 
          </select>
          // input : normal
          :<input disabled={disabled} placeholder={title} type={type} className="form-control rounded-0 shadow-none  " name={name} id={id} value={value} onChange={onChange} onBlur={onBlur}  />
        }
           {touched[name]&&errors[name]&&<p className='text text-danger w-100'>{errors[name]}</p>} 
         </>
         }
        
       </div>
     </div>
    </>
  )
}
