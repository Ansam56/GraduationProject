// import React from "react";
// import RequestTable from "../../pages/RequestTable/RequestTable";
// import { Box, Container, DialogContentText } from "@mui/material";

// const adminData = [
//   {
//     id: 1,
//     name: "عمر الخطيب",
//     age: "24",
//     school: "ملتقى جامعة فلسطين التقنية-خضوري",
//     city: "طولكرم",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 2,
//     name: "يحيى علي",
//     age: "24",
//     school: "ملتقى جامعة النجاح الوطنية",
//     city: "نابلس",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 3,
//     name: "سلوى الأحمد",
//     age: "24",
//     school: "عمر بن الخطاب",
//     city: "جنين",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 4,
//     name: "عبدالله خالد",
//     age: "24",
//     school: "ملتقى جامعة الخليل",
//     city: "الخليل",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 5,
//     name: "يوسف عبد",
//     age: "24",
//     school: "مدرسة عبدالله بن عباس",
//     city: "طوباس",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 6,
//     name: "احمد محمد ",
//     age: "24",
//     school: "ملتقى الجامعة العربية الأمريكية",
//     city: "جنين",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 7,
//     name: " لؤي جابر",
//     age: "24",
//     school: "مدرسة علي بن ابي طالب",
//     city: "قلقيلية",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 8,
//     name: "أمجد محمد",
//     age: "24",
//     school: "عمر بن الخطاب",
//     city: "جنين",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 9,
//     name: "عبدالله خالد",
//     age: "24",
//     school: "ملتقى جامعة الخليل",
//     city: "الخليل",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 10,
//     name: "داود المصري",
//     age: "24",
//     school: "مدرسة صفوة الحفاظ",
//     city: "نابلس",
//     status: "معلق",
//     phone: "0598973354",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     officialDocument: "omaralkhateeb.pdf",
//     applicationSubmissionDate: "10-02-2025",
//   },
// ];

// const adminColumns = [
//   { title: "اسم المدير", key: "name" },
//   { title: "اسم المدرسة", key: "school" },
//   { title: "العنوان", key: "city" },
//   { title: "تاريخ تقديم الطلب", key: "applicationSubmissionDate" },
//   { title: "حالة الطلب", key: "status" },
//   { title: "التفاصيل", key: "details" },
// ];

// const Admin = () => {
//   const adminActions = {
//     accept: (row) => console.log("Accepted", row),
//     reject: (row) => console.log("Rejected", row),
//   };

//   const renderAdminDialogContent = (request) => (
//     <>
//       <DialogContentText>المدير: {request.name}</DialogContentText>
//       <DialogContentText>العمر: {request.age}</DialogContentText>
//       <DialogContentText>رقم الجوال: {request.phone}</DialogContentText>
//       <DialogContentText>البريد الإلكتروني: {request.email}</DialogContentText>
//       <DialogContentText>رقم الهوية: {request.idNumber}</DialogContentText>
//       <DialogContentText>
//         الوثيقة الرسمية: {request.officialDocument}
//       </DialogContentText>
//     </>
//   );

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       <Container sx={{ padding: 3 }}>
//         <RequestTable
//           columns={adminColumns}
//           data={adminData}
//           actions={adminActions}
//           renderDialogContent={renderAdminDialogContent}
//         />
//       </Container>
//     </Box>
//   );
// };

// export default Admin;


import React, { useContext, useEffect, useState } from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import {
  Box,
  Container,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; 
import Loader from "../../pages/loader/Loader";

const Admin = () => {
  const { userToken, userData } = useContext(UserContext);
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!userToken) return; 
    setLoading(true);
    try {
      const [allSchoolsAdminReq, allSchoolsReq] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/auth/allSchoolsAdminReq`, {
          headers: { Authorization: `Tuba__${userToken}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/auth/allSchoolsReq`, {
          headers: { Authorization: `Tuba__${userToken}` },
        }),
      ]);

      const schoolsAdmins = allSchoolsAdminReq.data.schoolsAdmins;
      const schools = allSchoolsReq.data.schools;

      const mergedData = schools
        .map((school) => {
          const admin = schoolsAdmins.find(
            (admin) => admin._id === school.schoolAdminId
          );

          if (!admin) return null;

          return {
            id: school._id,
            schoolAdminId: school.schoolAdminId,
            userName: admin?.userName || "",
            school: school.schoolName || "",
            address: school.address || "",
            status: statusTranslation[school.status] || "",
            mobile: admin?.mobile || "",
            email: admin?.email || "",
            idNumber: admin?.idNumber || "",
            schoolInfo: school?.schoolInfo || {},
            createdAt: school.createdAt
              ? new Date(school.createdAt).toISOString().split("T")[0]
              : "",
          };
        })
        .filter((item) => item !== null);

      setAdminData(mergedData);
    } catch (error) {
      console.error("Error fetching admin and school requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusTranslation = {
    active: "نشط",
    suspend: "معلق",
    rejected: "مرفوض",
  };

  // Handle accept action
  const handleAccept = async (row) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/updateStatus/${
          row.schoolAdminId
        }`,
        { status: "active" },
        {
          headers: {
            Authorization: `Tuba__${userToken}`, 
          },
        }
      );

      setAdminData((prevData) =>
        prevData.map((item) =>
          item.id === row.id ? { ...item, status: "مقبول" } : item
        )
      );

      toast.success("تم قبول الطلب بنجاح");
    } catch (error) {
      console.error("Error accepting request:", error.response?.data || error);
      toast.error("حدث خطأ أثناء قبول الطلب");
    }
  };

  // Handle reject action
  const handleReject = async (row) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/rejectedReq/${row.schoolAdminId}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Tuba__${userToken}`, 
          },
        }
      );

      setAdminData((prevData) =>
        prevData.map((item) =>
          item.id === row.id ? { ...item, status: "مرفوض" } : item
        )
      );

      toast.success("تم رفض الطلب بنجاح");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("حدث خطأ أثناء رفض الطلب");
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]); 

  if (loading) {
    <Loader />;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Container sx={{ padding: 3 }}>
        <RequestTable
          columns={[
            { title: "اسم المدير", key: "userName" },
            { title: "اسم المدرسة", key: "school" },
            { title: "العنوان", key: "address" },
            { title: "تاريخ تقديم الطلب", key: "createdAt" },
            { title: "حالة الطلب", key: "status" },
            { title: "التفاصيل", key: "details" },
          ]}
          data={adminData}
          actions={{
            accept: handleAccept,
            reject: handleReject,
          }}
          renderDialogContent={(request) => (
            <>
              <DialogContentText>المدير: {request.userName}</DialogContentText>
              <DialogContentText>
                رقم الجوال:{" "}
                <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                  {request.mobile}
                </span>
              </DialogContentText>
              <DialogContentText>
                البريد الإلكتروني:{" "}
                <a
                  href={`mailto:${request.email}`}
                  style={{ textDecoration: "none" }}
                >
                  {request.email}
                </a>
              </DialogContentText>
              <DialogContentText>
                رقم الهوية: {request.idNumber}
              </DialogContentText>
              <DialogContentText>
                الوثيقة الرسمية:{" "}
                {request.schoolInfo.secure_url ? (
                  <a
                    href={request.schoolInfo.secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    عرض الوثيقة
                  </a>
                ) : (
                  "لا توجد وثيقة"
                )}
              </DialogContentText>
            </>
          )}
        />
        <ToastContainer />
      </Container>
    </Box>
  );
};

export default Admin;
