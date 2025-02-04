import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import style from './CommonDialog.module.css'
import { CircularProgress } from '@mui/material';

export default function CommonDialog({ open, onClose ,width,title,content,actions,actionFunction }) {
  const [loading ,setLoading]=useState(false);

  const handleConfirmAction = async() => {
      setLoading(true);
      await actionFunction(); // Invoke the passed action function 
      setLoading(false);  
      onClose(); // Invoke the onClose function to close the dialog 
  };

  return (
    <div>
   
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description" 
        fullWidth // Makes the dialog full width
        maxWidth={width}// Sets the dialog to large size 
      >
       <div className={`d-flex justify-content-between ${style.title_and_closeIcon} `}>
      <DialogTitle  className={`${style.title} custom-text`}  id="dialog-title">{title}</DialogTitle> 
      <DialogActions className={`${style.dialogActions}`}>
      <CloseIcon onClick={onClose} sx={{ fontSize: 30 }} />
      </DialogActions>
      </div>
         
          <DialogContent id="dialog-description" className={`${style.content} custom-text`}>
          {content}
          </DialogContent>
       
        <DialogActions>
        {actions && (
  <>
    <Button 
      onClick={onClose} 
      color="primary" 
      className={`${style.content} custom-text`}
    >
      إلغاء
    </Button>
    <Button 
      onClick={handleConfirmAction} 
      color="error" 
      autoFocus  
      className={`${style.content} custom-text`}
    >
      {loading? <CircularProgress  color="inherit" size={20} />:actions}
       
    </Button>
  </>
        )}
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
