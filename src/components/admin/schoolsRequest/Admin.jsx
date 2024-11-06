import React from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import { Box, Container, DialogContentText } from "@mui/material";

const adminData = [
  {
    id: 1,
    name: "عمر الخطيب",
    school: "ملتقى جامعة فلسطين التقنية-خضوري",
    address: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 2,
    name: "يحيى علي",
    school: "ملتقى جامعة النجاح الوطنية",
    address: "نابلس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 3,
    name: "سلوى الأحمد",
    school: "عمر بن الخطاب",
    address: "جنين",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 4,
    name: "عبدالله خالد",
    school: "ملتقى جامعة الخليل",
    address: "الخليل",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 5,
    name: "يوسف عبد",
    school: "مدرسة عبدالله بن عباس",
    address: "طوباس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 6,
    name: "احمد محمد ",
    school: "ملتقى جامعة فلسطين التقنية-خضوري",
    address: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 7,
    name: "يحيى علي",
    school: "ملتقى جامعة النجاح الوطنية",
    address: "نابلس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 8,
    name: "سلوى الأحمد",
    school: "عمر بن الخطاب",
    address: "جنين",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 9,
    name: "عبدالله خالد",
    school: "ملتقى جامعة الخليل",
    address: "الخليل",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
  {
    id: 10,
    name: "يوسف عبد",
    school: "مدرسة عبدالله بن عباس",
    address: "طوباس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    cv: "omaralkhateeb.pdf",
  },
];

const adminColumns = [
  { title: "اسم المدير", key: "name" },
  { title: "اسم المدرسة", key: "school" },
  { title: "العنوان", key: "address" },
  { title: "حالة الطلب", key: "status" },
  { title: "التفاصيل", key: "details" },
];

const Admin = () => {
  const adminActions = {
    accept: (row) => console.log("Accepted", row),
    reject: (row) => console.log("Rejected", row),
  };

  const renderAdminDialogContent = (request) => (
    <>
      <DialogContentText>المدير: {request.name}</DialogContentText>
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
          columns={adminColumns}
          data={adminData}
          actions={adminActions}
          renderDialogContent={renderAdminDialogContent}
        />
      </Container>
    </Box>
  );
};

export default Admin;
