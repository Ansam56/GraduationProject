import React from 'react';
import { useFormik } from 'formik';

export default function AddNewAchievement() {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      sessionName: 'بالقرآن نحيا',
      sessionType: 'حفظ ومراجعة',
      creationDate: '',
      AchaievementType:'',
      startSurah: '',
      endSurah: '',
      pageCount: '',
      listOption: '',
      startVerse: '',
      endVerse: '',
      notes: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('YOUR_BACKEND_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Data saved successfully!');
        } else {
          alert('Error saving data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    },
  });

  return (
    <div className="container">
      <h2>انجاز الطالب/ة :رغد موقدي </h2>
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
          </div>
        </div>
      </div>
 

      {/* Save Data Form Section */}
      <div className="card p-4">
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="AchaievementType" className="form-label">نوع الانجاز</label>
              <select
                id="AchaievementType"
                className="form-select"
                value={formik.values.AchaievementType}
                onChange={formik.handleChange}
              >
                <option value="">اختر نوع الانجاز</option>
                {formik.values.sessionType === 'حفظ ومراجعة' ? (
    <>
      <option value="حفظ">حفظ</option>
      <option value="مراجعة">مراجعة</option>
    </>
  ) : (
    <option value="تثبيت">تثبيت</option>
  )}
               
               
              </select>
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
                <option value="البقرة">البقرة</option>
                <option value="آل عمران">آل عمران</option>
                {/* Add more options as needed */}
              </select>

              <label htmlFor="endSurah" className="form-label mt-3">إلى السورة</label>
              <select
                id="endSurah"
                className="form-select"
                value={formik.values.endSurah}
                onChange={formik.handleChange}
              >
                <option value="">اختر سورة</option>
                <option value="البقرة">البقرة</option>
                <option value="آل عمران">آل عمران</option>
              </select>

              <label htmlFor="pageCount" className="form-label mt-3">عدد الصفحات</label>
              <input
                type="number"
                className="form-control"
                id="pageCount"
                value={formik.values.pageCount}
                onChange={formik.handleChange}
              />

              <label htmlFor="listOption" className="form-label mt-3">القائمة من 10</label>
              <select
                id="listOption"
                className="form-select"
                value={formik.values.listOption}
                onChange={formik.handleChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
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
                <option value="1">1</option>
                <option value="2">2</option>
              </select>

              <label htmlFor="endVerse" className="form-label mt-3">إلى الآية</label>
              <select
                id="endVerse"
                className="form-select"
                value={formik.values.endVerse}
                onChange={formik.handleChange}
              >
                <option value="">اختر آية</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <label htmlFor="notes" className="form-label mt-3">ملاحظات</label>
              <textarea
                id="notes"
                className="form-control"
                rows="4"
                value={formik.values.notes}
                onChange={formik.handleChange}
              />
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
