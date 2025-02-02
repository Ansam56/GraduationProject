
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/CertificateForm.css";
import { ExamFormSchema } from "../authentication/validation/validate";
import { UserContext } from "../../components/context/UserContext";

const ExamForm = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, surahsRes] = await Promise.all([
          fetch("https://tuba-temp-1.onrender.com/teacher/studentsManagement", {
            headers: { Authorization: `Tuba__${userToken}` },
          }),
          fetch("https://tuba-temp-1.onrender.com/auth/allSurah"),
        ]);

        if (!studentsRes.ok) throw new Error("فشل في جلب الطلاب");
        if (!surahsRes.ok) throw new Error("فشل في جلب السور");

        const studentsData = await studentsRes.json();
        const surahsData = await surahsRes.json();
        console.log(surahsData);

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
    initialValues: {
      studentId: "",
      surah: "",
      juza: "",
      level: "",
      examDate: "",
      examTime: "",
      zoomLink: "",
    },
    validationSchema: ExamFormSchema,
    // onSubmit: (values) => {
    //   console.log("Exam Form Submitted:", values);
    //   toast.success("تم نشر الاختبار");
    //   navigate("../exams");
    // },

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/teacher/createExam/${
          values.studentId
        }`;

        let type = "";
        if (values.surah) type = "سورة";
        else if (values.juza) type = "جزء";
        else if (values.level) type = "مستوى";

        if (!type) {
          toast.error("يجب اختيار نوع الاختبار (سورة، جزء، أو مستوى)");
          setSubmitting(false);
          return;
        }

        const payload = {
          type: type,
          subject: values.surah || values.juza || values.level, 
          examDate: values.examDate,
          examTime: values.examTime,
          examLink: values.zoomLink,
        };

        console.log("Submitting Exam Data:", payload); // Debugging

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Tuba__${userToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "فشل في نشر الاختبار");
        }

        toast.success("تم نشر الاختبار بنجاح");
        navigate("../exams");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container className="exam-form">
      <h2 className="text-center">اختبار تسميع</h2>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} className="exam-create-form">
            {/* Student Selection */}
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

            {/* Surah Selection */}
            <Form.Group controlId="surah" className="mb-3">
              <Form.Label>اختر السورة</Form.Label>
              <Form.Select
                name="surah"
                value={formik.values.surah}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.surah && formik.touched.surah}
              >
                <option value="">اختر...</option>
                {surahs.map((surah, index) => (
                  <option key={index} value={surah}>
                    {surah}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.surah}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Juza Selection */}
            <Form.Group controlId="juza" className="mb-3">
              <Form.Label>اختر الجزء</Form.Label>
              <Form.Select
                name="juza"
                value={formik.values.juza}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.juza && formik.touched.juza}
              >
                <option value="">اختر...</option>
                {[...Array(30).keys()].map((juza) => (
                  <option key={juza + 1} value={`الجزء ${juza + 1}`}>
                    الجزء {juza + 1}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.juza}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Level Selection */}
            <Form.Group controlId="level" className="mb-3">
              <Form.Label>اختر المستوى</Form.Label>
              <Form.Select
                name="level"
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.level && formik.touched.level}
              >
                <option value="">اختر...</option>
                {[5, 10, 15, 20, 25, 30].map((level) => (
                  <option key={level} value={`مستوى ${level}`}>
                    مستوى {level}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.level}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Exam Date */}
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

            {/* Exam Time */}
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

            {/* Zoom Link */}
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
