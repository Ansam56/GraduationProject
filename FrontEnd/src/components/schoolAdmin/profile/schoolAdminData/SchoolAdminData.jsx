import React, { useContext, useState } from 'react'
import { SchoolAdminContext } from '../../../context/SchoolAdminContext' 
import defaultProfilePicture from "../../../web/img/defaultProfilePicture.png"
import { useFormik } from 'formik';
import { schoolAdminDataSchema } from '../../../authentication/validation/validate';
import SharedInput_Profiles from '../../../pages/sharedInput_profiles/SharedInput_Profiles'; 
import { ErrorToast, SuccessToast } from '../../../pages/toast/toast';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import SharedProfile from '../../../pages/sharedProflle/SharedProfile';
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
    let {userToken,deleteUserPhoto}=useContext(UserContext);  
    let [loader,setLoader]=useState(false);
    let [isDefault,setIsDefault]=useState(schoolAdminInfo?.profilePicture.secure_url=="https://res.cloudinary.com/dff9dgomp/image/upload/v1737492452/default_zcjitd.jpg"?true:false);//عشان ايقونة الحذف انها تكون disabled
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
     
    const handleRemovePicture =async() => {
     let {userUpdate} =await deleteUserPhoto();
     if(userUpdate){
    //للباك
    setSchoolAdminInfo(userUpdate);
    //لليوزر
    setPreviewImage(userUpdate?.profilePicture.secure_url); 
    SuccessToast("تم حذف الصورة بنجاح");
    setIsDefault(true);
    }
    
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
     formData.append("userName",values.userName);
     formData.append("mobile",`${values.phonePrefix}${values.phone}`);
     formData.append("profilePicture",values.profilePicture);
     
       formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      try{ 
        setLoader(true);
        const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/schoolAdmin/updateProfile`,formData,
         {headers:{Authorization:`Tuba__${userToken}` }}
        );
        setLoader(false);
        // console.log(data?.schoolAdmin);
        setSchoolAdminInfo(data?.schoolAdmin); 
        SuccessToast("تم تعديل البيانات بنجاح");
      }catch(error){
        if (error.response) { 
                if(error.response.data.message==="user not found"){
                ErrorToast("عذرًا، المستخدم غير موجود."); 
                 }   
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
          ///يمكن نضطر نحذفها 
          // disabled:loader&&true
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
       options={input.options} />
       )
     
  return (
    <>   
    <SharedProfile
    formikHandelSubmit={formik.handleSubmit}
    renderInputs={renderInputs}
    avatarAlt="School Admin Picture"
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
