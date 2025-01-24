import React, { useContext, useEffect, useState } from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import {
  Box,
  Container,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";

const studentColumns = [
  { title: "اسم الطالب", key: "name" },
  { title: "الجنس", key: "gender" },
  { title: "العنوان", key: "city" },
  { title: "تاريخ تقديم الطلب", key: "applicationSubmissionDate" },
  { title: "حالة الطلب", key: "status" },
  { title: "التفاصيل", key: "details" },
];

const Student = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken, userData } = useContext(UserContext);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        "https://tuba-temp-1.onrender.com/teacher/allStudentReq",
        {
          headers: { Authorization: `Tuba__${userToken}` },
        }
      );

      console.log(response.data);

      const calculateAge = (birthdate) => {
        const birthDateObj = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
        ) {
          age--;
        }
        return age;
      };

      const formattedData = response.data.students.map((student) => ({
        id: student._id,
        name: student.userName,
        gender: student.gender === "Male" ? "ذكر" : "أنثى",
        age: calculateAge(student.birthDate), // Calculate age dynamically
        city: student.country || "", // Provide default if city is missing
        status: statusTranslation[student.status] || "",
        mobile: student?.mobile || "",
        email: student.email,
        idNumber: student.idNumber || "", // Provide default if idNumber is missing
        applicationSubmissionDate: student.createdAt.split("T")[0], // Format date
      }));
      setStudentData(formattedData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after data fetch or error
    }
  };
  // Map status to Arabic
  const statusTranslation = {
    active: "نشط",
    suspend: "معلق",
    rejected: "مرفوض",
  };

  // Handle accept action
  const handleAccept = async (row) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/teacher/acceptStudent/${row.id}`,
        { status: "active" },
        {
          headers: { Authorization: `Tuba__${userToken}` },
        }
      );

      setStudentData((prevData) =>
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
        `${import.meta.env.VITE_API_URL}/teacher/rejectStudent/${row.id}`,
        { status: "rejected" },
        {
          headers: { Authorization: `Tuba__${userToken}` },
        }
      );

      setStudentData((prevData) =>
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

  // Fetch data on component mount
  useEffect(() => {
    fetchStudentData();
  }, [userToken]);

  const renderStudentDialogContent = (request) => (
    <>
      <DialogContentText>الطالب: {request.name}</DialogContentText>
      <DialogContentText>العمر: {request.age}</DialogContentText>
      <DialogContentText>
        رقم الجوال:{" "}
        <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
          {request.mobile}
        </span>
      </DialogContentText>{" "}
      <DialogContentText>
        البريد الإلكتروني:{" "}
        <a href={`mailto:${request.email}`} style={{ textDecoration: "none" }}>
          {request.email}
        </a>
      </DialogContentText>
      <DialogContentText>رقم الهوية: {request.idNumber}</DialogContentText>
    </>
  );
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Dashboard_SubTitle title="طلبات الانضمام" />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Container sx={{ padding: 3 }}>
          <RequestTable
            columns={studentColumns}
            data={studentData}
            actions={{
              accept: handleAccept,
              reject: handleReject,
            }}
            renderDialogContent={renderStudentDialogContent}
          />
          <ToastContainer />
        </Container>
      </Box>
    </>
  );
};

export default Student;

// import React from "react";
// import RequestTable from "../../pages/RequestTable/RequestTable";
// import { Box, Container, DialogContentText } from "@mui/material";
// import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";

// const studentData = [
//   {
//     id: 1,
//     name: "ريان عبد المجيد",
//     gender: "ذكر",
//     age: "14",
//     city: "نابلس",
//     status: "معلق",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 2,
//     name: "ريان عبد المجيد",
//     gender: "ذكر",
//     age: "14",
//     city: "نابلس",
//     status: "معلق",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 3,
//     name: "ريان عبد المجيد",
//     gender: "ذكر",
//     age: "14",
//     city: "نابلس",
//     status: "معلق",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 4,
//     name: "ريان عبد المجيد",
//     gender: "ذكر",
//     age: "14",
//     city: "نابلس",
//     status: "معلق",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 5,
//     name: "ريان عبد المجيد",
//     gender: "ذكر",
//     age: "14",
//     city: "نابلس",
//     status: "معلق",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     applicationSubmissionDate: "10-02-2025",
//   },
//   {
//     id: 6,
//     name: "ريان عبد المجيد",
//     gender: "ذكر",
//     age: "14",
//     city: "نابلس",
//     status: "معلق",
//     email: "Omar@gmail.com",
//     idNumber: "312904421",
//     applicationSubmissionDate: "10-02-2025",
//   },
// ];

// const studentColumns = [
//   { title: "اسم الطالب", key: "name" },
//   { title: "الجنس", key: "gender" },
//   { title: "العنوان", key: "city" },
//   { title: "تاريخ تقديم الطلب", key: "applicationSubmissionDate" },
//   { title: "حالة الطلب", key: "status" },
//   { title: "التفاصيل", key: "details" },
// ];

// const Student = () => {
//   const studentActions = {
//     accept: (row) => console.log("Accepted", row),
//     reject: (row) => console.log("Rejected", row),
//   };

//   const renderStudentDialogContent = (request) => (
//     <>
//       <DialogContentText>الطالب: {request.name}</DialogContentText>
//       <DialogContentText>العمر: {request.age}</DialogContentText>
//       <DialogContentText>البريد الإلكتروني: {request.email}</DialogContentText>
//       <DialogContentText>رقم الهوية: {request.idNumber}</DialogContentText>
//     </>
//   );

//   return (
//     <>
//       <Dashboard_SubTitle title="طلبات الانضمام" />

//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Container sx={{ padding: 3 }}>
//           <RequestTable
//             columns={studentColumns}
//             data={studentData}
//             actions={studentActions}
//             renderDialogContent={renderStudentDialogContent}
//           />
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Student;
