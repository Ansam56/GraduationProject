import React from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CertificateFormSchema } from "../authentication/validation/validate";
import UploadComponent from "../common/UploadComponent";
import "../../assets/css/CertificateForm.css";

const CertificateForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      certificateTitle: "",
      certificatePicture: "",
    },
    validationSchema: CertificateFormSchema,
    onSubmit: (values) => {
      console.log("certificateForm Submitted:", values);
      toast.success("تم نشر الشهادة");
      navigate("../certificates");
    },
  });

  return (
    <Container className="certificate-form">
      <h2 className="text-center">نشر شهادة</h2>
      <Row>
        <Col>
          <Form
            onSubmit={formik.handleSubmit}
            className="certificate-create-form"
          >
            <Form.Group
              controlId="certificateTitle"
              className="certificate-title"
            >
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                placeholder="عنوان الشهادة"
                name="certificateTitle"
                value={formik.values.certificateTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!formik.errors.certificateTitle &&
                  formik.touched.certificateTitle
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.certificateTitle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="certificatePicture"
              className="certificate-picture"
            >
              <Form.Label>رفع صورة</Form.Label>
              <UploadComponent
                handlePicturePreview={(preview) =>
                  formik.setFieldValue("certificatePicture", preview)
                }
                handlePostPicture={(file) =>
                  formik.setFieldValue("certificatePicture", file)
                }
                imagePreview={formik.values.certificatePicture}
              />
              {formik.errors.certificatePicture &&
                formik.touched.certificatePicture && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.certificatePicture}
                  </div>
                )}
            </Form.Group>

            <div className="certificate-button-container">
              <Button
                variant="primary"
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

export default CertificateForm;
