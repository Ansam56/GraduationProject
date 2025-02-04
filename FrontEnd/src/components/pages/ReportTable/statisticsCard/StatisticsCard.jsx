import React from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function StatisticsCard({statisticsContent}) {
  return (
    <>
      
         <Grid container style={{ marginTop: '20px',width:'40%' }}   > 
        <Card  style={{ backgroundColor: '#f9f9f9',width:'100%' }}>
          <CardContent> 
            {statisticsContent.map((content,index)=>(
               <Typography key={index} variant="h5" style={{ marginBottom: '8px' }} className="  d-flex justify-content-between">
               <strong>{content.label} :</strong>
               <p className="m-0">{content.number}</p>
               </Typography>
            ))} 
          </CardContent>
        </Card> 
    </Grid>
    </>
  )
}
/*
      <Grid container spacing={3} sx={{ marginTop: "20px", width: "100%", justifyContent: "center" }}>
  {statisticsContent.map((content, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        sx={{
          backgroundColor: "#f9f9f9",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
          {content.label}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginTop: "8px", fontSize: "1.2rem" }}>
          {content.number}
        </Typography>
      </Card>
    </Grid>
  ))}
</Grid>
*/
