import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import style from './ScrollDialog.module.css'
import { Alert } from '@mui/material';
import Circles from '../circles/Circles';

export default function ScrollDialog({ open, onClose }) {
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper" // Set to "paper" by default
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth // Makes the dialog full width
      maxWidth="lg" // Sets the dialog to large size
    >
      <div className='d-flex justify-content-between'>
      <DialogTitle id="scroll-dialog-title">حلقات ملتقى القرآن الكريم (جامعة فلسطين التقنية خضوري_طولكرم)</DialogTitle>

      <DialogActions className={`${style.dialogActions}`}>
      <CloseIcon onClick={onClose} sx={{ fontSize: 30 }} />
      </DialogActions>
      </div>

      <DialogContent dividers>
        <DialogContent
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
         {/* <Alert variant="outlined" severity="info">لا يوجد حلقات</Alert> */}
          <Circles/>
        </DialogContent>
      </DialogContent>
  
    </Dialog>
  );
}
