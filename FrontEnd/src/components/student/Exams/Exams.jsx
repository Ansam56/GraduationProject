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
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Pagination,
  Box,
} from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import CloseIcon from "@mui/icons-material/Close";
import Dashboard_SubTitle from "../../pages/dashboardSubTitle/Dashboard_SubTitle";
import { UserContext } from "../../context/UserContext";
import Loader from "../../pages/loader/Loader";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { userToken } = useContext(UserContext);

  const getDayName = (dateString) => {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/student/getExams`,
          {
            method: "GET",
            headers: {
              Authorization: `Tuba__${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch exams");

        const data = await response.json();
        console.log("Fetched exams:", data);

        if (data.exams && Array.isArray(data.exams)) {
          setExams(data.exams);
        } else {
          throw new Error("Invalid response format: Expected an 'exams' array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [userToken]);
  if (loading) {
    return <Loader />;
  }

  if (loading) return <Typography>Loading exams...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const sortedExams = Array.isArray(exams)
    ? exams.sort((a, b) => {
        if (a.done === false && b.done !== false) return -1;
        if (b.done === false && a.done !== false) return 1;
        return new Date(a.examDate) - new Date(b.examDate);
      })
    : [];

  const totalPages = Math.ceil(sortedExams.length / rowsPerPage);
  const paginatedRows = sortedExams.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (event, value) => setCurrentPage(value);

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
                <TableCell align="center">{exam.subject}</TableCell>
                <TableCell align="center">{exam.examDate}</TableCell>
                <TableCell align="center">
                  {getDayName(exam.examDate)}
                </TableCell>
                <TableCell align="center">{exam.examTime}</TableCell>
                <TableCell align="center">
                  {exam.done === true ? (
                    <Typography color="primary">{exam.mark}</Typography>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell align="center">
                  {exam.done === true ? (
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDialog(exam.note)}
                    >
                      <NoteIcon />
                    </IconButton>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell align="center">
                  {exam.done === false ? (
                    <Link
                      href={exam.examLink}
                      target="_blank"
                      rel="noopener"
                      color="primary"
                    >
                      دخول
                    </Link>
                  ) : (
                    "-"
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
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            maxWidth: "90%",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#688860",
            color: "white",
            textAlign: "right",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            padding: "12px 16px",
          }}
        >
          الملاحظات
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              color: "white",
              "&:hover": { color: "#f0f0f0" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "right",
            fontSize: "1rem",
            padding: "16px",
          }}
        >
          <Typography>{currentNotes}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Exams;
