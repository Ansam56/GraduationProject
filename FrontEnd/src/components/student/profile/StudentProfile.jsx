import React, { useContext, useState } from 'react'; 
 import { useFormik } from 'formik';
  import axios from 'axios'; 
import Dashboard_SubTitle from './../../pages/dashboardSubTitle/Dashboard_SubTitle';
import SharedInput_Profiles from '../../pages/sharedInput_profiles/SharedInput_Profiles';
import {SuccessToast } from '../../pages/toast/toast';
import SharedProfile from '../../pages/sharedProflle/SharedProfile';
import { StudentContext } from '../../context/StudentContext';
import { UserContext } from '../../context/UserContext';
 
//لازم نشيك على حالة عدم وجود انترنت 
export default function StudentProfile() {
    let {studentInfo,setStudentInfo}=useContext(StudentContext);
    console.log(studentInfo);
    let {userToken,deleteUserPhoto}=useContext(UserContext);
    let [loader,setLoader]=useState(false);
    let [isDefault,setIsDefault]=useState(true);//عشان ايقونة الحذف انها تكون disabled
    
        // حالة لحفظ الصورة المعروضة
    const [previewImage, setPreviewImage] = useState(studentInfo?.profilePicture.secure_url);

    const splitPhoneNumber=(mobile)=>{
        const match=mobile?.match(/^(\+\d+)(\d{9,})$/);   //Regex 
        const phonePrefix = match?match[1]:""; // الجزء الأول (المقدمة)
        const phone = match?match[2]:"";       // الجزء الثاني (رقم الهاتف)
        return { phonePrefix, phone };  
    }
    const { phonePrefix, phone }  = splitPhoneNumber(studentInfo?.mobile);
    const genderInArabic = studentInfo?.gender === "Male" ? "ذكر" : "أنثى";
     
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
    const handleRemovePicture =async() => {
      let {userUpdate} =await deleteUserPhoto();
       if(userUpdate){
          //للباك
          setStudentInfo(userUpdate); 
          //لليوزر
          setPreviewImage(userUpdate?.profilePicture.secure_url);
          SuccessToast("تم حذف الصورة بنجاح");
          setIsDefault(true);
          }
      
       // deleteStudentPhoto();
      //لليوزر
      // setPreviewImage(defaultProfilePicture); // إعادة الصورة الافتراضية 
     //للباك
      // formik.setFieldValue('profilePicture', defaultProfilePicture); // حذف الصورة من الـ Formik
  };

    const initialValues={// المعلومات التي سيتم عرضها لليوزر
        //اسم المدرسة 
        //اسم الحلقة اللي مسجل فيها 
        //تاريخ الميلاد
        userName:studentInfo?.userName,
        idNumber: studentInfo?.idNumber,
        email: studentInfo?.email,
        phonePrefix: phonePrefix,
        phone: phone,
        gender: genderInArabic,
        country:studentInfo?.country,
        profilePicture:studentInfo?.profilePicture.secure_url ,
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
     formData.append("country",values.country);
       formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      try{ 
        setLoader(true);
        const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/student/updateProfile`,formData,
         {headers:{Authorization:`Tuba__${userToken}`}} 
        );
        setLoader(false);
        // console.log("from studeennnnt edit");
        // console.log(data);
        setStudentInfo(data?.student); 
      // console.log(userToken);
    SuccessToast("تم تعديل البيانات بنجاح");
      }catch(error){
        setLoader(false);
       console.log(error);
      }
      
 }
    const formik =useFormik({
        initialValues, 
        onSubmit,
        //سيتم ارسال معولمات اخرى كما بالاعلى بالكومينت
        // validationSchema:schoolAdminDataSchema  //لازمها تشييك ولازم افصلها
    });
    const Inputs = [ 
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
      ];
   
      const renderInputs= Inputs.map((input,index)=>//array
      <SharedInput_Profiles
       id={input.id}
       type={input.type}
       name={input.name}
       title={input.title}
       value={input.value} 
       errors={formik.errors} 
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
      <div > 
      <Dashboard_SubTitle title="الملف الشخصي" />
      
         <SharedProfile
            formikHandelSubmit={formik.handleSubmit}
            renderInputs={renderInputs}
            avatarAlt="Student Picture"
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
       
    
      </div>
    </>
  )
}
