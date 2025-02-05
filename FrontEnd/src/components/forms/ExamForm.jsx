import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/CertificateForm.css";
import { ExamFormSchema } from "../authentication/validation/validate";
import { UserContext } from "../../components/context/UserContext";
import Loader from "../pages/loader/Loader";

const ExamForm = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const { exam, isEdit } = location.state || {};
  const { userToken } = useContext(UserContext);

  const initialValues = {
    studentId: exam?.studentId || "",
    type: exam?.type || "",
    subject: exam?.subject || "",
    examDate: exam?.examDate || "",
    examTime: exam?.examTime || "",
    zoomLink: exam?.examLink || "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, surahsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/teacher/studentsManagement`, {
            headers: { Authorization: `Tuba__${userToken}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/auth/allSurah`),
        ]);

        if (!studentsRes.ok) throw new Error("فشل في جلب الطلاب");
        if (!surahsRes.ok) throw new Error("فشل في جلب السور");

        const studentsData = await studentsRes.json();
        const surahsData = await surahsRes.json();

        setStudents(studentsData.student || []);
        setSurahs(surahsData.map((s) => s.surahName) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  const formik = useFormik({
    initialValues,
    validationSchema: ExamFormSchema,
    enableReinitialize: true,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const endpoint = isEdit
          ? `${import.meta.env.VITE_API_URL}/teacher/editExam/${
              exam.studentId
            }/${exam._id}`
          : `${import.meta.env.VITE_API_URL}/teacher/createExam/${
              values.studentId
            }`;

        const method = isEdit ? "PUT" : "POST";

        const payload = {
          type: values.type,
          subject: values.subject,
          examDate: values.examDate,
          examTime: values.examTime,
          examLink: values.zoomLink,
        };

        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Tuba__${userToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `فشل في ${isEdit ? "تحديث" : "نشر"} الاختبار`
          );
        }

        toast.success(`تم ${isEdit ? "التحديث" : "النشر"} بنجاح`);
        navigate("../exams");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="exam-form">
      <h2 className="text-center">اختبار تسميع</h2>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} className="exam-create-form">
            <Form.Group controlId="studentId" className="mb-3">
              <Form.Label>اختر الطالب</Form.Label>
              <Form.Select
                name="studentId"
                value={formik.values.studentId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!formik.errors.studentId && formik.touched.studentId
                }
              >
                <option value="">اختر الطالب...</option>
                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.userName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.studentId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="type" className="mb-3">
              <Form.Label>نوع الاختبار</Form.Label>
              <Form.Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.type && formik.touched.type}
              >
                <option value="">اختر النوع...</option>
                <option value="سورة">سورة</option>
                <option value="جزء">جزء</option>
                <option value="مستويات">مستويات</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.type}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="subject" className="mb-3">
              <Form.Label>اختر {formik.values.type || "الموضوع"}</Form.Label>
              <Form.Select
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.subject && formik.touched.subject}
                disabled={!formik.values.type}
              >
                <option value="">اختر {formik.values.type}...</option>
                {formik.values.type === "سورة" &&
                  surahs.map((surah, index) => (
                    <option key={index} value={surah}>
                      {surah}
                    </option>
                  ))}
                {formik.values.type === "جزء" &&
                  [...Array(30).keys()].map((juza) => (
                    <option key={juza + 1} value={`الجزء ${juza + 1}`}>
                      الجزء {juza + 1}
                    </option>
                  ))}
                {formik.values.type === "مستويات" &&
                  [5, 10, 15, 20, 25, 30].map((level) => (
                    <option key={level} value={`مستويات ${level}`}>
                      {level}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.subject}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="examDate" className="mb-3">
              <Form.Label>اختر التاريخ</Form.Label>
              <Form.Control
                type="date"
                name="examDate"
                value={formik.values.examDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.examDate && formik.touched.examDate}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.examDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="examTime" className="mb-3">
              <Form.Label>اختر الوقت</Form.Label>
              <Form.Control
                type="time"
                name="examTime"
                value={formik.values.examTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.examTime && formik.touched.examTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.examTime}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="zoomLink" className="mb-3">
              <Form.Label>ضع رابط الزووم</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://zoom.us/..."
                name="zoomLink"
                value={formik.values.zoomLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.zoomLink && formik.touched.zoomLink}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.zoomLink}
              </Form.Control.Feedback>
            </Form.Group>

            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                variant="primary"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                نشر
              </Button>
            </Box>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ExamForm;
