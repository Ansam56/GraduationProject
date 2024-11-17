import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import style from './CommonDialog.module.css'

export default function CommonDialog({ open, onClose ,width,title,content,actions }) {
   
  const handleConfirmDelete = () => {
    // Perform delete action
    console.log('Item deleted');
    {onClose}
  };

  return (
    <div>
   
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description" 
        fullWidth // Makes the dialog full width
        maxWidth={width}// Sets the dialog to large size 
      >
       <div className=' d-flex justify-content-between'>
      <DialogTitle  className={`${style.title} custom-text`}  id="confirm-delete-dialog-title">{title}</DialogTitle> 
      <DialogActions className={`${style.dialogActions}`}>
      <CloseIcon onClick={onClose} sx={{ fontSize: 30 }} />
      </DialogActions>
      </div>
        
        
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description" className={`${style.content} custom-text`}>
          {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {actions === "delete" && (
  <>
    <Button 
      onClick={onClose} 
      color="primary" 
      className={`${style.content} custom-text`}
    >
      إلغاء
    </Button>
    <Button 
      onClick={handleConfirmDelete} 
      color="error" 
      autoFocus  
      className={`${style.content} custom-text`}
    >
      حذف
    </Button>
  </>
        )}
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
