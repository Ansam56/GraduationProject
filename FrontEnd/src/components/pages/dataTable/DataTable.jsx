import React, { useEffect, useState } from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'; // DataTable Bootstrap 5 CSS
import $ from 'jquery';
import 'datatables.net-bs5'; // DataTable Bootstrap 5 JavaScript integration
import { Box, Button } from '@mui/material'; // MUI components 
import CommonDialog from './../commonDialog/CommonDialog';
import AddNewAchaievement from '../../teacher/dialogPages/addNewAchaievement/AddNewAchaievement';
import AddIcon from '@mui/icons-material/Add';
 
export default function DataTable() {
  useEffect(() => {
    // Initialize DataTable when the component mounts
    // const dataTable = $('#example').DataTable({
    //   paging: true,
    //   searching: true,
    //   ordering: true,
    //   autoWidth: false,  // Disable automatic column width calculation
    //   columnDefs: [
    //     { width: '16.6%', targets: '_all' } // Make all columns equal width (1/6th of the total width)
    //   ],
    //   drawCallback: function(settings) {
    //     // تطبيق التعديلات على النص داخل الخلايا بعد تحميل أو تغيير الصفحة
    //     $('#example').find('th, td').css({
    //       'text-align': 'center',      // توسيط النص أفقيًا
    //       'vertical-align': 'middle'   // توسيط النص عموديًا
    //     });
    //   }
    // });
    // const dataTable = $('#example').DataTable({
    //   paging: true,
    //   searching: true,
    //   ordering: true,
    //   autoWidth: false,
    //   columnDefs: [
    //     { width: '16.6%', targets: '_all' }
    //   ],
    //   dom: '<"top"flp>rt<"bottom"lp><"clear">',
    //   language: {
    //     search: "بحث:",
    //     lengthMenu: "عرض _MENU_ صفوف"
    //   },
    //   drawCallback: function(settings) {
    //     $('#example').find('th, td').css({
    //       'text-align': 'center',
    //       'vertical-align': 'middle'
    //     });
    //   }
    // });
    const dataTable = $('#example').DataTable({
      paging: true,
      searching: true,
      ordering: true,
      autoWidth: false,
      columnDefs: [
        { width: '16.6%', targets: '_all' }
      ],
      dom: '<"top d-flex justify-content-end align-items-center mb-2 ms-3 "flp>rt<"clear">', // تخصيص تخطيط العناصر
      language: {
        search: "بحث" ,
        lengthMenu: "عرض _MENU_",
        emptyTable: "لا توجد بيانات متاحة في الجدول",
        zeroRecords: "لم يتم العثور على سجلات مطابقة",
      },
      drawCallback: function(settings) {
        $('#example').find('th, td').css({
          'text-align': 'center',
          'vertical-align': 'middle'
        });
      }
    });
     
    // Cleanup DataTable on component unmount
    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, []);

  const tableData = [
    {
      name: 'تالا موقدي',
      gender: 'أنثى', 
      age: 21, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رؤى موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'وسيم موقدي',
      gender: 'ذكر', 
      age: 30, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
    {
      name: 'رغد موقدي',
      gender: 'أنثى', 
      age: 61, 
    },
  ];
  // for Delete Dialog
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false); // حالة للتحكم في فتح وإغلاق الـ Dialog

  const openDeleteDialog = () => {
    setOpenConfirmDeleteDialog(true); // فتح الـ Dialog
  };

  const closeDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false); // إغلاق الـ Dialog
  };

  //for Add Dialog 
  const [openAddAchaievementDialog, setOpenAddAchaievementDialog] = useState(false); // حالة للتحكم في فتح وإغلاق الـ Dialog

  const openAchaievementDialog = () => {
    setOpenAddAchaievementDialog(true); // فتح الـ Dialog
  };

  const closeAchaievementDialog = () => {
    setOpenAddAchaievementDialog(false); // إغلاق الـ Dialog
  };
  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }} className=" py-3"> 
         
      <div className="table-responsive">  {/* Make table responsive using Bootstrap */}
         <Button className='position-absolute' variant="contained" style={{ backgroundColor: '#4CAF50', color: '#fff' }}
           onClick={openAchaievementDialog}  >  تسجيل الحضور والغياب <AddIcon/>
           </Button>
        <table id="example" className="table  table-bordered table-hover" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th className='px-0'>اسم الطالب</th>
              <th className='px-0'>الجنس</th>
              <th className='px-0'>العمر</th>
              <th className='px-0'>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length!=0 && tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.gender}</td> 
                <td>{row.age}</td> 
                <td> 
                <div className=' d-flex justify-content-around'>
                <Button
                      variant="contained"
                      color="error"
                      onClick={openDeleteDialog}
                    >
                      حذف
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#4CAF50', color: '#fff' }}
                      onClick={openAchaievementDialog}
                    >
                      اضافة انجاز يومي جديد
                      <AddIcon/>
                    </Button>
 
                 </div> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            {/* Delete Dialog */}
            {openConfirmDeleteDialog && <CommonDialog open={openConfirmDeleteDialog} onClose={closeDeleteDialog} width="xs" title="تأكيد الحذف" content=" هل تريد حذف هذا العنصر؟"
              actions="delete"/>}
 
            {/* Add new Achaivnment Dialog */} 
             {openAddAchaievementDialog && <CommonDialog open={openAddAchaievementDialog} onClose={closeAchaievementDialog} width="md" title=" اضافة انجاز يومي جديد" content={<AddNewAchaievement/>}  />}

    </Box>
    
  );
}
