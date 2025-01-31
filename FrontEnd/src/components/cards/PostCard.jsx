import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../components/context/UserContext"; 
import "./PostCard.css";

const PostCard = ({ post = null, handleDeletePost }) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [postDialog, setPostDialog] = useState(false);
  const { userData } = useContext(UserContext); 

  const activePost = post;

  const handleDialogClose = () => setShowDialog(false);
  const handleDialogOpen = () => setShowDialog(true);
  const handleDialogConfirm = async () => {
    try {
      await handleDeletePost(activePost._id); 
      setShowDialog(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("فشل في حذف الخبر");
    }
  };

  const handlePostDialogOpen = () => setPostDialog(true);
  const handlePostDialogClose = () => setPostDialog(false);

  const truncatedText =
    activePost.subject.length > 250
      ? `${activePost.subject.substring(0, 250)}...`
      : activePost.subject;

  return (
    <Card className="post-card">
      <CardHeader
        avatar={
          activePost.schoolAdminPhoto?.secure_url ? (
            <Avatar
              src={activePost?.schoolAdminPhoto?.secure_url}
              sx={{
                width: 50,
                height: 50,
                margin: "8px auto",
              }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: "#3f51b5",
                color: "white",
                fontSize: "1rem",
                margin: "8px auto",
              }}
            >
              {activePost.schoolAdminName
                ? activePost.schoolAdminName[0] + activePost.schoolAdminName[1]
                : "A"}
            </Avatar>
          )
        }
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "5px",
            }}
          >
            <Typography className="author-name">
              {activePost.schoolAdminName || "Unknown User"}
            </Typography>
            <Typography
              className="date-no-image"
              sx={{ fontSize: "0.85rem", color: "gray" }}
            >
              {formatDistanceToNow(
                parseISO(`${activePost.newsDate}T${activePost.newsTime}Z`),
                {
                  addSuffix: true,
                  locale: ar,
                }
              )}
            </Typography>
          </div>
        }
        className="card-header"
      />

      {activePost.photo && activePost.photo?.secure_url && (
        <CardMedia
          component="img"
          className="post-section"
          sx={{ width: "100%", height: "auto", maxHeight: "300px" }}
          image={activePost.photo?.secure_url}
          alt="Post Attachment"
        />
      )}

      <CardContent className="card-body">
        <Typography variant="h6" component="h2" className="card-title">
          {activePost.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: truncatedText,
          }}
        />
      </CardContent>

      {truncatedText !== activePost.subject && (
        <CardActions className="post-card-footer">
          <Button onClick={handlePostDialogOpen} className="read-more-btn">
            قراءة المزيد
          </Button>
        </CardActions>
      )}

      {userData?.role === "schoolAdmin" && (
        <CardActions disableSpacing className="post-edit-delete">
          <IconButton
            onClick={() =>
              navigate(`/SchoolAdmin/posts/edit/${activePost._id}`, {
                state: {
                  post: {
                    ...activePost,
                    subject: activePost.subject || "<p></p>",
                  },
                },
              })
            }
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={handleDialogOpen}>
            <DeleteIcon color="error" />
          </IconButton>
        </CardActions>
      )}

      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle> هل أنت متأكد أنك تريد حذف هذا الخبر ؟</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            sx={{
              fontWeight: "bold",
            }}
          >
            الغاء
          </Button>
          <Button
            onClick={handleDialogConfirm}
            color="error"
            sx={{
              fontWeight: "bold",
            }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={postDialog}
        onClose={handlePostDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            backgroundColor: "var(--highlight-color)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {activePost.title}
        </DialogTitle>
        <DialogContent>
          {activePost.photo && activePost.photo?.secure_url && (
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                maxHeight: "400px",
                maxWidth: "400px",
                margin: "20px auto", 
                display: "block", 
                // marginBottom: "10px",
              }}
              image={activePost.photo?.secure_url}
              alt="Post Attachment"
            />
          )}
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: activePost.subject }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePostDialogClose}
            color="primary"
            sx={{
              fontWeight: "bold",
            }}
          >
            اغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PostCard;
