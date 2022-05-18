import React from 'react';
import { Grid } from '@mui/material';
import YoutubeBlock from '../../components/YoutubeBlock/YoutubeBlock';
import NewsBlock from '../../components/NewsBlock/NewsBlock';

function HomePage() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}></Grid>
        <Grid item xs={6} md={4}></Grid>
        <Grid item xs={6} md={8}></Grid>
      </Grid>
      <YoutubeBlock />
      <NewsBlock />
    </>
  );
}

export default HomePage;
