// import React from 'react';
// import { useFormik } from 'formik';
// import { Rating } from '@mui/material';

// export default function AddNewAchievement() {
//   // Initialize Formik
//   const formik = useFormik({
//     initialValues: {
//       sessionName: 'بالقرآن نحيا',
//       sessionType: 'حفظ ومراجعة',
//       creationDate: '',
//       AchaievementType:'',
//       startSurah: '',
//       endSurah: '',
//       pageCount: '',
//       listOption: '',
//       startVerse: '',
//       endVerse: '',
//       notes: ''
//     },
//     onSubmit: async (values) => {
//       try {
//         const response = await fetch('YOUR_BACKEND_URL', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//         });

//         if (response.ok) {
//           alert('Data saved successfully!');
//         } else {
//           alert('Error saving data');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred');
//       }
//     },
//   });

//   return (
//     <div className="container">
//       <h2>انجاز الطالب/ة :رغد موقدي </h2>
//       {/* Header Section */}
//       <div className="card p-4 mb-4">
//         <div className="row g-3">
//           <div className="col-md-4">
//             <label htmlFor="sessionName" className="form-label">اسم الحلقة</label>
//             <input
//               type="text"
//               className="form-control"
//               id="sessionName"
//               value={formik.values.sessionName}
//               disabled
//             />
//           </div>
//           <div className="col-md-4">
//             <label htmlFor="sessionType" className="form-label">نوع الحلقة</label>
//             <input
//               type="text"
//               className="form-control"
//               id="sessionType"
//               value={formik.values.sessionType}
//               disabled
//             />
//           </div>
//           <div className="col-md-4">
//             <label htmlFor="creationDate" className="form-label">تاريخ الإنشاء</label>
//             <input
//               type="date"
//               className="form-control"
//               id="creationDate"
//               value={formik.values.creationDate}
//               onChange={formik.handleChange}
//             />
//           </div>
//         </div>
//       </div>
 

//       {/* Save Data Form Section */}
//       <div className="card p-4">
//         <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="AchaievementType" className="form-label">نوع الانجاز</label>
//               <select
//                 id="AchaievementType"
//                 className="form-select"
//                 value={formik.values.AchaievementType}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">اختر نوع الانجاز</option>
//                 {formik.values.sessionType === 'حفظ ومراجعة' ? (
//     <>
//       <option value="حفظ">حفظ</option>
//       <option value="مراجعة">مراجعة</option>
//     </>
//   ) : (
//     <option value="تثبيت">تثبيت</option>
//   )}
               
               
//               </select>
//           <div className="row g-3">
//             {/* First Column */}
//             <div className="col-md-6">
//               <label htmlFor="startSurah" className="form-label">من السورة</label>
//               <select
//                 id="startSurah"
//                 className="form-select"
//                 value={formik.values.startSurah}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">اختر سورة</option>
//                 <option value="البقرة">البقرة</option>
//                 <option value="آل عمران">آل عمران</option>
//                 {/* Add more options as needed */}
//               </select>

//               <label htmlFor="endSurah" className="form-label mt-3">إلى السورة</label>
//               <select
//                 id="endSurah"
//                 className="form-select"
//                 value={formik.values.endSurah}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">اختر سورة</option>
//                 <option value="البقرة">البقرة</option>
//                 <option value="آل عمران">آل عمران</option>
//               </select>

//               <label htmlFor="pageCount" className="form-label mt-3">عدد الصفحات</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="pageCount"
//                 value={formik.values.pageCount}
//                 onChange={formik.handleChange}
//               />

//               <label htmlFor="listOption" className="form-label mt-3">التقييم</label>
//               {/* <select
//                 id="listOption"
//                 className="form-select"
//                 value={formik.values.listOption}
//                 onChange={formik.handleChange}
//               >
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//               </select> */}
//               <Rating dir="ltr" name="half-rating" defaultValue={2.5} precision={0.5} />
//             </div>

//             {/* Second Column */}
//             <div className="col-md-6">
//               <label htmlFor="startVerse" className="form-label">من الآية</label>
//               <select
//                 id="startVerse"
//                 className="form-select"
//                 value={formik.values.startVerse}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">اختر آية</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//               </select>

//               <label htmlFor="endVerse" className="form-label mt-3">إلى الآية</label>
//               <select
//                 id="endVerse"
//                 className="form-select"
//                 value={formik.values.endVerse}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">اختر آية</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//               </select>

