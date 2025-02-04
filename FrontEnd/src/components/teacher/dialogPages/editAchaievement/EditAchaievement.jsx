
import React, { useContext,useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CircularProgress, Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { AddNewAchaievementSchema } from '../../../authentication/validation/validate.js';
import { TeacherContext } from '../../../context/TeacherContext.jsx';
import { UserContext } from '../../../context/UserContext.jsx';
import axios from 'axios';
import { ErrorToast, SuccessToast } from '../../../pages/toast/toast.js';

//from DataTable :student Id & name
/*
اول ما تحمل هاي الصفحة لازم نستدعي فنكشن يجيب السور ويجيب معلومات التقرير اللي اخترته
انشاء متغير لحفظ معلومات التقرير
حفظ بيانات التقرير بهذا المتغير 
وطباعته
ووضعه كقيم اولية بالانبوتس
وتعديل رابط التعديل هون عند الsubmit
ونعمل ريفريش للصفحة ممكن نعمل انه يجيب كل التقاري كمان مرة عشان تبين التعديلات لليوزر امامه 
وخلص 
*/
export default function EditAchaievement({reportId,studentName,onClose}) {
  
 const {circleInfo,getAllSurah,allSurah,getSurahInfo,getReportInfo,getAllTeacherReports} = useContext(TeacherContext);
 const {userToken}=useContext(UserContext);
 const [startVerses,setStartVerses]=useState([]);
 const [endVerses,setEndVerses]=useState([]);
 const [loading,setLoading]=useState(false);
 const [reportInfo,setReportInfo]=useState(null);
console.log(reportInfo);
   const handleSurahChange=async(surahNum,type)=>{
    const surah= await getSurahInfo(surahNum);
    if(type=="startSurah"){
      setStartVerses(surah?.verses);
    }else if(type=="endSurah"){
      setEndVerses(surah?.verses);
    }
   } 
   //from useEffect 
   const getReport=async()=>{
     const report=await getReportInfo(reportId);
     console.log(report);
     setReportInfo(report);
   }
   
  
  const initialValues={
    creationDate: '',
    achievementType: '',
    startSurah: '',
    endSurah: '',
    rating: 0, // Default value for Rating
    startVers: '',
    endVers: '',
    note: '',
  }
  
  const onSubmit=async values=>{
   
    try {
      setLoading(true);
      const {data}= await axios.put(`${import.meta.env.VITE_API_URL}/teacher/editReport/${reportId}`,
        values,
        { headers: {Authorization:`Tuba__${userToken}`} } );
        
     setLoading(false);
      if(data?.message=='success'){ 
        SuccessToast("تم تعديل التقرير بنجاح ");
        getAllTeacherReports();
        onClose();
       }
    } catch (error) {
       if (error.response) {
                ErrorToast(error.response.data.message);
              }else if (error.request){
                // الخطأ بسبب مشكلة في الشبكة (مثل انقطاع الإنترنت)
                ErrorToast("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك."); 
              }
        setLoading(false);  
    }
  }
  // Initialize Formik
  const formik = useFormik({
    initialValues,
    onSubmit ,
    // validationSchema:AddNewAchaievementSchema
  });
  
   useEffect(()=>{
    getAllSurah();
    getReport(); 
    //  getReportInfo(reportId);
   },[])
   useEffect(() => {
    if (reportInfo) {
      formik.setValues({
        creationDate: reportInfo?.creationDate ? new Date(reportInfo.creationDate).toISOString().split('T')[0] : "",
        achievementType: reportInfo.achievementType || "",
        startSurah: reportInfo.startSurah || "",
        endSurah: reportInfo.endSurah || "",
        rating: reportInfo.rating || 0,
        startVers: reportInfo.startVers || "",
        endVers: reportInfo.endVers || "",
        note: reportInfo.note || "",
      });
       
    }
  }, [reportInfo]);
  

  return (
    <div className="container">
      <h3 className='mb-3'>إنجاز الطالب/ة: {studentName}</h3>
      {/* Header Section */}
      <div className="card p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="sessionName" className="form-label">اسم الحلقة</label>
            <input
              type="text"
              className="form-control"
              id="sessionName"
              value={circleInfo?.circleName}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="sessionType" className="form-label">نوع الحلقة</label>
            <input
              type="text"
              className="form-control"
              id="sessionType"
              value={circleInfo?.type}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="creationDate" className="form-label">تاريخ الإنشاء</label>
            <input
              type="date"
              className="form-control"
              id="creationDate"
              value={formik.values.creationDate}
              onChange={formik.handleChange}
            />
            {formik.errors.creationDate && (
              <small className="text-danger">{formik.errors.creationDate}</small>
            )}
          </div>
        </div>
      </div>

      {/* Save Data Form Section */}
      <div className="card p-4 mb-4">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="achievementType" className="form-label ">نوع الإنجاز</label>
          <select
            id="achievementType"
            className="form-select"
            value={formik.values.achievementType}
            onChange={formik.handleChange}
          >
            <option value="">اختر نوع الإنجاز</option>
            {circleInfo?.type === 'حفظ ومراجعة' ? (
              <>
                <option value="حفظ">حفظ</option>
                <option value="مراجعة">مراجعة</option>
              </>
            ) : (
              <option value="تثبيت">تثبيت</option>
            )}
          </select>
          {formik.errors.achievementType && (
            <small className="text-danger">{formik.errors.achievementType}</small>
          )}

          <div className="row g-3">
            {/* First Column */}
            <div className="col-md-6">
              <label htmlFor="startSurah" className="form-label mt-3">من السورة</label>
              <select id="startSurah" className="form-select" value={formik.values.startSurah}
              onChange={(e) => {
               formik.handleChange(e); // تحديث القيمة في Formik 
               const selectedIndex = e.target.selectedIndex ;  
               if (selectedIndex >0) { 
                handleSurahChange(selectedIndex,"startSurah"); // تمرير رقم السورة بعد التحديث
                }else{
                  setStartVerses([]);
                }
              }}>
  <option value="">اختر سورة</option>
  {allSurah?.map((surah, index) => ( 
    <option key={index} value={surah}>{surah}</option>
  ))}
              </select>
              {formik.errors.startSurah && (
                <small className="text-danger">{formik.errors.startSurah}</small>
              )}

              <label htmlFor="endSurah" className="form-label mt-3">إلى السورة</label>
              <select id="endSurah" className="form-select" value={formik.values.endSurah}
                onChange={(e) => {
                  formik.handleChange(e); // تحديث القيمة في Formik 
                  const selectedIndex = e.target.selectedIndex ;  
                  if (selectedIndex >0) { 
                   handleSurahChange(selectedIndex,"endSurah"); // تمرير رقم السورة بعد التحديث
                   }else{
                    setEndVerses([]);
                   }
                 }}
               >
  <option value="">اختر سورة</option>
  {allSurah?.map((surah, index) => ( 
    <option key={index} value={surah}>{surah}</option>
  ))}
              </select>
              {formik.errors.endSurah && (
                <small className="text-danger">{formik.errors.endSurah}</small>
              )}


            </div>

            {/* Second Column */}
            <div className="col-md-6">
              <label htmlFor="startVers" className="form-label mt-3">من الآية</label>
              <select
                id="startVers"
                className="form-select"
                value={formik.values.startVers}
                onChange={formik.handleChange}
              >
                <option value=""> {formik.values.startVers?formik.values.startVers:"اختر آية"}</option>
                {startVerses?.map((verse, index) => ( 
          <option key={index} value={verse}>{verse}</option>
           ))}
              </select>
 
              <label htmlFor="endVers" className="form-label mt-3">إلى الآية</label>
              <select
                id="endVers"
                className="form-select"
                value={formik.values.endVers}
                onChange={formik.handleChange}
              >
                <option value="">{formik.values.endVers?formik.values.endVers:"اختر آية"}</option>
                {endVerses?.map((verse, index) => ( 
          <option key={index} value={verse}>{verse}</option>
           ))}
              </select>

             
            </div>
          </div>
          <label htmlFor="note" className="form-label mt-3">ملاحظات</label>
              <textarea
                id="note"
                className="form-control"
                rows="4"
                value={formik.values.note}
                onChange={formik.handleChange}
              />
                <label htmlFor="rating" className="form-label mt-3">التقييم</label>
              <Rating
               sx={{ direction: "rtl" }}
                name="rating"
                value={formik.values.rating}
                precision={1}
                onChange={(event, newValue) => {
                  formik.setFieldValue('rating', newValue);
                }}
              />
          <button  disabled={loading?true:false} type="submit" className="rounded-5 btn btn-success mt-4 w-100">
              {loading? <CircularProgress  color="inherit" size={20} />:"حفظ التعديلات"}
          </button>
        </form>
      </div>
    </div>
  );
}

