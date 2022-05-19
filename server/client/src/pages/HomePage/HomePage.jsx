import React from 'react';
import { Grid } from '@mui/material';
import NewsBlock from '../../components/NewsBlock/NewsBlock';
import SliderForNewsAndYouTube from '../../components/SliderForNewsAndYouTube/SliderForNewsAndYouTube';

function HomePage() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}></Grid>

        <Grid item xs={6} md={4}>
          <SliderForNewsAndYouTube />
        </Grid>

        <Grid item xs={6} md={8}></Grid>
      </Grid>
    </>
  );
}

export default HomePage;
