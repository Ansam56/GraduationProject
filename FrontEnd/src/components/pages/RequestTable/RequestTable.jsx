// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   Box,
//   Pagination,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";

// const RequestTable = ({ columns, data = [], actions, renderDialogContent }) => {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   //calculate total pages based on data length and rows per page
//   const totalPages =
//     data && Array.isArray(data) && rowsPerPage > 0
//       ? Math.ceil(data.length / rowsPerPage)
//       : 1;
//   const paginatedData = Array.isArray(data)
//     ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
//     : [];

//   const handleOpenDialog = (row) => {
//     setSelectedRequest(row);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedRequest(null);
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell
//                   key={col.key}
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#333",
//                     padding: "10px",
//                   }}
//                 >
//                   {col.title}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row) => (
//               <TableRow key={row.id} hover>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     align="center"
//                     sx={{
//                       padding: "10px",
//                       borderBottom: "1px solid #e0e0e0",
//                       color: "#555",
//                     }}
//                   >
//                     {col.key === "details" ? (
//                       <IconButton onClick={() => handleOpenDialog(row)}>
//                         <SearchIcon />
//                       </IconButton>
//                     ) : (
//                       row[col.key]
//                     )}
//                   </TableCell>
//                 ))}
//                 {actions && (
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       onClick={() => actions.accept(row)}
//                     >
//                       قبول
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => actions.reject(row)}
//                       sx={{ mr: 2 }}
//                     >
//                       رفض
//                     </Button>
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//           sx={{
//             "& .MuiPaginationItem-previousNext": {
//               transform: "rotateY(180deg)",
//             },
//           }}
//         />
//       </Box>

//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>
//           التفاصيل
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseDialog}
//             sx={{ position: "absolute", left: 8, top: 8, color: "#555" }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           {selectedRequest && renderDialogContent(selectedRequest)}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default RequestTable;

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
  DialogContentText,
  Box,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const RequestTable = ({ columns, data = [], actions, renderDialogContent }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages =
    Array.isArray(data) && rowsPerPage > 0
      ? Math.ceil(data.length / rowsPerPage)
      : 1;

  const paginatedData = Array.isArray(data)
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  const handleOpenDialog = (row) => {
    setSelectedRequest(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRequest(null);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align="center"
                  sx={{ fontWeight: "bold", color: "#333", padding: "10px" }}
                >
                  {col.title}
                </TableCell>
              ))}
              {actions && (
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#333", padding: "10px" }}
                >
                  الإجراءات
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{
                      padding: "10px",
                      borderBottom: "1px solid #e0e0e0",
                      color: "#555",
                    }}
                  >
                    {col.key === "details" ? (
                      <IconButton onClick={() => handleOpenDialog(row)}>
                        <SearchIcon />
                      </IconButton>
                    ) : (
                      row[col.key]
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">
                    {row.status !== "مقبول" && row.status !== "مرفوض" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => actions.accept(row)}
                        >
                          قبول
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => actions.reject(row)}
                          sx={{ mr: 2 }}
                        >
                          رفض
                        </Button>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 0 && (
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
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          التفاصيل
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", left: 8, top: 8, color: "#555" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && typeof renderDialogContent === "function"
            ? renderDialogContent(selectedRequest)
            : "No details available"}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestTable;
