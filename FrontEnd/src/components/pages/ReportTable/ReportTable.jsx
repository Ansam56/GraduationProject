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
import { Box, IconButton, Rating, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonDialog from "../commonDialog/CommonDialog";
import StatisticsCard from "./statisticsCard/StatisticsCard";
//بضل نربط الحذف والتعديل مع الباك
//وذلك باستخدام context
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

export default function ReportTable({ columns, rows ,role }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //for Details Dialog
  const [openDialog, setOpenDialog] = React.useState(false); // حالة للتحكم في فتح وإغلاق الـ Dialog
  const [details, setDetails] = React.useState("");
  //range of date filter
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [minDate, setMinDate] = React.useState("");
  const [maxDate, setMaxDate] = React.useState("");
//for date errors
const [dateError, setDateError] = React.useState("");
 
 // Statistics states

 const [statistics, setStatistics] = React.useState({
  savedPages: 0,
  revisionPages: 0,
  tathbeetPages: 0,
});
 //هاي بدنا نبعتها للكومبوننت كارد الاحصائيات
 const statisticsContent = [
  { label: "عدد صفحات الحفظ", number: statistics.savedPages },
  { label: "عدد صفحات المراجعة", number: statistics.revisionPages },
  { label: "عدد صفحات التثبيت", number: statistics.tathbeetPages },
];
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //for Details Dialog
  const openDetailsDialog = (notes) => {
    setDetails(notes);
    setOpenDialog(true); // فتح الـ Dialog
  };

  const closeDetailsDialog = () => {
    setOpenDialog(false); // إغلاق الـ Dialog
    setDetails("");
  };
  //range of date filter
  const handleDateFilter = () => {
    //  user has not selected any date filters
    if (!minDate && !maxDate) {
      setFilteredRows(rows);
      return;
    }

    const filtered = rows.filter((row) => {
      const rowDate = new Date(row.AchaievementDate); // Ensure your row contains a `date` field
      const min = minDate ? new Date(minDate) : null;
      const max = maxDate ? new Date(maxDate) : null;

      return (!min || rowDate >= min) && (!max || rowDate <= max);
    });

    setFilteredRows(filtered);
  };
 
  React.useEffect(() => {
    handleDateFilter();
  }, [minDate, maxDate, rows]);

  // Calculate statistics based on filtered rows
  React.useEffect(() => {
    let saved = 0,
      revision = 0,
      tathbeet = 0;

    //لقدام بلزمها تغيير مثلا بشوف الرول اللي اجت من التوكن اذا مدير بعرضله اشي واذا معلم او طالب بعرضلهم اشيي  
  //مبدئيا رح أحط الرول انا لان لسا ما عملنا user context
//role="مدير "
//role="معلم "
// role="طالب"
if (role === "مدير") {
  rows.forEach((row) => {
    saved += row.savedPagesNum ;
    revision += row.revisionPagesNum ;
    tathbeet += row.tathbeetPagesNum ;
  });
}else if(role=="معلم" || role=="طالب"){
  filteredRows.forEach((row) => {
    if (row.AchaievementType === "حفظ") saved += row.pagesNumber;
    else if (row.AchaievementType === "مراجعة") revision += row.pagesNumber;
    else if (row.AchaievementType === "تثبيت") tathbeet += row.pagesNumber;
  });
}
   

    setStatistics({
      savedPages: saved,
      revisionPages: revision,
      tathbeetPages: tathbeet,
    });
  }, [filteredRows, role, rows]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2 }}>
        <Paper sx={{ width: "100%" }} className="pt-1 pb-1 px-2">
          {/* Date filters */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }} className="mt-3">
            <TextField
              label="من التاريخ:"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={minDate}
              onChange={(e) => {
                const selectedDate = e.target.value;
                setMinDate(selectedDate);
//اذا تم تحديد تاريخ النهاية بالاول ثم تحديد قيمة تاريخ البداية بحيث تكون اكبر من تاريخ النهاية ==اعادة ضبط
                if (maxDate && new Date(selectedDate) > new Date(maxDate)) {
                  setMaxDate("");
                }
              }}
               
            />
            <TextField
              label="إلى التاريخ:"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={maxDate}
              onChange={(e) => {
                const selectedDate = e.target.value;

                // السماح فقط إذا كان تاريخ النهاية أكبر أو يساوي تاريخ البداية
                if (minDate && new Date(selectedDate) < new Date(minDate)) {
                  setDateError("لا يمكن أن يكون تاريخ النهاية أقل من تاريخ البداية");
                } else {
                  setDateError(""); // مسح الخطأ
                  setMaxDate(selectedDate);
                }
              }} 
              error={!!dateError} // يظهر الخطأ إذا كانت الرسالة موجودة
              helperText={dateError} // عرض رسالة الخطأ
            />
          </Box>
          {/* -------------------------------------------------- */}

          {filteredRows.length==0?
           <div className="alert alert-info text-center mt-2" role="alert">
           لا توجد بيانات مطابقة لعملية البحث
         </div>
          :
          <>
          {/* عرض الاحصاءات بناء على المعلومات الموجودة بالجدول  */}
         <StatisticsCard statisticsContent={statisticsContent}/>

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
                {filteredRows
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
                            ) : column.id === "notes" && row.notes != "" ? (
                              <IconButton
                                onClick={() => openDetailsDialog(row.notes)}
                              >
                                <SearchIcon />
                              </IconButton>
                            ) : column.id =="AchaievementDate"? (
                              new Date(value).toLocaleDateString("en-GB")
                            ):value}

                          </TableCell> 
                        );
                      })}
                    </TableRow>
                   
                  ))} 
              </TableBody>
            </Table>
          </TableContainer>
          </>
          }
        
        </Paper>
      </Box>
      {openDialog && (
        <CommonDialog
          open={openDialog}
          onClose={closeDetailsDialog}
          width="xs"
          title="الملاحظات"
          content={details}
        />
      )}
    </ThemeProvider>
  );
}
