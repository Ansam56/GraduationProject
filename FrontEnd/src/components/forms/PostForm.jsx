import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { PostFormSchema } from "../authentication/validation/validate";
import { UserContext } from "../../components/context/UserContext";
import RichTextEditor from "../common/RichTextEditor";
import UploadComponent from "../common/UploadComponent";
import "../../assets/css/PostForm.css";

const PostForm = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const { state: locationState } = useLocation();
  const { userToken } = useContext(UserContext);
  const [initialValues, setInitialValues] = useState({
    title: "",
    subject: "",
    photoFile: null,
    photoPreview: "",
  });
  const isEditMode = !!newsId;
  useEffect(() => {
    if (isEditMode && locationState?.post) {
      const { title, subject, photo } = locationState.post;
      setInitialValues({
        title,
        subject: subject || "<p></p>", 
        photoFile: null,
        photoPreview: photo?.secure_url || "",
      });
    }
  }, [isEditMode, locationState]);

  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      subject: "",
      photoFile: null,
      photoPreview: "",
    },
    enableReinitialize: true,
    validationSchema: PostFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      formik.setFieldValue("subject", formik.values.subject);
      await new Promise((resolve) => setTimeout(resolve, 0)); 

      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("subject", values.subject);

        if (values.photoFile) {
          formData.append("photo", values.photoFile);
        }

        const url = isEditMode
          ? `${import.meta.env.VITE_API_URL}/schoolAdmin/editNews/${newsId}`
          : `${import.meta.env.VITE_API_URL}/schoolAdmin/createNews`;

        const method = isEditMode ? "put" : "post";

        await axios[method](url, formData, {
          headers: {
            Authorization: `Tuba__${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (isEditMode) {
          toast.success("تم التعديل بنجاح");
          navigate("../../posts");
        } else {
          toast.success("تم النشر بنجاح");
          navigate("../posts");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response?.data?.message || "حدث خطأ");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container className="post-form">
      <h2 className="text-center">{isEditMode ? "تعديل خبر" : "نشر خبر"}</h2>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} className="post-create-form">
            <Form.Group controlId="title" className="post-title">
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                placeholder="عنوان الخبر"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.title && formik.touched.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="photo" className="post-picture">
              <Form.Label>رفع صورة</Form.Label>
              <UploadComponent
                handlePostPicture={(file) =>
                  formik.setFieldValue("photoFile", file)
                }
                handlePicturePreview={(preview) =>
                  formik.setFieldValue("photoPreview", preview)
                }
                imagePreview={formik.values.photoPreview}
              />
            </Form.Group>

            <Form.Group controlId="subject" className="post-subject">
              <Form.Label>التفاصيل</Form.Label>
              <RichTextEditor
                subject={formik.values.subject}
                onChangeContent={(content) => {
                  console.log("Editor Updated:", content);
                  formik.setFieldValue("subject", content);
                }}
              />
              {formik.errors.subject && formik.touched.subject && (
                <div className="invalid-feedback d-block">
                  {formik.errors.subject}
                </div>
              )}
            </Form.Group>

            <div className="post-button-container">
              <Button
                variant="primary"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {isEditMode ? "حفظ التعديلات" : "نشر"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostForm;
