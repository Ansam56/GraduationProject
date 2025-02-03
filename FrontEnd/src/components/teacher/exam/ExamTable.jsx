
import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../context/UserContext";
import axios from "axios"; // Import axios for API requests
import Loader from "../../pages/loader/Loader";

const ExamTable = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({});
  const [notes, setNotes] = useState("");
  const [selectedForPublish, setSelectedForPublish] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const { userToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const handleSaveNote = () => {
    if (!selectedStudent?._id) return;

    handleUpdateExam(
      selectedStudent.studentId,
      selectedStudent._id,
      marks[selectedStudent._id],
      notes[selectedStudent._id]
    );
    handleCloseNotesDialog();
  };

  const handleMarkChange = (examId, value) => {
    setMarks((prev) => ({
      ...prev,
      [examId]: value,
    }));
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/teacher/allStudentsExams`,
          {
            headers: { Authorization: `Tuba__${userToken}` },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.exams && Array.isArray(response.data.exams)) {
          // Filter out any elements that do not have an `_id`
          const validExams = response.data.exams.filter((exam) => exam._id);

          setRows(validExams);
          const initialNotes = {};
          validExams.forEach((exam) => {
            initialNotes[exam._id] = exam.note || "";
          });
          setNotes(initialNotes);
        } else {
          console.error("Unexpected response structure:", response.data);
          setRows([]);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
        toast.error("فشل تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [userToken]);

  if (loading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleConfirmDelete = async () => {
    if (!examToDelete?._id) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/teacher/deleteExam/${
          examToDelete._id
        }`,
        {
          headers: { Authorization: `Tuba__${userToken}` },
        }
      );

      if (response.status === 200) {
        toast.success("تم حذف الاختبار بنجاح!", { autoClose: 3000 });
        setRows((prevRows) =>
          prevRows.filter((row) => row._id !== examToDelete._id)
        );
      } else {
        toast.error("فشل حذف الاختبار.");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error("حدث خطأ أثناء حذف الاختبار.");
    }

    setDeleteDialogOpen(false);
    setExamToDelete(null);
  };

  const handleOpenDialog = (student, type) => {
    setSelectedStudent(student);
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
  const handleCheckboxChange = (examId) => {
    setSelectedForPublish((prev) =>
      prev.includes(examId)
        ? prev.filter((id) => id !== examId)
        : [...prev, examId]
    );
  };
  const handlePublish = async () => {
    try {
      await Promise.all(
        selectedForPublish.map(async (examId) => {
          const exam = rows.find((row) => row._id === examId);
          if (!exam) return;

          const mark = marks[examId] || exam.mark || "";
          const note = notes[examId] || exam.note || "";

          if (mark || note) {
            await handleUpdateExam(exam.studentId, examId, mark, note);
          }
        })
      );

      toast.success("تم النشر بنجاح!");
      setSelectedForPublish([]);
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("فشل النشر");
    }
  };

  const handleUpdateExam = async (studentId, examId, mark, note) => {
    if (!examId || (!mark && !note)) {
      toast.error("يرجى إدخال الدرجة أو الملاحظة");
      return;
    }

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/teacher/editExam/${studentId}/${examId}`,
        { mark, note },
        { headers: { Authorization: `Tuba__${userToken}` } }
      );

      if (response.status === 201) {
        toast.success("تم تحديث الاختبار بنجاح!");
      } else {
        toast.error("فشل في تحديث البيانات");
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      toast.error("حدث خطأ أثناء التحديث");
    }
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">اسم الطالب</TableCell>
              <TableCell align="center">التفاصيل</TableCell>
              <TableCell align="center">علامة الطالب</TableCell>
              <TableCell align="center">الملاحظات</TableCell>
              <TableCell align="center">نشر</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center">{row.studentName}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => setSelectedExam(row)}
                  >
                    <QuizIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={marks[row._id] ?? row.mark ?? ""}
                    onChange={(e) => handleMarkChange(row._id, e.target.value)}
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
                    checked={selectedForPublish.includes(row._id)}
                    onChange={() => handleCheckboxChange(row._id)}
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate("../ExamForm", {
                        state: {
                          exam: row,
                          isEdit: true,
                        },
                      })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setExamToDelete(row);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={notesDialogOpen} onClose={handleCloseNotesDialog}>
        <DialogTitle>
          الملاحظات - {selectedStudent?.studentName}
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
            value={notes[selectedStudent?._id] || ""}
            onChange={(e) =>
              handleNotesChange(selectedStudent?._id, e.target.value)
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

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={!!selectedExam} onClose={() => setSelectedExam(null)}>
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
                تفاصيل الاختبار - {selectedExam.studentName}
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
                  <strong>رابط الاختبار:</strong>{" "}
                  <a
                    href={selectedExam.examLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedExam.examLink}
                  </a>
                </DialogContentText>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={() => setSelectedExam(null)}
            variant="contained"
            color="primary"
          >
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <p>هل أنت متأكد أنك تريد حذف الاختبار {examToDelete?.studentName}؟</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default ExamTable;
