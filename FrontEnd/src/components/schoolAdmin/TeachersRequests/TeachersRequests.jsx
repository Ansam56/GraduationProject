import React, { useContext, useEffect, useState } from "react";
import RequestTable from "../../pages/RequestTable/RequestTable";
import { Box, Container, DialogContentText } from "@mui/material";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";
import Loader from "../../pages/loader/Loader";

import axios from "axios";

const Administrator = () => {
  const { userToken, userData } = useContext(UserContext);
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch admin and school data from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      // console.log("Token being sent:", teacherInfo);

      const [allTeacherReq, allCircleRe] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/auth/allTeacherReq`, {
          headers: { Authorization: `Tuba__${userToken}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/auth/allCirclesReq`, {
          headers: { Authorization: `Tuba__${userToken}` },
        }),
      ]);

      const Teachers = allTeacherReq.data.teachers;
      const circles = allCircleRe.data.circle;
      console.log("Teachers: ", Teachers);
      console.log("circles: ", circles);

      const mergedData = circles
        .map((circle) => {
          const teacher = Teachers.find(
            (teacher) => teacher._id === circle.teacherId
          );
          console.log("circle Status (Raw):", circle.status); // Debug line

          if (!teacher) {
            return null;
          }
          return {
            id: circle._id,
            teacherId: circle.teacherId,
            userName: teacher?.userName || "",
            circle: circle.circleName || "",
            circleType: circle?.type || "",
            status: statusTranslation[circle.status] || "",
            mobile: teacher?.mobile || "",
            email: teacher?.email || "",
            idNumber: teacher?.idNumber || "",
            teacherInfo: teacher?.teacherInfo || {},
            createdAt: circle.createdAt
              ? new Date(circle.createdAt).toISOString().split("T")[0]
              : "",
          };
        })
        .filter((item) => item !== null);

      setTeacherData(mergedData);
    } catch (error) {
      console.error("Error fetching teacher and circle requests:", error);
    } finally {
      setLoading(false);
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
        `${import.meta.env.VITE_API_URL}/schoolAdmin/acceptTeacher/${
          row.teacherId
        }`,
        { status: "active" },
        {
          headers: { Authorization: `Tuba__${userToken}` },
        }
      );

      setTeacherData((prevData) =>
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

  // // Handle reject action
  const handleReject = async (row) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/schoolAdmin/rejectTeacher/${
          row.teacherId
        }`,
        { status: "rejected" },
        {
          headers: { Authorization: `Tuba__${userToken}` },
        }
      );

      setTeacherData((prevData) =>
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

  // // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [userToken]);
    if (loading) {
    return <Loader />;
  }

  const administratorColumns = [
    { title: "اسم المعلم", key: "userName" },
    { title: "اسم الحلقة", key: "circle" },
    { title: "نوع الحلقة", key: "circleType" },
    { title: "تاريخ تقديم الطلب", key: "createdAt" },
    { title: "حالة الطلب", key: "status" },
    { title: "التفاصيل", key: "details" },
  ];

  const renderAdministratorDialogContent = (request) => (
    <>
      <DialogContentText>المعلم: {request.userName}</DialogContentText>
      <DialogContentText>
        رقم الجوال:{" "}
        <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
          {request.mobile}
        </span>
      </DialogContentText>
      <DialogContentText>
        البريد الإلكتروني:{" "}
        <a href={`mailto:${request.email}`} style={{ textDecoration: "none" }}>
          {request.email}
        </a>
      </DialogContentText>
      <DialogContentText>رقم الهوية: {request.idNumber}</DialogContentText>
      <DialogContentText>
        السيرة الذاتية:{" "}
        {request.teacherInfo.secure_url ? (
          <a
            href={request.teacherInfo.secure_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            عرض السيرة الذاتية
          </a>
        ) : (
          "لا توجد سيرة ذاتية"
        )}
      </DialogContentText>
    </>
  );

  return (
    <>
      <Dashboard_SubTitle title="طلبات الانضمام" />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Container sx={{ padding: 3 }}>
          <RequestTable
            columns={administratorColumns}
            data={teacherData}
            actions={{
              accept: handleAccept,
              reject: handleReject,
            }}
            renderDialogContent={renderAdministratorDialogContent}
          />
        </Container>
      </Box>
    </>
  );
};

export default Administrator;
