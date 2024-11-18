import React, { useState } from "react";
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
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./PostCard.css";

const PostCard = ({ post = null, handleDeletePost }) => {
  const navigate = useNavigate();
  const [showMoreText, setShowMoreText] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const activePost = post;

  const handleDialogClose = () => setShowDialog(false);
  const handleDialogOpen = () => setShowDialog(true);
  const handleDialogConfirm = () => {
    handleDeletePost(activePost.id);
    setShowDialog(false);
    toast.success("تم حذف الخبر");
  };

  const truncatedText =
    activePost.content.length > 120
      ? `${activePost.content.substring(0, 120)}...`
      : activePost.content;
  const handleTextToggle = () => setShowMoreText(!showMoreText);

  return (
    <Card className="post-card">
      <CardHeader
        avatar={
          activePost.user ? (
            <Avatar
              src={activePost.user.profilePicture}
              alt={`${activePost.user.firstName} ${activePost.user.lastName}`}
              sx={{
                bgcolor: activePost.user.profilePicture
                  ? "transparent"
                  : "#3f51b5",
              }}
            >
              {!activePost.user.profilePicture &&
                `${activePost.user.firstName[0]}${activePost.user.lastName[0]}`}
            </Avatar>
          ) : null
        }
        title={
          activePost.user ? (
            <div className="author-section">
              <div className="author-name-time">
                <Typography className="author-name">
                  {`${activePost.user.firstName} ${activePost.user.lastName}`}
                </Typography>
                <Typography className="date-no-image">
                  {formatDistanceToNow(activePost.createdAt, {
                    addSuffix: true,
                    locale: ar,
                  })}
                </Typography>
              </div>
            </div>
          ) : (
            "Unknown User"
          )
        }
        className="card-header"
      />

      {activePost.attachment && activePost.attachment.url && (
        <CardMedia
          component="img"
          className="post-section"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "300px",
          }}
          image={activePost.attachment.url}
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
            __html: showMoreText ? activePost.content : truncatedText,
          }}
        />
      </CardContent>

      {truncatedText !== activePost.content && (
        <CardActions className="post-card-footer">
          <Button onClick={handleTextToggle} className="read-more-btn">
            {showMoreText ? "اخفاء النص" : "قراءة المزيد"}
          </Button>
        </CardActions>
      )}

      <CardActions disableSpacing className="post-edit-delete">
        <IconButton onClick={() => navigate("../PostForm/:id")}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={handleDialogOpen}>
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>

      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد أنك تريد حذف هذا المنشور؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            الغاء
          </Button>
          <Button onClick={handleDialogConfirm} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PostCard;
