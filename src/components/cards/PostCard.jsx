import { useState } from "react";
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
import "./PostCard.css"; 

const PostCard = ({ post = null, handleDeletePost }) => {
  const navigate = useNavigate();
  const [showMoreText, setShowMoreText] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const fakePost = {
    id: "1",
    content:
      "القُرآن ملاذ وأمان المؤمن من تولَّى عنه فقد أقبل على حياة موحشة ومن أقبل عليه بصدق أقبلت عليه من الله الرحمات وغمرته ألطافه بالعون والسداد وبركة الأوقات يدعوكم ملتقى القرآن الكريم في جامعة فلسطين التقنية خضوري لحضور لقاء ملاذُ الحافظين مع الشيخ موسى مدفع وذلك اليوم الاثنين عند الساعة التاسعة والنصف مساءً عبر تقنية زوم",
    title: "دعوة لحضور لقاء ملاذُ الحافظين",
    createdAt: new Date(),
    attachment: {
      url: "https://scontent.fjrs27-1.fna.fbcdn.net/v/t39.30808-6/441639189_1036342611364277_2818803549453965447_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XqDQ_mFstCYQ7kNvgGpkfcB&_nc_zt=23&_nc_ht=scontent.fjrs27-1.fna&_nc_gid=ARXlJFzMXXL82_h78p6XtCB&oh=00_AYBrV1Z9eoPkiLWU_wbhWpFCrp0xtw6GqZbqziAVyaX5dA&oe=67352F2D",
    },
    user: {
      firstName: "شيماء",
      lastName: "عماد",
      profilePicture: "https://via.placeholder.com/50",
    },
  };

  const activePost = post || fakePost;

  const handleDialogClose = () => setShowDialog(false);
  const handleDialogOpen = () => setShowDialog(true);
  const handleDialogConfirm = () => {
    handleDeletePost(activePost.id);
    setShowDialog(false);
  };

  const truncatedText =
    activePost.content.length > 200
      ? `${activePost.content.substring(0, 200)}...`
      : activePost.content;
  const handleTextToggle = () => setShowMoreText(!showMoreText);

  return (
    <Card className="post-card">
      <CardHeader
        avatar={
          <Avatar
            src={activePost.user.profilePicture}
            className="profile-picture"
          />
        }
        title={
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
            maxHeight: "400px",
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
        <IconButton
          onClick={() => navigate(`/dashboard/post-form/${activePost.id}`)}
        >
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
