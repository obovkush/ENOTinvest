import React from 'react';
import { Grid } from '@mui/material';

function HomePage() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}></Grid>
        <Grid item xs={6} md={4}></Grid>
        <Grid item xs={6} md={8}></Grid>
      </Grid>
    </>
  );
}

export default HomePage;
