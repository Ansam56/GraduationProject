import React from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import { Box, Container, DialogContentText } from "@mui/material";

const adminData = [
  {
    id: 1,
    name: "عمر الخطيب",
    age: "24",
    school: "ملتقى جامعة فلسطين التقنية-خضوري",
    city: "طولكرم",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 2,
    name: "يحيى علي",
    age: "24",
    school: "ملتقى جامعة النجاح الوطنية",
    city: "نابلس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 3,
    name: "سلوى الأحمد",
    age: "24",
    school: "عمر بن الخطاب",
    city: "جنين",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 4,
    name: "عبدالله خالد",
    age: "24",
    school: "ملتقى جامعة الخليل",
    city: "الخليل",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 5,
    name: "يوسف عبد",
    age: "24",
    school: "مدرسة عبدالله بن عباس",
    city: "طوباس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 6,
    name: "احمد محمد ",
    age: "24",
    school: "ملتقى الجامعة العربية الأمريكية",
    city: "جنين",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 7,
    name: " لؤي جابر",
    age: "24",
    school: "مدرسة علي بن ابي طالب",
    city: "قلقيلية",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 8,
    name: "أمجد محمد",
    age: "24",
    school: "عمر بن الخطاب",
    city: "جنين",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 9,
    name: "عبدالله خالد",
    age: "24",
    school: "ملتقى جامعة الخليل",
    city: "الخليل",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
  {
    id: 10,
    name: "داود المصري",
    age: "24",
    school: "مدرسة صفوة الحفاظ",
    city: "نابلس",
    status: "معلق",
    phone: "0598973354",
    email: "Omar@gmail.com",
    idNumber: "312904421",
    officialDocument: "omaralkhateeb.pdf",
  },
];

const adminColumns = [
  { title: "اسم المدير", key: "name" },
  { title: "اسم المدرسة", key: "school" },
  { title: "العنوان", key: "city" },
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
      <DialogContentText>
        الوثيقة الرسمية: {request.officialDocument}
      </DialogContentText>
      <DialogContentText>العمر: {request.age}</DialogContentText>
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
