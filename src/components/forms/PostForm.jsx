import React from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PostFormSchema } from "../authentication/validation/validate";
import RichTextEditor from "../common/RichTextEditor";
import UploadComponent from "../common/UploadComponent";
import "../../assets/css/PostForm.css";

const PostForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      postTitle: "",
      postContent: "",
      postPicture: "",
    },
    validationSchema: PostFormSchema,
    onSubmit: (values) => {
      console.log("PostForm Submitted:", values);
      toast.success("تم نشر الخبر");
      navigate("");
    },
  });

  return (
    <Container className="post-form">
      <h2 className="text-center">نشر خبر</h2>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} className="post-create-form">
            <Form.Group controlId="postTitle" className="post-title">
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                placeholder="عنوان الخبر"
                name="postTitle"
                value={formik.values.postTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!formik.errors.postTitle && formik.touched.postTitle
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.postTitle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postPicture" className="post-picture">
              <Form.Label>رفع صورة</Form.Label>
              <UploadComponent
                handlePicturePreview={(preview) =>
                  formik.setFieldValue("postPicture", preview)
                }
                handlePostPicture={(file) =>
                  formik.setFieldValue("postPicture", file)
                }
                imagePreview={formik.values.postPicture}
              />
            </Form.Group>

            <Form.Group controlId="postContent">
              <Form.Label>التفاصيل</Form.Label>
              <RichTextEditor
                content={formik.values.postContent}
                onChangeContent={(content) =>
                  formik.setFieldValue("postContent", content)
                }
              />
              {formik.errors.postContent && formik.touched.postContent && (
                <div className="invalid-feedback d-block">
                  {formik.errors.postContent}
                </div>
              )}
            </Form.Group>

            <div className="post-button-container">
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

export default PostForm;
