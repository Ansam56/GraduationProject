import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, IconButton, Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonDialog from "../commonDialog/CommonDialog";
//بضل نربط الحذف والتعديل مع الباك 
//وذلك باستخدام cntext
//وبضل شغلة اضافة سكرول لما نصغر الشاشة ضروري

// Define an RTL theme
const theme = createTheme({
  direction: "rtl",
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#688860",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1rem",
        },
        body: {
          fontSize: "1rem",
        },
      },
    },
  },
});

export default function ReportTable({ columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
 //for Details Dialog
 const [openDialog, setOpenDialog] = React.useState(false); // حالة للتحكم في فتح وإغلاق الـ Dialog
 const [details, setDetails] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //for Details Dialog 
    const openDetailsDialog= (notes)=> {
      setDetails(notes);
      setOpenDialog(true); // فتح الـ Dialog 
    };
  
    const closeDetailsDialog = () => {
      setOpenDialog(false); // إغلاق الـ Dialog
      setDetails("");
    };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2 }}>
        <Paper sx={{ width: "100%" }}>
          {/* TablePagination at the top */}
          <Box
            sx={{
              display: "flex",
              padding: "8px 16px",
              borderBottom: "none",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="عدد الصفوف لكل صفحة:"
              labelDisplayedRows={({ from, to, count }) =>
                `عرض ${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
              }
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                  {
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  },
              }}
            />
          </Box>

          {/* Table with scroll on the right */}
          <TableContainer
            sx={{
              maxHeight: 440,
              maxWidth: "100%",
              direction: "ltr",
              overflowY: "auto",
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                width: "10px",
                backgroundColor: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table ">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center" // Center align the header cells
                      //   style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="center">
                            {column.id === "rating" ? (
                              <Rating
                                name={`rating-${row.code}`}
                                value={value}
                                readOnly
                                precision={0.5}
                              />
                            ) : column.id === "operations" ? (
                              // and role == teacher
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: 1,
                                }}
                              >
                                {/* Edit Icon */}
                                <Box
                                  component="span"
                                  sx={{
                                    cursor: "pointer",
                                    color: "blue", // Change color to blue
                                    marginRight: "8px", // Add some spacing between icons
                                  }}
                                  onClick={() =>
                                    console.log(
                                      `Edit clicked for row ${row.code}`
                                    )
                                  }
                                >
                                  <EditIcon />
                                </Box>

                                {/* Delete Icon */}
                                <Box
                                  component="span"
                                  sx={{
                                    cursor: "pointer",
                                    color: "red", // Change color to red
                                  }}
                                  onClick={() =>
                                    console.log(
                                      `Delete clicked for row ${row.code}`
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </Box>
                              </Box>
                            ) : column.id === "notes" && row.notes!=""? (  
                              <IconButton onClick={() => openDetailsDialog(row.notes)} >
                              <SearchIcon/>
                            </IconButton>
                            ):value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                } 
              </TableBody> 
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      {openDialog && <CommonDialog open={openDialog} onClose={closeDetailsDialog} width="xs" title="الملاحظات" content={details} />
       }
    </ThemeProvider> 
         
  );
}
