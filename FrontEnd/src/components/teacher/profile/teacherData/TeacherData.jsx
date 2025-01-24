import React, { useContext, useState } from 'react' 
 import { useFormik } from 'formik';
 import SharedInput_Profiles from '../../../pages/sharedInput_profiles/SharedInput_Profiles';
 import {SuccessToast } from '../../../pages/toast/toast';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import { TeacherContext } from '../../../context/TeacherContext';
import SharedProfile from '../../../pages/sharedProflle/SharedProfile';
import { teacherDataSchema } from '../../../authentication/validation/validate';

//لازم نشيك على حالة عدم وجود انترنت 
export default function TeacherData() {
  //القيم هدول من الداتا بيس
    let {teacherInfo,setTeacherInfo} =useContext(TeacherContext); 
    let {userToken, deleteUserPhoto}=useContext(UserContext); 
    let [loader,setLoader]=useState(false);
    // حالة لحفظ الصورة المعروضة
    const [previewImage, setPreviewImage] = useState(teacherInfo?.profilePicture.secure_url);
    let [isDefault,setIsDefault]=useState(true);//عشان ايقونة الحذف انها تكون disabled

    const splitPhoneNumber=(mobile)=>{
        const match=mobile?.match(/^(\+\d+)(\d{9,})$/);   //Regex 
        const phonePrefix = match?match[1]:""; // الجزء الأول (المقدمة)
        const phone = match?match[2]:"";       // الجزء الثاني (رقم الهاتف)
        return { phonePrefix, phone };  
    }
    const { phonePrefix, phone }  = splitPhoneNumber(teacherInfo?.mobile);
     const genderInArabic = teacherInfo?.gender === "Male" ? "ذكر" : "أنثى";
     
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
          setIsDefault(false);
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
     
    const handleRemovePicture =async () => {
      let {userUpdate} =await deleteUserPhoto();
        if(userUpdate){
       //للباك 
      setTeacherInfo(userUpdate);
      //لليوزر
      setPreviewImage(userUpdate?.profilePicture.secure_url); 
      SuccessToast("تم حذف الصورة بنجاح");
      setIsDefault(true);
      }
     
      // setPreviewImage(defaultProfilePicture); // إعادة الصورة الافتراضية 
     //للباك
      // formik.setFieldValue('profilePicture', defaultProfilePicture); // حذف الصورة من الـ Formik
  };

    const initialValues={// المعلومات التي سيتم عرضها لليوزر
        // firstName: FirstName,
        // lastName: LastName,
        // _id:schoolAdminInfo?._id,
        userName:teacherInfo?.userName,
        idNumber: teacherInfo?.idNumber,
        email: teacherInfo?.email,
        phonePrefix: phonePrefix,
        phone: phone,
        gender: genderInArabic,
        // password:"", 
        country:teacherInfo?.country,
        profilePicture:teacherInfo?.profilePicture.secure_url,
 } // هدول القيم همي نفسهم اللي رح نوخدهم من اليوزر ونبعتهم بعدين للباك اند للتعديل

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
     formData.append("country",values.country);
     formData.append("profilePicture",values.profilePicture);
    
       formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
    //   try{ 
    //     setLoader(true);
    //     const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/teacher/updateProfile`,formData,
    //      {headers:{Authorization:`Tuba__${userToken}`}});
    //     setLoader(false);
    //     // console.log(data);
    //     //حفظ البيانات بعد التعديل من الباكإند
    //   setTeacherInfo(data?.teacher); 
    // SuccessToast("تم تعديل البيانات بنجاح");
    //   }catch(error){

    //   }
    try{ 
      setLoader(true);
      const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/teacher/updateProfile`,formData,
       {headers:{Authorization:`Tuba__${userToken}` }}
      );
      setLoader(false); 
      setTeacherInfo(data?.teacher);  
      SuccessToast("تم تعديل البيانات بنجاح");
    }catch(error){
      setLoader(false);
    }
      
 }
    const formik =useFormik({
        initialValues, 
        onSubmit,
        //سيتم ارسال معولمات اخرى كما بالاعلى بالكومينت
       validationSchema:teacherDataSchema  
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
          type: "text",
          name: "gender",
          title: "الجنس",
          value: formik.values.gender,
          disabled: true,
        },
        {
          id: "country",
          type: "text",
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
       disabled={input.disabled} 
       options={input.options}/>
       )
       
  return (
    <> 
      <SharedProfile
         formikHandelSubmit={formik.handleSubmit}
         renderInputs={renderInputs}
         avatarAlt="Teacher Picture"
         previewImage={previewImage}
         handleFieldChange={handleFieldChange}
         handleBlur={formik.handleBlur}
         pictureErrors={formik.errors["profilePicture"]}
         pictureTouched={formik.touched["profilePicture"]}
         handleRemovePicture={handleRemovePicture}
         handelDeleteDisabled={formik.values.profilePicture}
         loader={loader}
         formikIsValid={formik.isValid}
         deleteIcon="true"
         isDefault={isDefault}
         /> 
    </>
  )
}

