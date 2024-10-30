import React from 'react';
import { Container, Grid, Typography, TextField, Button, IconButton, Drawer, Tabs, Tab, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  return (
    <Container>
      <Box sx={{ marginLeft: '240px', padding: '20px' }}>
        <Tabs value={0}>
          <Tab label="معلومات المدرسة" />
          <Tab label="المعلومات الشخصية" />
        </Tabs>
        
        <Box sx={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">معلومات المدرسة</Typography>
              <IconButton><EditIcon /></IconButton>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="اسم المدرسة" variant="outlined" />
            </Grid>
            {/* بقية الحقول */}
            
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary">حفظ التعديلات</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;

