import React from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import { Box, Container, DialogContentText } from "@mui/material";

const studentData = [
  {
    id: 1,
    name: "ريان عبد المجيد",
    gender: "ذكر",
    age: "14",
    city: "نابلس",
    status: "معلق",
    email: "Omar@gmail.com",
    idNumber: "312904421",
  },
  {
    id: 2,
    name: "ريان عبد المجيد",
    gender: "ذكر",
    age: "14",
    city: "نابلس",
    status: "معلق",
    email: "Omar@gmail.com",
    idNumber: "312904421",
  },
  {
    id: 3,
    name: "ريان عبد المجيد",
    gender: "ذكر",
    age: "14",
    city: "نابلس",
    status: "معلق",
    email: "Omar@gmail.com",
    idNumber: "312904421",
  },
  {
    id: 4,
    name: "ريان عبد المجيد",
    gender: "ذكر",
    age: "14",
    city: "نابلس",
    status: "معلق",
    email: "Omar@gmail.com",
    idNumber: "312904421",
  },
  {
    id: 5,
    name: "ريان عبد المجيد",
    gender: "ذكر",
    age: "14",
    city: "نابلس",
    status: "معلق",
    email: "Omar@gmail.com",
    idNumber: "312904421",
  },
  {
    id: 6,
    name: "ريان عبد المجيد",
    gender: "ذكر",
    age: "14",
    city: "نابلس",
    status: "معلق",
    email: "Omar@gmail.com",
    idNumber: "312904421",
  },
];

const studentColumns = [
  { title: "اسم الطالب", key: "name" },
  { title: "الجنس", key: "gender" },
  { title: "العنوان", key: "city" },
  { title: "حالة الطلب", key: "status" },
  { title: "التفاصيل", key: "details" },
];

const Student = () => {
  const studentActions = {
    accept: (row) => console.log("Accepted", row),
    reject: (row) => console.log("Rejected", row),
  };

  const renderStudentDialogContent = (request) => (
    <>
      <DialogContentText>الطالب: {request.name}</DialogContentText>
      <DialogContentText>البريد الإلكتروني: {request.email}</DialogContentText>
      <DialogContentText>رقم الهوية: {request.idNumber}</DialogContentText>
      <DialogContentText>العمر: {request.age}</DialogContentText>
    </>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Container sx={{ padding: 3 }}>
        <RequestTable
          columns={studentColumns}
          data={studentData}
          actions={studentActions}
          renderDialogContent={renderStudentDialogContent}
        />
      </Container>
    </Box>
  );
};

export default Student;