//               <label htmlFor="notes" className="form-label mt-3">ملاحظات</label>
//               <textarea
//                 id="notes"
//                 className="form-control"
//                 rows="4"
//                 value={formik.values.notes}
//                 onChange={formik.handleChange}
//               />
//             </div>
//           </div>

//           <button type="submit" className="btn btn-success mt-4 w-100">
//             إضافة
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////
import React from 'react';
import { useFormik } from 'formik';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import { AddNewAchaievementSchema } from '../../../authentication/validation/validate.js';

export default function AddNewAchievement() {
  const initialValues={
    sessionName: 'بالقرآن نحيا',
    sessionType: 'حفظ ومراجعة',
    creationDate: '',
    achievementType: '',
    startSurah: '',
    endSurah: '',
    pageCount: '',
    rating: 0, // Default value for Rating
    startVerse: '',
    endVerse: '',
    notes: '',
  }
  const onSubmit=async values=>{
    try {
      const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,values);
      if(data.message=='success'){ 
        toast.success('Done', {  
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         });
       }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء الإرسال.');
    }
  }
  // Initialize Formik
  const formik = useFormik({
    initialValues,
    onSubmit ,
    // validationSchema:AddNewAchaievementSchema
  });

  const renderSelectOptions = (options) =>
    options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ));

  return (
    <div className="container">
      <h3 className='mb-3'>إنجاز الطالب/ة: رغد موقدي</h3>
      {/* Header Section */}
      <div className="card p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="sessionName" className="form-label">اسم الحلقة</label>
            <input
              type="text"
              className="form-control"
              id="sessionName"
              value={formik.values.sessionName}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="sessionType" className="form-label">نوع الحلقة</label>
            <input
              type="text"
              className="form-control"
              id="sessionType"
              value={formik.values.sessionType}
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
          <label htmlFor="achievementType" className="form-label">نوع الإنجاز</label>
          <select
            id="achievementType"
            className="form-select"
            value={formik.values.achievementType}
            onChange={formik.handleChange}
          >
            <option value="">اختر نوع الإنجاز</option>
            {formik.values.sessionType === 'حفظ ومراجعة' ? (
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
              <label htmlFor="startSurah" className="form-label">من السورة</label>
              <select
                id="startSurah"
                className="form-select"
                value={formik.values.startSurah}
                onChange={formik.handleChange}
              >
                <option value="">اختر سورة</option>
                {renderSelectOptions([
                  { label: 'البقرة', value: 'البقرة' },
                  { label: 'آل عمران', value: 'آل عمران' },
                ])}
              </select>
              {formik.errors.startSurah && (
                <small className="text-danger">{formik.errors.startSurah}</small>
              )}

              <label htmlFor="endSurah" className="form-label mt-3">إلى السورة</label>
              <select
                id="endSurah"
                className="form-select"
                value={formik.values.endSurah}
                onChange={formik.handleChange}
              >
                <option value="">اختر سورة</option>
                {renderSelectOptions([
                  { label: 'البقرة', value: 'البقرة' },
                  { label: 'آل عمران', value: 'آل عمران' },
                ])}
              </select>
              {formik.errors.endSurah && (
                <small className="text-danger">{formik.errors.endSurah}</small>
              )}

              <label htmlFor="pageCount" className="form-label mt-3">عدد الصفحات</label>
              <input
                type="number"
                className="form-control"
                id="pageCount"
                value={formik.values.pageCount}
                onChange={formik.handleChange}
              />
              {formik.errors.pageCount && (
                <small className="text-danger">{formik.errors.pageCount}</small>
              )}

            
               <label htmlFor="notes" className="form-label mt-3">ملاحظات</label>
              <textarea
                id="notes"
                className="form-control"
                rows="4"
                value={formik.values.notes}
                onChange={formik.handleChange}
              />
                <label htmlFor="rating" className="form-label mt-3">التقييم</label>
              <Rating
                dir="ltr"
                name="rating"
                value={formik.values.rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  formik.setFieldValue('rating', newValue);
                }}
              />
            </div>

            {/* Second Column */}
            <div className="col-md-6">
              <label htmlFor="startVerse" className="form-label">من الآية</label>
              <select
                id="startVerse"
                className="form-select"
                value={formik.values.startVerse}
                onChange={formik.handleChange}
              >
                <option value="">اختر آية</option>
                {renderSelectOptions([
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                ])}
              </select>

              <label htmlFor="endVerse" className="form-label mt-3">إلى الآية</label>
              <select
                id="endVerse"
                className="form-select"
                value={formik.values.endVerse}
                onChange={formik.handleChange}
              >
                <option value="">اختر آية</option>
                {renderSelectOptions([
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                ])}
              </select>

             
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-4 w-100">
            إضافة
          </button>
        </form>
      </div>
    </div>
  );
}
// import React from 'react';
// import { useFormik } from 'formik';
// import { toast } from 'react-toastify';
// import { Rating } from '@mui/material';
// import axios from 'axios';
// import SharedForm from '../sharedForm/SharedForm';
// import Input from '../Input';
// import { AddNewAchievementSchema } from '../../../authentication/validation/validate.js';

