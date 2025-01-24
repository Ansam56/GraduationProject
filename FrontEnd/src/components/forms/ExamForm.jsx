import React from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ExamFormSchema } from "../authentication/validation/validate";

import "../../assets/css/CertificateForm.css";

const ExamForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      surahOrPart: "",
      examDate: "",
      examTime: "",
      zoomLink: "",
      examMark: "",
    },
    validationSchema: ExamFormSchema,
    onSubmit: (values) => {
      console.log("Exam Form Submitted:", values);
      toast.success("تم نشر الاختبار");
      navigate("../exams");
    },
  });

  return (
    <Container className="exam-form">
      <h2 className="text-center">اختبار تسميع</h2>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} className="exam-create-form">
            <Form.Group controlId="surahOrPart" className="mb-3">
              <Form.Label>اختر السورة أو الجزء</Form.Label>
              <Form.Select
                name="surahOrPart"
                value={formik.values.surahOrPart}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!formik.errors.surahOrPart && formik.touched.surahOrPart
                }
              >
                <option value="">اختر...</option>
                <option value="الجزء الأول">الجزء الأول</option>
                <option value="الجزء الثاني">الجزء الثاني</option>
                <option value="سورة البقرة">سورة البقرة</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.surahOrPart}
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

            <Form.Group controlId="examMark" className="mb-3">
              <Form.Label>علامة الاختبار</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل العلامة"
                name="examMark"
                value={formik.values.examMark}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.examMark && formik.touched.examMark}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.examMark}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="exam-button-container text-center">
              <Button
                variant="success"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                نشر
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ExamForm;
