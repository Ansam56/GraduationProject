import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Pagination,
  Select,
  MenuItem,
  TextField,
  DialogContentText,
  DialogActions,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";
import CloseIcon from "@mui/icons-material/Close";
import QuizIcon from "@mui/icons-material/Quiz";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamTable = () => {
  const navigate = useNavigate();
  // Mocked Data
  const rows = [
    {
      id: 1,
      name: "رغد عماد",
      type: "سورة",
      subject: " البقرة",
      examDate: "9-2-2025",
      examTime: "1:00 مساء",
      zoomLink: "https://zoom.us/j/5551112222",
    },
  ];

  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({});
  const [notes, setNotes] = useState("");
  const [selectedForPublish, setSelectedForPublish] = useState([]);

  const [examDetailsDialogOpen, setExamDetailsDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleOpenExamDetails = (exam) => {
    setSelectedExam(exam);
    setExamDetailsDialogOpen(true);
  };

  const handleCloseExamDetails = () => {
    setExamDetailsDialogOpen(false);
    setSelectedExam(null);
  };

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleMarksChange = (id, value) => {
    setMarks((prev) => ({ ...prev, [id]: value }));
  };

  const handleOpenDialog = (student, type) => {
    setSelectedStudent(student);
    if (type === "exam") setExamDialogOpen(true);
    if (type === "notes") setNotesDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setExamDialogOpen(false);
    setNotesDialogOpen(false);
  };

  const handleCloseNotesDialog = () => {
    setNotesDialogOpen(false);
    setSelectedStudent(null);
  };
  const handleNotesChange = (id, value) => {
    setNotes((prev) => ({ ...prev, [id]: value }));
  };
  const handleCheckboxChange = (id) => {
    setSelectedForPublish((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePublish = () => {
    const dataToPublish = rows
      .filter((row) => selectedForPublish.includes(row.id))
      .map((row) => ({
        id: row.id,
        name: row.name,
        mark: marks[row.id] || "",
        note: notes[row.id] || "",
      }));

    console.log("Data to publish:", dataToPublish);
    toast.success("تم النشر بنجاح!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <Dashboard_SubTitle title="الاختبارات" />
      <IconButton
        color="primary"
        sx={{ position: "absolute", top: 20, left: 20 }}
        onClick={() => navigate("../ExamForm")}
      >
        اضافة اختبار جديد
        <AddIcon />
      </IconButton>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">اسم الطالب</TableCell>
              <TableCell align="center">التفاصيل</TableCell>
              <TableCell align="center">علامة الطالب</TableCell>
              <TableCell align="center">الملاحظات</TableCell>
              <TableCell align="center">نشر</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center">{row.name}</TableCell>
                {/* Exam Dialog */}
                <TableCell align="center">
                  <IconButton
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenExamDetails(row)}
                  >
                    <QuizIcon />
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  <TextField
                    type="number"
                    value={marks[row.id] || ""}
                    onChange={(e) => handleMarksChange(row.id, e.target.value)}
                    sx={{ width: "80px" }}
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDialog(row, "notes")}
                  >
                    <NoteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={selectedForPublish.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-previousNext": {
              transform: "rotateY(180deg)",
            },
          }}
        />
      </Box>

      <Dialog open={notesDialogOpen} onClose={handleCloseNotesDialog}>
        <DialogTitle>
          الملاحظات - {selectedStudent?.name}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialogs}
            sx={{ position: "absolute", left: 8, top: 8, color: "#555" }}
          >
            <CloseIcon sx={{ mr: 5 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={notes[selectedStudent?.id] || ""}
            onChange={(e) =>
              handleNotesChange(selectedStudent?.id, e.target.value)
            }
            label="أدخل الملاحظات هنا"
            variant="outlined"
            sx={{ marginTop: 2 }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseNotesDialog}
            >
              حفظ
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Publish Button  */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePublish}
          disabled={selectedForPublish.length === 0}
        >
          نشر
        </Button>
      </Box>

      <Dialog open={examDetailsDialogOpen} onClose={handleCloseExamDetails}>
        <DialogContent>
          {selectedExam && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
            >
              <DialogContentText
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                تفاصيل الاختبار - {selectedExam.name}
              </DialogContentText>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, px: 2 }}
              >
                <DialogContentText
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
                >
                  <strong>نوع الاختبار:</strong> {selectedExam.type}
                </DialogContentText>
                <DialogContentText
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
                >
                  <strong>المادة:</strong> {selectedExam.subject}
                </DialogContentText>
                <DialogContentText
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
                >
                  <strong>تاريخ الاختبار:</strong> {selectedExam.examDate}
                </DialogContentText>
                <DialogContentText
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
                >
                  <strong>وقت الاختبار:</strong> {selectedExam.examTime}
                </DialogContentText>
                <DialogContentText
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
                >
                  <strong>رابط Zoom:</strong>{" "}
                  <a
                    href={selectedExam.zoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    انضم إلى الاجتماع
                  </a>
                </DialogContentText>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleCloseExamDetails}
            variant="contained"
            color="primary"
          >
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExamTable;