// export default function AddNewAchievement() {
//   const initialValues = {
//     sessionName: 'بالقرآن نحيا',
//     sessionType: 'حفظ ومراجعة',
//     creationDate: '',
//     achievementType: '',
//     startSurah: '',
//     endSurah: '',
//     pageCount: '',
//     rating: 0,
//     startVerse: '',
//     endVerse: '',
//     notes: '',
//   };

//   const onSubmit = async (values) => {
//     try {
//       const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/achievements`, values);
//       if (data.message === 'success') {
//         toast.success('تم الحفظ بنجاح!', {
//           position: 'bottom-center',
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: 'light',
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('حدث خطأ أثناء الحفظ.');
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     onSubmit,
//     validationSchema: AddNewAchievementSchema,
//   });

//   const inputs = [
//     {
//       id: 'creationDate',
//       type: 'date',
//       name: 'creationDate',
//       title: 'تاريخ الإنشاء',
//       value: formik.values.creationDate,
//     },
//     {
//       id: 'achievementType',
//       type: 'select',
//       name: 'achievementType',
//       title: 'نوع الإنجاز',
//       value: formik.values.achievementType,
//       options: formik.values.sessionType === 'حفظ ومراجعة'
//         ? [
//             { value: 'حفظ', label: 'حفظ' },
//             { value: 'مراجعة', label: 'مراجعة' },
//           ]
//         : [{ value: 'تثبيت', label: 'تثبيت' }],
//     },
//     {
//       id: 'startSurah',
//       type: 'select',
//       name: 'startSurah',
//       title: 'من السورة',
//       value: formik.values.startSurah,
//       options: [
//         { value: 'البقرة', label: 'البقرة' },
//         { value: 'آل عمران', label: 'آل عمران' },
//       ],
//     },
//     {
//       id: 'endSurah',
//       type: 'select',
//       name: 'endSurah',
//       title: 'إلى السورة',
//       value: formik.values.endSurah,
//       options: [
//         { value: 'البقرة', label: 'البقرة' },
//         { value: 'آل عمران', label: 'آل عمران' },
//       ],
//     },
//     {
//       id: 'pageCount',
//       type: 'number',
//       name: 'pageCount',
//       title: 'عدد الصفحات',
//       value: formik.values.pageCount,
//     },
//     {
//       id: 'startVerse',
//       type: 'select',
//       name: 'startVerse',
//       title: 'من الآية',
//       value: formik.values.startVerse,
//       options: [
//         { value: '1', label: '1' },
//         { value: '2', label: '2' },
//       ],
//     },
//     {
//       id: 'endVerse',
//       type: 'select',
//       name: 'endVerse',
//       title: 'إلى الآية',
//       value: formik.values.endVerse,
//       options: [
//         { value: '3', label: '3' },
//         { value: '4', label: '4' },
//       ],
//     },
//     {
//       id: 'notes',
//       type: 'textarea',
//       name: 'notes',
//       title: 'ملاحظات',
//       value: formik.values.notes,
//     },
//   ];

//   const renderInputs = inputs.map((input, index) => (
//     <Input
//       key={index}
//       id={input.id}
//       type={input.type}
//       name={input.name}
//       title={input.title}
//       value={input.value}
//       options={input.options}
//       errors={formik.errors}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       touched={formik.touched}
//     />
//   ));

//   return (
//     <SharedForm
//       title={'إضافة إنجاز جديد'}
//       formik_handelSubmit={formik.handleSubmit}
//       renderInputs={renderInputs}
//       mainAction={'إضافة'}
//       formik_isValid={formik.isValid}
//       additionalContent={
//         <div className="mt-4">
//           <label htmlFor="rating" className="form-label">التقييم</label>
//           <Rating
//             dir="ltr"
//             name="rating"
//             value={formik.values.rating}
//             precision={0.5}
//             onChange={(event, newValue) => {
//               formik.setFieldValue('rating', newValue);
//             }}
//           />
//         </div>
//       }
//     />
//   );
// }
