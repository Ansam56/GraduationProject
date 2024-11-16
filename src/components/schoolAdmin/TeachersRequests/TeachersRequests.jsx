import React from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import { Box, Container, DialogContentText } from "@mui/material";

const administratorData = [
  {
    id: 1,
    name: "عمر الخطيب",
    circle: "مشكاة",
    age: "35",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
    applicationSubmissionDate: "10-02-2025",
  },
  {
    id: 2,
    name: "عمر الخطيب",
    circle: "مشكاة",
    age: "35",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
    applicationSubmissionDate: "10-02-2025",
  },
  {
    id: 3,
    name: "عمر الخطيب",
    circle: "مشكاة",
    age: "35",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
    applicationSubmissionDate: "10-02-2025",
  },
  {
    id: 4,
    name: "عمر الخطيب",
    circle: "مشكاة",
    age: "35",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
    applicationSubmissionDate: "10-02-2025",
  },
  {
    id: 5,
    name: "عمر الخطيب",
    circle: "مشكاة",
    age: "35",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
    applicationSubmissionDate: "10-02-2025",
  },
  {
    id: 6,
    name: "عمر الخطيب",
    circle: "مشكاة",
    age: "35",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
    applicationSubmissionDate: "10-02-2025",
  },
];

const administratorColumns = [
  { title: "اسم المعلم", key: "name" },
  { title: "اسم الحلقة", key: "circle" },
  { title: "العنوان", key: "city" },
  { title: "تاريخ تقديم الطلب", key: "applicationSubmissionDate" },
  { title: "حالة الطلب", key: "status" },
  { title: "التفاصيل", key: "details" },
];

const Administrator = () => {
  const administratorActions = {
    accept: (row) => console.log("Accepted", row),
    reject: (row) => console.log("Rejected", row),
  };

  const renderAdministratorDialogContent = (request) => (
    <>
      <DialogContentText>المعلم: {request.name}</DialogContentText>
      <DialogContentText>العمر: {request.age}</DialogContentText>
      <DialogContentText>رقم الجوال: {request.phone}</DialogContentText>
      <DialogContentText>البريد الإلكتروني: {request.email}</DialogContentText>
      <DialogContentText>رقم الهوية: {request.idNumber}</DialogContentText>
      <DialogContentText>السيرة الذاتية: {request.cv}</DialogContentText>
    </>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Container sx={{ padding: 3 }}>
        <RequestTable
          columns={administratorColumns}
          data={administratorData}
          actions={administratorActions}
          renderDialogContent={renderAdministratorDialogContent}
        />
      </Container>
    </Box>
  );
};

export default Administrator;
