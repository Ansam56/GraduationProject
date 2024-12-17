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
