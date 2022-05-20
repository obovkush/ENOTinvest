import React from 'react';
import { Grid } from '@mui/material';
import SliderForNewsAndYouTube from '../../components/SliderForNewsAndYouTube/SliderForNewsAndYouTube';
import StockAccordion from '../../components/StockAccordion/StockAccordion';

function HomePage() {
  return (
    <>
      <Grid container spacing={2} pt={2} >
        <Grid item xs={12} sm={12} md={12} lg={7} xl={8}>
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
        <Grid item xs={12} sm={12} md={7} lg={5} xl={4}>
          <SliderForNewsAndYouTube />
        </Grid>
      </Grid>

    </>
  );
}

export default HomePage;
