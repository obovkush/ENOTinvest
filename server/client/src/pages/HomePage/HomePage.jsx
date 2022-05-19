import React from 'react';
import { Grid } from '@mui/material';
import SliderForNewsAndYouTube from '../../components/SliderForNewsAndYouTube/SliderForNewsAndYouTube';
import StockAccordion from '../../components/StockAccordion/StockAccordion';

function HomePage() {
  return (
    <>
      <Grid container spacing={2} pt={2} >
        <Grid item xs={8} md={9}>
          <h1>
            Лучший рост за сегодня
          </h1>
        <StockAccordion />
        <h1>
            Лучшее падение за сегодня
          </h1>
          <StockAccordion />
          <h1>
            Акции за которыми следит твоя мама
          </h1>
          <StockAccordion />
          
        </Grid>
        <Grid item xs={4} md={3} >
          <SliderForNewsAndYouTube />
        </Grid>
      </Grid>
      
    </>
  );
}

export default HomePage;
