import React, { useContext, useState, useEffect } from "react";
import { Card, Typography, Avatar, Box, Button, Stack } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import defaultAvatar from "../../../assets/default-avatar.png";
import { UserContext } from "../../context/UserContext";
import Loader from "../../pages/loader/Loader";

const ProfileCard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userToken, userData } = useContext(UserContext);

  const daysMapping = {
    sunday: "الأحد",
    monday: "الإثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
  };

  const formatTimeToArabic = (time) => {
    if (!time) return "";

    // حذف ال Am و Pm من التايم سترينغ
    const cleanedTime = time.replace(/ ?[APap][Mm]?/g, "").trim();
    // تقسيم الوقت لدقائق وساعات
    const [hour, minute] = cleanedTime.split(":");
    //تحويل الساعة من سترينغ لرقم 10 يعني بالنظام العشري
    let hourInt = parseInt(hour, 10);
    let period = "صباحًا"; //default to morning

    if (hourInt >= 12) {
      period = "مساءً"; //afternoon/evening
      if (hourInt > 12) hourInt -= 12;
    } else if (hourInt === 0) {
      //00:00 to 12:00
      hourInt = 12; //midnight case
    }

    return `${hourInt}:${minute} ${period}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/teacher/teacherCircle`,
          {
            headers: { Authorization: `Tuba__${userToken}` },
          }
        );

        const data = await response.json();
        console.log(data);
        setTeacherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  if (loading) {
    return <Loader />;
  }

  const formattedData = {
    name: teacherData?.circle?.circleName,
    profileImage: teacherData?.circle.logo?.secure_url || defaultAvatar,
    // days: teacherData?.circle.days,
    days:
      teacherData?.circle.days?.length > 0
        ? JSON.parse(teacherData.circle.days[0])
            .map((day) => daysMapping[day.toLowerCase()] || day)
            .join("، ")
        : "",
    startTime: formatTimeToArabic(teacherData?.circle?.startTime),
    endTime: formatTimeToArabic(teacherData?.circle?.endTime),
    whatsappLink: teacherData?.teacherMobile,
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 2,
        boxShadow: 3,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#D9D9D9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mb: 2,
        }}
      >
        <Avatar
          alt="Profile Image"
          src={formattedData.profileImage}
          sx={{ width: 150, height: 150 }}
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
        />
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        {formattedData.name}
      </Typography>
      <Stack spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon fontSize="small" />
          الأيام: {formattedData.days}
        </Typography>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon fontSize="small" />
          الموعد: {formattedData.startTime} - {formattedData.endTime}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon sx={{ ml: 1 }} />}
          onClick={() =>
            window.open(`https://wa.me/${formattedData.whatsappLink}`, "_blank")
          }
        >
          واتساب
        </Button>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
