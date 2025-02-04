import React, { useContext, useState } from 'react'
import { SchoolAdminContext } from '../../../context/SchoolAdminContext'
import defaultProfilePicture from '../../../web/img/defaultProfilePicture.png'
import { useFormik } from 'formik';
import SharedInput_Profiles from '../../../pages/sharedInput_profiles/SharedInput_Profiles';
import { Avatar, Box, formControlClasses, FormControlLabel, Switch } from '@mui/material';
import { ErrorToast, SuccessToast } from '../../../pages/toast/toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { schoolDataSchema } from '../../../authentication/validation/validate.js';
import { UserContext } from '../../../context/UserContext.jsx';
import axios from 'axios';
import SharedProfile from '../../../pages/sharedProflle/SharedProfile.jsx';
//المتبقي : مراجعة الكود مرة اخرى +فالديشن للصورة 
//ضايل اعمل كود مشترك لكل البروفايلات 
/* 
availableToStudents=false
availableToTeachers =false
*/
export default function SchoolData() {
 let {schoolInfo,setSchoolInfo}=useContext(SchoolAdminContext);
 let {userToken}=useContext(UserContext);
 let [loader,setLoader]=useState(false);
  
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
  
    const initialValues= {
      _id:schoolInfo?._id,

      schoolName: schoolInfo?.schoolName,
      address: schoolInfo?.address,
      schoolPhoto:schoolInfo?.schoolPhoto.secure_url  ,
      // schoolPhoto:"null" =="null"&& defaultProfilePicture|| schoolInfo?.schoolPhoto.secure_url ,//null or file
      availableforStudent:schoolInfo?.availableforStudent,
      availableforTeacher:schoolInfo?.availableforTeacher,

      // createdAt:new Date(schoolInfo?.createdAt).toLocaleDateString(),
      // updatedAt:new Date(schoolInfo?.updatedAt).toLocaleDateString() ,
      
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
         formData.append("availableforStudent",values.availableforStudent);
         formData.append("availableforTeacher",values.availableforTeacher);

        try{
          setLoader(true);
          const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/schoolAdmin/updateSchool`,formData,
            {headers:{Authorization:`Tuba__${userToken}` }}
           );  
           setLoader(false);
           console.log(data);
           setSchoolInfo(data?.school);
             SuccessToast("تم تعديل البيانات بنجاح");
        }catch(error){
               if (error.response) { 
                if(error.response.data.message==="user not found"){
                ErrorToast("عذرًا، المستخدم غير موجود.");}
                 if(error.response.data.message==="school not found"){
                  ErrorToast("عذرًا،المدرسة غير موجودة.");}
             } else if (error.request) {
                    // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
                    ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
             } else {
                    // خطأ آخر
                    ErrorToast(`حدث خطأ: ${error.message}`); 
            } 
         setLoader(false);
        }
       
      
     }
    const formik =useFormik({
           initialValues, 
           onSubmit,
           //سيتم ارسال معولمات اخرى كما بالاعلى بالكومينت
           validationSchema:schoolDataSchema //لازمها تشييك ولازم افصلها
       });
   
     const Inputs = [
      // {
      //   id: "createdAt",
      //   type: "text",
      //   name: "createdAt",
      //   title: "تاريخ الانشاء",
      //   value: formik.values.createdAt,
      //   disabled: true,
      // } ,
      //  {
      //   id: "updatedAt",
      //   type: "text",
      //   name: "updatedAt",
      //   title: "آخر تعديل تم في تاريخ",
      //   value: formik.values.createdAt,
      //   disabled: true,
      // } ,
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
        }  ,
        { 
          id:"schoolStatus", 
          formControlLable:true,
          title:"حالة المدرسة ",
          formControlLables:
          [
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

        }
      ];
     const renderInputs= Inputs.map((input,index)=>//array
            // {input.id=="schoolStatus"?<SharedInput_Profiles 
            //   id={input.id}  
            //   formControlLable={input.formControlLable}
            //   title={input.title}
            //   formControlLables={input.formControlLables} 
            //   onChange={formik.handleChange}//هون في خيارين يا اما خيار الصورة او الانبوت العادي
            //   key={index}  /> :
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
              disabled={input.disabled}
              formControlLable={input.formControlLable}
              formControlLables={input.formControlLables} 
              />
           
           )
  return (
    <> 
      <SharedProfile
        formikHandelSubmit={formik.handleSubmit}
        renderInputs={renderInputs}
         avatarAlt="School Picture"
         previewImage={previewImage}
       handleFieldChange={handleFieldChange}
       handleBlur={formik.handleBlur}
       pictureErrors={formik.errors["profilePicture"]}
        pictureTouched={formik.touched["profilePicture"]} 
        loader={loader}
       formikIsValid={formik.isValid}
       deleteIcon="false"
        />  
     {/* 
     حالة المدرسةswithch:name,checed,on change,lable ,FormControlLabel=true
      <div className="mb-3 row ">
            <label  className="col-md-4 col-form-label  ">حالة المدرسة</label>
            <div className="col-md-8">
            <FormControlLabel
            dir="ltr"
                  control={
                    <Switch
                      name="availableforStudent"
                      checked={formik.values.availableforStudent}
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
                      name="availableforTeacher"
                      checked={formik.values.availableforTeacher}
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
     */}
  </>
  )
}
