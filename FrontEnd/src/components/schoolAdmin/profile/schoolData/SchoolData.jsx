import React, { useContext, useState } from 'react'
import { SchoolAdminContext } from '../../../context/SchoolAdminContext'
import defaultProfilePicture from '../../../web/img/defaultProfilePicture.png'
import { useFormik } from 'formik';
import SharedInput_Profiles from '../../../pages/sharedInput_profiles/SharedInput_Profiles';
import { Avatar, Box, FormControlLabel, Switch } from '@mui/material';
import { ErrorToast, SuccessToast } from '../../../pages/toast/toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { schoolDataSchema } from '../../../authentication/validation/validate.js';
import { UserContext } from '../../../context/UserContext.jsx';
import axios from 'axios';
//المتبقي : مراجعة الكود مرة اخرى +فالديشن للصورة 
//ضايل اعمل كود مشترك لكل البروفايلات 
/*
//address:"Tulkarm"
//createdAt:"2024-12-24T19:58:42.553Z"
//id:"676b1272649b41cff135cc38"
//schoolAdminId:"676b1271649b41cff135cc33"
//schoolInfo:"null"
//schoolName:"ملتقى خضوري"
//schoolPhoto:"null"
//status:"active"
// updatedAt:"2024-12-24T19:58:42.553Z"
//__v:0
//_id:"676b1272649b41cff135cc38"
availableToStudents=false
availableToTeachers =false
*/
export default function SchoolData() {
    let {schoolInfo,setSchoolInfo}=useContext(SchoolAdminContext);
 let {userToken}=useContext(UserContext);
        // حالة لحفظ الصورة المعروضة
    const [previewImage, setPreviewImage] = useState(schoolInfo?.schoolPhoto.secure_url );
     const handleFieldChange=(event)=>{
      const file = event.target.files[0];
      if (file) {
          // إنشاء رابط مؤقت للصورة
          const imageUrl = URL.createObjectURL(file);
          //لليوزر
          setPreviewImage(imageUrl); // عرض الصورة مباشرة
          //للباك
          formik.setFieldValue('schoolPhoto', file); // حفظ الملف في الـ Formik
      }  
    }
   const handleRemovePicture = () => {
        //لليوزر
        setPreviewImage(defaultProfilePicture); // إعادة الصورة الافتراضية 
       //للباك
        formik.setFieldValue('schoolPhoto', "null"); // حذف الصورة من الـ Formik
    };
    
    const initialValues= {
      _id:schoolInfo?._id,

      schoolName: schoolInfo?.schoolName,
      address: schoolInfo?.address,
      schoolPhoto:schoolInfo?.schoolPhoto.secure_url  ,
      // schoolPhoto:"null" =="null"&& defaultProfilePicture|| schoolInfo?.schoolPhoto.secure_url ,//null or file
      availableToStudents:schoolInfo?.availableToStudents||false,
      availableToTeachers:schoolInfo?.availableToTeachers||false,

      createdAt:schoolInfo?.createdAt,
      updatedAt:schoolInfo?.updatedAt,
      
    }
     const onSubmit=async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
      //استعملت طريقة الفورم داتا عشان الملفات ما بزبط نرفعها بالطريقة المباشرة والعادية للباكإند
      //الباك والفرونت بستعملو الفورم داتا 
      //عشان هيك انا هون بغلف البيانات باشي اسمه فورم داتا 
      //فهو عبارة عن اوبجيكت فاضي
         const formData = new FormData();
        //  formData.append("_id",values._id);
         formData.append("schoolName",values.schoolName);
         formData.append("address", values.address);
         formData.append("schoolPhoto",values.schoolPhoto);
         formData.append("availableToStudents",values.availableToStudents);
         formData.append("availableToTeachers",values.availableToTeachers);

        try{
          const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/schoolAdmin/updateSchool`,formData,
            {headers:{Authorization:`Tuba__${userToken}` }}
           );  
           console.log(data);
           setSchoolInfo(data.school);
             SuccessToast("تم تعديل البيانات بنجاح");
        }catch(error){

        }
       
      
     }
    const formik =useFormik({
           initialValues, 
           onSubmit,
           //سيتم ارسال معولمات اخرى كما بالاعلى بالكومينت
           validationSchema:schoolDataSchema //لازمها تشييك ولازم افصلها
       });
   
     const Inputs = [
      {
        id: "createdAt",
        type: "text",
        name: "createdAt",
        title: "تاريخ الانشاء",
        value: formik.values.createdAt,
        disabled: true,
      } ,
       {
        id: "updatedAt",
        type: "text",
        name: "updatedAt",
        title: "آخر تعديل تم في تاريخ",
        value: formik.values.createdAt,
        disabled: true,
      } ,
        {
          id: "schoolName",
          type: "text",
          name: "schoolName",
          title: "اسم المدرسة",
          value: formik.values.schoolName,
        },
        {
          id: "address",
          type: "text",
          name: "address",
          title: "العنوان",
          value: formik.values.address,
        }  
      ];
     const renderInputs= Inputs.map((input,index)=>//array
          <SharedInput_Profiles
           id={input.id}
           type={input.type}
           name={input.name}
           title={input.title}
           value={input.value} 
           errors={formik.errors} 
          // // onChange={input.onChange ||formik.handleChange}
           onChange={formik.handleChange}//هون في خيارين يا اما خيار الصورة او الانبوت العادي
           //formik.handleChange>>
           //  عشان اقدر اشوف الحروف اللي بكتبها بالانبوت على الشاشة 1)(from me )
           //2 . (لما يصير في تغيير عالانبوت بروح بسندهم للانيشيال فاليو اللي دبعتهم عالباك (اول بأول
           onBlur={formik.handleBlur}//لتتبع الحقول التي تمت زيارتها ..الزيارة=لمس الانبوت والضغط على اي مكان بالصفحة خارج الانبوت
           touched={formik.touched}//لتخزين الاماكن اللي قمنا بزيارتها ورح يتم اعتبارها ترو فقط لما اطلع من الانبوت 
           key={index}
           disabled={input.disabled} />
           )
  return (
    <> 
    <div > 
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" >
        <div className="container">
          <div className="row"> 
             <div className="col-md-4  ">
             <Box  mb={3}>
                                    <Avatar
                                        src={previewImage}
                                        alt="School Picture"
                                        sx={{
                                            width: 200,
                                            height: 200,
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            marginBottom: '10px',
                                            border: '2px solid #ddd', // تحسين الحواف
                                            borderRadius: '50%', // مظهر دائري
                                        }} 
                                    /> 
                                </Box> 
                                {/* تعديل الصورة */}
                                <div className="d-flex justify-content-start me-3">
                                    <label htmlFor="schoolPhoto" className="btn btn-primary btn-sm  w-50 ">
                                        <EditIcon/> تعديل الصورة  
                                    </label>
                                  
                                    <input type="file" className=" d-none " name="schoolPhoto" id="schoolPhoto"   onChange={handleFieldChange} onBlur={formik.handleBlur}  />
                                    {formik.touched["schoolPhoto"]&&formik.errors["schoolPhoto"]&& ErrorToast(formik.errors["schoolPhoto"]) } 
                                     
                                </div>
                                 {/* حذف الصورة */}
                                 <div className="d-flex justify-content-start me-3 mt-2  ">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm w-50"
                                        onClick={handleRemovePicture}
                                        disabled={previewImage==defaultProfilePicture?true:false} // Disable if profilePicture is null
                                    >
                                        <DeleteIcon/> حذف الصورة
                                    </button>
                                </div>
                                 
            </div>
            <div className="col-md-8">
            {renderInputs} 
            <div className="mb-3 row ">
            <label  className="col-md-4 col-form-label  ">حالة المدرسة</label>
            <div className="col-md-8">
            <FormControlLabel
            dir="ltr"
                  control={
                    <Switch
                      name="availableToStudents"
                      checked={formik.values.availableToStudents}
                      onChange={formik.handleChange}
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
                  label="متاح للطلاب"
            />
                <FormControlLabel
                dir="ltr"
                  control={
                    <Switch
                      name="availableToTeachers"
                      checked={formik.values.availableToTeachers}
                      onChange={formik.handleChange}
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
                  label="متاح للمعلمين"
                />
            </div>
            </div>
         
            </div>
          </div>
          <div className='d-flex justify-content-center mt-3'> 
                 <button className='rounded-5 border-1 w-50 btn  btn-success ' type='submit' disabled={!formik.isValid}>حفظ التعديلات</button> 
              </div>
        </div>
  
  </form> 
    </div>
  </>
  )
}
