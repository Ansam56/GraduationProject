import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  IconButton,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CertificateCard from "../../cards/CertificateCard";
import Dashboard_SubTitle from "../dashboardSubTitle/Dashboard_SubTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Certificates.css";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const placeholderCertificates = [
      {
        id: 1,
        date: "2024-06-21",
        imageUrl:
          "https://www.saudiah.org/write-output/quran-certificateFuwtNHM0Oj/%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86%20%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85%20%D9%83%D8%A7%D9%85%D9%84%D8%A7%D9%8B-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%20%D8%A5%D8%B3%D9%84%D8%A7%D9%85-%D8%A3%D8%AD%D9%85%D8%AF%20%D8%B3%D8%B9%D9%8A%D8%AF%20%D8%A7%D8%AD%D9%85%D8%AF%20%D8%AD%D8%B3%D9%86-.png",
        user: {
          id: 1,
          name: "عرين عبد الغني ملحم",
        },
        description: "سرد 5 أجزاء",
      },
      {
        id: 2,
        date: "2024-06-22",
        imageUrl:
          "https://www.saudiah.org/write-output/quran-certificateFuwtNHM0Oj/%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86%20%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85%20%D9%83%D8%A7%D9%85%D9%84%D8%A7%D9%8B-%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%20%D8%A5%D8%B3%D9%84%D8%A7%D9%85-%D8%A3%D8%AD%D9%85%D8%AF%20%D8%B3%D8%B9%D9%8A%D8%AF%20%D8%A7%D8%AD%D9%85%D8%AF%20%D8%AD%D8%B3%D9%86-.png",
        user: {
          id: 2,
          name: "فاطمة عمر",
        },
        description: "سرد 7 أجزاء",
      },
    ];

    const placeholderStudents = [
      { id: 1, name: "عرين عبد الغني ملحم" },
      { id: 2, name: "فاطمة عمر" },
    ];

    setTimeout(() => {
      setCertificates(placeholderCertificates);
      setStudents(placeholderStudents);
      setFilteredCertificates(placeholderCertificates);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddCertificate = () => {
    if (!selectedStudent) {
      toast.error("الرجاء تحديد اسم الطالب قبل إضافة الشهادة");
      return;
    }
    navigate("../CertificateForm", { state: { studentId: selectedStudent } });
  };

  const handleEditCertificate = (id) => {
    navigate(`../CertificateForm/${id}`);
  };

  const handleDeleteCertificate = (id) => {
    setCertificates((prevCertificates) =>
      prevCertificates.filter((certificate) => certificate.id !== id)
    );
    setFilteredCertificates((prevCertificates) =>
      prevCertificates.filter((certificate) => certificate.id !== id)
    );
    toast.success("Certificate deleted successfully.");
  };

  const handleStudentChange = (event) => {
    const studentId = parseInt(event.target.value, 10);
    setSelectedStudent(event.target.value);

    if (studentId) {
      setFilteredCertificates(
        certificates.filter((certificate) => certificate.user.id === studentId)
      );
    } else {
      setFilteredCertificates(certificates);
    }
  };

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Dashboard_SubTitle title="الشهادات" />
      <ToastContainer />
      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "right",
            mb: 1,
            direction: "rtl",
            color: "#333",
          }}
        >
          طلابي
        </Typography>
        <FormControl
          fullWidth
          sx={{
            mb: 2,
            textAlign: "right",
            direction: "rtl",
          }}
        >
          <select
            value={selectedStudent}
            onChange={(e) => handleStudentChange(e)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
              direction: "rtl",
            }}
          >
            <option value="">عرض الكل</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </FormControl>

        <IconButton
          color="primary"
          sx={{ position: "absolute", top: 20, left: 20 }}
          onClick={handleAddCertificate}
        >
          اضافة شهادة جديدة
          <AddIcon />
        </IconButton>

        <div className="certificates-container">
          {filteredCertificates.map((certificate) => (
            <div key={certificate.id} className="certificate-card-wrapper">
              <CertificateCard
                certificate={certificate}
                handleEdit={() => handleEditCertificate(certificate.id)}
                handleDelete={handleDeleteCertificate}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Certificates;
