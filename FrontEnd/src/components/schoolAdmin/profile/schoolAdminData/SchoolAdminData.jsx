import React, { useContext, useState } from 'react'
import { SchoolAdminContext } from '../../../context/SchoolAdminContext'
import style from './SchoolAdminData.module.css'
import { Avatar, Box, Typography } from '@mui/material';
import defaultProfilePicture from "../../../web/img/defaultProfilePicture.png"
import { useFormik } from 'formik';
import { schoolAdminDataSchema } from '../../../authentication/validation/validate';
import SharedInput_Profiles from '../../../pages/sharedInput_profiles/SharedInput_Profiles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorToast, SuccessToast } from '../../../pages/toast/toast';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
/*
confirmEmail: true
country: سلفيت"
createdAt :"2024-12-24T19:58:41.318Z"
email: "raghadmoqady@gmail.com"
gender: "Female"
idNumber: 112233445
mobile: "+970598973354"
password: "$2a$08$hLFOJ4gWyhrbOKzOBXHLLugn77GcCmHyYIsm1AJ/uvYPulkkQE/.6"
role: "schoolAdmin"
status: "active"
updatedAt: "2024-12-25T08:00:16.174Z"
userName: "رغد موقدي"
__v: 0
_id: "676b1271649b41cff135cc33"
بدي اياها من سحر 
profilePicture:null;

*/
//لازم نشيك على حالة عدم وجود انترنت 
export default function SchoolAdminData() {
    let {schoolAdminInfo,setSchoolAdminInfo} =useContext(SchoolAdminContext); 
    let {userToken}=useContext(UserContext);
 
        // حالة لحفظ الصورة المعروضة
    const [previewImage, setPreviewImage] = useState(schoolAdminInfo?.profilePicture.secure_url);

    const splitPhoneNumber=(mobile)=>{
        const match=mobile?.match(/^(\+\d+)(\d{9,})$/);   //Regex 
        const phonePrefix = match?match[1]:""; // الجزء الأول (المقدمة)
        const phone = match?match[2]:"";       // الجزء الثاني (رقم الهاتف)
        return { phonePrefix, phone };  
    }
    const { phonePrefix, phone }  = splitPhoneNumber(schoolAdminInfo?.mobile);
    const [FirstName, ...LastNameParts] =schoolAdminInfo?schoolAdminInfo.userName.split(" "):["!حدث خطأ",'!حدث خطأ']; // تقسيم النص إلى أجزاء بناءً على الفراغ
    const LastName = LastNameParts.join(" ") ; // تجميع باقي النص كاسم عائلة 
    const genderInArabic = schoolAdminInfo?schoolAdminInfo.gender === "Male" ? "ذكر" : "أنثى":"الجنس";
    // const genderInEnglish=schoolAdminInfo?.gender==="ذكر"?"Male":"Female";
    
    //لازمها  تشييك ضروري والتأكد من الفالديشن للصورة من validate.js
    const handleFieldChange=(event)=>{
      const file = event.target.files[0];
      if (file) {
          // إنشاء رابط مؤقت للصورة
          const imageUrl = URL.createObjectURL(file);
          //لليوزر
          setPreviewImage(imageUrl); // عرض الصورة مباشرة
          //للباك
          formik.setFieldValue('profilePicture', file); // حفظ الملف في الـ Formik
      } 
    }
  //   const handleFieldChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) { 
  //         // إذا كانت الصورة صالحة، عرضها وتحديث القيمة في Formik
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setPreviewImage(reader.result); // عرض الصورة
  //             formik.setFieldValue('profilePicture', file); // تحديث Formik
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };
     
    const handleRemovePicture = () => {
      //لليوزر
      // setPreviewImage(defaultProfilePicture); // إعادة الصورة الافتراضية 
     //للباك
      // formik.setFieldValue('profilePicture', defaultProfilePicture); // حذف الصورة من الـ Formik
  };

    const initialValues={// المعلومات التي سيتم عرضها لليوزر
        // firstName: FirstName,
        // lastName: LastName,
        // _id:schoolAdminInfo?._id,
        userName:schoolAdminInfo?.userName,
        idNumber: schoolAdminInfo?.idNumber,
        email: schoolAdminInfo?.email,
        phonePrefix: phonePrefix,
        phone: phone,
        gender: genderInArabic,
        // password:"", 
        country:schoolAdminInfo?.country,
        profilePicture:schoolAdminInfo?.profilePicture.secure_url ,
 } //هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند 

 const onSubmit=async values=>{//values ممكن تغييرها لاي اسم بدي اياه 
  //استعملت طريقة الفورم داتا عشان الملفات ما بزبط نرفعها بالطريقة المباشرة والعادية للباكإند
  //الباك والفرونت بستعملو الفورم داتا 
  //عشان هيك انا هون بغلف البيانات باشي اسمه فورم داتا 
  //فهو عبارة عن اوبجيكت فاضي
     const formData = new FormData();
    //  formData.append("_id",values._id);
    //  formData.append("email",values.email);///
     formData.append("userName",values.userName);
     formData.append("mobile",`${values.phonePrefix}${values.phone}`);
     formData.append("profilePicture",values.profilePicture);
     
      //  formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });
      try{ 
        const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/schoolAdmin/updateProfile`,formData,
         {headers:{Authorization:`Tuba__${userToken}` }}
        );
        console.log(data);
        setSchoolAdminInfo(data.schoolAdmin);
      // console.log(userToken);
    SuccessToast("تم تعديل البيانات بنجاح");
      }catch(error){

      }
      
 }
    const formik =useFormik({
        initialValues, 
        onSubmit,
        //سيتم ارسال معولمات اخرى كما بالاعلى بالكومينت
        validationSchema:schoolAdminDataSchema  //لازمها تشييك ولازم افصلها
    });
    const Inputs = [
        // {
        //   id: "firstName",
        //   type: "text",
        //   name: "firstName",
        //   title: "الاسم الأول",
        //   value: formik.values.firstName,
        // },
        // {
        //   id: "lastName",
        //   type: "text",
        //   name: "lastName",
        //   title: "اسم العائلة",
        //   value: formik.values.lastName,
        // },
        {
          id: "userName",
          type: "text",
          name: "userName",
          title: "اسم المستخدم",
          value: formik.values.userName,
          disabled: true,
        },
        {
          id: "idNumber",
          type: "text",
          name: "idNumber",
          title: "رقم الهوية",
          value: formik.values.idNumber,
          disabled:true,
        },
        {
          id: "gender",
          type: "select",
          name: "gender",
          title: "الجنس",
          value: formik.values.gender,
          disabled: true,
        },
        {
          id: "country",
          type: "select",
          name: "country",
          title: "المدينة",
          value: formik.values.country, 
          disabled: true,
        }, 
        {
          id: "email",
          type: "email",
          name: "email",
          title: "البريد الإلكتروني",
          value: formik.values.email,
          disabled: true,
        },
      
        {
          id: "phonePrefix",
          type: "select",
          name: "phonePrefix",
          title: "مقدمة الهاتف",
          value: formik.values.phonePrefix,
          options: ["+970", "+972"],
        },
        {
          id: "phone",
          type: "text",
          name: "phone",
          title: "رقم الجوال",
          value: formik.values.phone,
        }
        ,
        // {
        //   id: "password",
        //   type: "password",
        //   name: "password",
        //   title: "كلمة المرور",
        //   value: formik.values.password,
        // }
        ,
        // {
        //   id: "profilePicture",
        //   type: "file",
        //   name: "profilePicture",
        //   title: "تعديل الصورة الشخصية",
        //   onChange:handleFieldChange,
        // },
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
               <div className="col-md-4">
                                <Box  mb={3}>
                                    <Avatar
                                        src={previewImage}
                                        alt="School Admin Picture"
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
                                    <label htmlFor="profilePicture" className="btn btn-primary btn-sm  w-50 ">
                                        <EditIcon/> تعديل الصورة  
                                    </label>
                                  
                                    <input type="file" className=" d-none " name="profilePicture" id="profilePicture"   onChange={handleFieldChange} onBlur={formik.handleBlur}  />
                                    {formik.touched["profilePicture"]&&formik.errors["profilePicture"]&& ErrorToast(formik.errors["profilePicture"]) } 
                                    
                                    {/* <input
                                         
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                     
                                    /> */}
                                </div>
 
                                  {/* حذف الصورة */}
                                  <div className="d-flex justify-content-start me-3 mt-2  ">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm w-50"
                                        onClick={handleRemovePicture}
                                        disabled={!formik.values.profilePicture} // Disable if profilePicture is null
                                    >
                                        <DeleteIcon/> حذف الصورة
                                    </button>
                                </div>
                                  
                </div>
              <div className="col-md-8">
              {renderInputs}  
              </div>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                   <button className='rounded-5 border-1 w-50 btn  btn-success ' type='submit' disabled={!formik.isValid }>حفظ التعديلات</button> 
                </div>
          </div>
    
    </form> 
      </div>
    </>
  )
}
