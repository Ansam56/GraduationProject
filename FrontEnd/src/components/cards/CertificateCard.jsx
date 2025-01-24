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
  Box,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const CertificateCard = ({ certificate, handleEdit, handleDelete }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogClose = () => setShowDialog(false);
  const handleDialogOpen = () => setShowDialog(true);
  const handleDialogConfirm = () => {
    handleDelete(certificate.id);
    setShowDialog(false);
  };

  const formattedDate = format(new Date(certificate.date), "yyyy-MM-dd", {
    locale: ar,
  });

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        position: "relative",
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {formattedDate}
        </Typography>
      </Box>

      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "auto",
        }}
        image={certificate.imageUrl}
        alt="Certificate"
      />

      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar>{certificate.user.name[0]}</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {certificate.user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {certificate.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={handleEdit}>
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
            هل أنت متأكد أنك تريد حذف هذه الشهادة؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            إلغاء
          </Button>
          <Button onClick={handleDialogConfirm} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CertificateCard;
