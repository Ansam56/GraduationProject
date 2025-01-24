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
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";
import CloseIcon from "@mui/icons-material/Close";
import QuizIcon from "@mui/icons-material/Quiz";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";
import { useNavigate } from "react-router-dom";

const ExamTable = () => {
  const navigate = useNavigate();
  // Mocked Data
  const rows = [
    { id: 1, name: "خالد جلال" },
    { id: 2, name: "عمر الخطيب" },
    { id: 3, name: "عبد الله سعيد" },
    { id: 4, name: "يوسف عبيد" },
    { id: 5, name: "أحمد حسن" },
    { id: 6, name: "سامي علي" },
    { id: 7, name: "نادر حسين" },
    { id: 8, name: "ماجد عوض" },
    { id: 9, name: "أكرم خالد" },
    { id: 10, name: "فادي محمد" },
  ];

  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedForPublish, setSelectedForPublish] = useState([]);

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

  const handleEdit = (row) => {
    console.log("Editing:", row);
    // Add your edit logic here
  };

  const handleDelete = (row) => {
    setSelectedRow(row); //the row to be deleted
    setShowDialog(true); //the delete confirmation dialog
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedRow(null);
  };

  const handleDialogConfirm = () => {
    console.log("Deleted row:", selectedRow);
    //add logic to remove the row from your data
    setShowDialog(false);
    setSelectedRow(null);
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
    alert("تم نشر البيانات بنجاح!");
  };
  const handleQuizClick = () => {
 
    // navigate("/ExamForm", { state: { studentId: student.id } });
    navigate("../ExamForm");
  };

  return (
    <>
      <Dashboard_SubTitle title="الاختبارات" />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">اسم الطالب</TableCell>
              <TableCell align="center">الاختبار</TableCell>
              <TableCell align="center">علامة الطالب</TableCell>
              <TableCell align="center">الملاحظات</TableCell>
              <TableCell align="center">نشر</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center">{row.name}</TableCell>
                {/* Exam Dialog */}
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleQuizClick(row)}
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

                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEdit(row)}
                    sx={{ color: "blue" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(row)} 
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
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

      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد أنك تريد حذف اختبار الطالب:{" "}
            <strong>{selectedRow?.name}</strong>؟
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
    </>
  );
};

export default ExamTable;
