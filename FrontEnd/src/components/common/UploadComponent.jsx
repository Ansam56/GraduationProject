import { Form, Image } from "react-bootstrap";
import "../../assets/css/UploadComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const UploadComponent = ({
  handlePostPicture, 
  handlePicturePreview, 
  imagePreview,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handlePostPicture(file); 
      const preview = URL.createObjectURL(file);
      handlePicturePreview(preview); 
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handlePostPicture(file);
      const preview = URL.createObjectURL(file);
      handlePicturePreview(preview);
    }
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const deleteImage = () => {
    handlePostPicture(null);
    handlePicturePreview(null);
  };

  return (
    <div className="upload-container">
      <Form.Group
        className="upload-box"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-content">
          {imagePreview ? (
            <div>
              <Image src={imagePreview} fluid className="preview-image" />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="delete-image"
                size="lg"
                onClick={deleteImage}
              />
            </div>
          ) : (
            <>
              <i className="bi bi-cloud-arrow-up upload-icon"></i>
              <p>قم بسحب وإسقاط الصورة هنا أو</p>
              <Form.Label htmlFor="upload-photo" className="btn btn-primary">
                ارفع صورة
              </Form.Label>
              <Form.Control
                type="file"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
      </Form.Group>
    </div>
  );
};

export default UploadComponent;
