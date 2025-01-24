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
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";

const Exams = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Mocked Data
  const exams = [
    {
      id: 1,
      name: "جزء عم",
      date: "2024-12-25",
      day: "الاثنين",
      time: "10:00 صباحًا",
      status: "completed",
      grade: 90,
      notes: "عدم الالتزام بأحكام القلقة والتسرع في التلاوة",
      link: "https://example.com/math-exam",
    },
    {
      id: 2,
      name: "سورة النور",
      date: "2024-12-28",
      day: "الخميس",
      time: "1:00 مساءً",
      status: "upcoming",
      link: "https://example.com/english-exam",
    },
    {
      id: 3,
      name: "سورة البقرة",
      date: "2024-12-22",
      day: "الأحد",
      time: "11:00 صباحًا",
      status: "completed",
      grade: 85,
      notes:
        "عدم الالتزام بأحكام الادغام في بضع مواضع والرجاء التركيز على أحكام الاقلاب",
      link: "https://example.com/science-exam",
    },
    {
      id: 4,
      name: "سورة الواقعة",
      date: "2024-12-22",
      day: "الأحد",
      time: "11:00 صباحًا",
      status: "completed",
      grade: 100,
      notes:
        "عدم الالتزام بأحكام الادغام في بضع مواضع والرجاء التركيز على أحكام الاقلاب",
      link: "https://example.com/science-exam",
    },
    {
      id: 5,
      name: "سورة النبأ",
      date: "2024-12-22",
      day: "الأحد",
      time: "11:00 صباحًا",
      status: "completed",
      grade: 95,
      notes:
        "عدم الالتزام بأحكام الادغام في بضع مواضع والرجاء التركيز على أحكام الاقلاب",
      link: "https://example.com/science-exam",
    },
    {
      id: 6,
      name: "سورة النساء",
      date: "2024-12-30",
      day: "الجمعة",
      time: "10:00 صباحًا",
      status: "upcoming",
      link: "https://example.com/quran-exam",
    },
  ];

  const sortedExams = exams.sort((a, b) => {
    if (a.status === "upcoming" && b.status !== "upcoming") return -1;
    if (b.status === "upcoming" && a.status !== "upcoming") return 1;
    if (a.status === "upcoming" && b.status === "upcoming") {
      return new Date(b.date) - new Date(a.date);
    }
    if (a.status === "completed" && b.status === "completed") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedExams.length / rowsPerPage);
  const paginatedRows = sortedExams.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (notes) => {
    setCurrentNotes(notes);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentNotes("");
  };

  return (
    <>
      <Dashboard_SubTitle title="الاختبارات" />
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">الاختبار</TableCell>
              <TableCell align="center">تاريخ الاختبار</TableCell>
              <TableCell align="center">يوم الاختبار</TableCell>
              <TableCell align="center">وقت الاختبار</TableCell>
              <TableCell align="center">العلامة</TableCell>
              <TableCell align="center">الملاحظات</TableCell>
              <TableCell align="center">رابط الدخول للاختبار</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((exam) => (
              <TableRow key={exam.id} hover>
                <TableCell align="center">{exam.name}</TableCell>
                <TableCell align="center">{exam.date}</TableCell>
                <TableCell align="center">{exam.day}</TableCell>
                <TableCell align="center">{exam.time}</TableCell>
                <TableCell align="center">
                  {exam.status === "completed" ? (
                    <Typography color="primary">{exam.grade}</Typography>
                  ) : (
                    <Typography color="text.secondary">-</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {exam.status === "completed" ? (
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDialog(exam.notes)}
                    >
                      <NoteIcon />
                    </IconButton>
                  ) : (
                    <Typography color="text.secondary">-</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {exam.status === "upcoming" ? (
                    <Link
                      href={exam.link}
                      target="_blank"
                      rel="noopener"
                      color="primary"
                    >
                      دخول
                    </Link>
                  ) : (
                    <Typography color="text.secondary">-</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>الملاحظات</DialogTitle>
        <DialogContent>
          <Typography>{currentNotes}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Exams;
