import { Avatar, Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import style from './SharedProfile.module.css'
import EditIcon  from '@mui/icons-material/Edit';
import { ErrorToast } from '../toast/toast';
import  DeleteIcon  from '@mui/icons-material/Delete';
import Loader from '../loader/Loader';
import CommonDialog from '../commonDialog/CommonDialog';

export default function SharedProfile({formikHandelSubmit,renderInputs,avatarAlt,previewImage,
    handleFieldChange,handleBlur,pictureErrors,pictureTouched,handleRemovePicture,handelDeleteDisabled,
    loader,formikIsValid,deleteIcon,isDefault}) { 
      
   // for Delete Dialog
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false); // حالة للتحكم في فتح وإغلاق الـ Dialog

  const openDeleteDialog = () => {
    setOpenConfirmDeleteDialog(true); // فتح الـ Dialog
  };

  const closeDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false); // إغلاق الـ Dialog
  };   
  return (
    <form onSubmit={formikHandelSubmit} encType="multipart/form-data" >
          <div className="container">
            <div className="row"> 
               <div className="col-md-4  position-relative">
                                <Box   >
                                    <Avatar
                                        src={previewImage}
                                        alt={avatarAlt}
                                        sx={{
                                            width: 200,
                                            height: 200,
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            marginBottom: '10px',
                                            border: '.1px solid gray', // تحسين الحواف
                                            borderRadius: '50%', // مظهر دائري
                                        }} 
                                    /> 
                                </Box> 
                                 
                       {/* تعديل الصورة */}
                       <div className={`position-absolute top-0   ${style.editIcon}`}>
                                    <label htmlFor="profilePicture" className={`btn  btn-sm ${loader&& "disabled"}`} >
                                        <EditIcon/>  
                                    </label> 
                                    <input type="file" className=" d-none " name="profilePicture" id="profilePicture"   onChange={handleFieldChange} onBlur={handleBlur}  />
                                    {pictureTouched &&pictureErrors&& ErrorToast(pictureErrors) } 
                                    
                                    {/* <input
                                         
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                     
                                    /> */}
                                </div> 
                                  {/* حذف الصورة */}
                                  {deleteIcon=="true"&&<div className={`position-absolute top-0  ${style.deleteIcon} `}>
                                    <button
                                        type="button"
                                        className={`btn btn-danger  btn-sm ${loader&& "disabled"}`}
                                        // onClick={handleRemovePicture}
                                        onClick={openDeleteDialog}
                                        disabled={isDefault} // Disable if profilePicture is null
                                    >
                                        <DeleteIcon/>  
                                    </button>
                                </div>}
                                             
                </div>
              <div className="col-md-8">
              {renderInputs}  
              </div>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                   <button className='rounded-5 border-1 w-50 btn  btn-success ' type='submit' disabled={loader?true:!formikIsValid} >{loader? <CircularProgress  color="inherit" size={20} />:"حفظ التعديلات"}</button> 
                </div>
          </div>
      {/* Delete Dialog */}
                {openConfirmDeleteDialog && <CommonDialog open={openConfirmDeleteDialog} onClose={closeDeleteDialog} width="xs" title="تأكيد الحذف" content=" هل تريد حذف هذه الصورة؟"
                  actions="حذف" actionFunction={handleRemovePicture} />}
    </form>  
  )
}
