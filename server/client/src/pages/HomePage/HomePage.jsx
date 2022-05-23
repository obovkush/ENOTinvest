import React from 'react';
import { Grid } from '@mui/material';
import SliderForNewsAndYouTube from '../../components/SliderForNewsAndYouTube/SliderForNewsAndYouTube';
import StockAccordion from '../../components/StockAccordion/StockAccordion';
import Best from '../../components/StocksPacks/Best';
import Worst from '../../components/StocksPacks/Worst';

function HomePage() {
  return (
    <>
      <Grid container spacing={2} pt={2} >
        <Grid item xs={12} sm={12} md={12} lg={7} xl={8}>
          <h1>
            Лучшие акции за сегодня
          </h1>
          <Best />
          <h1>
            Лучшие падения за сегодня
          </h1>
          <Worst />
  
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={5} xl={4}>
          <SliderForNewsAndYouTube />
        </Grid>
      </Grid>

    </>
  );
}

export default HomePage;
