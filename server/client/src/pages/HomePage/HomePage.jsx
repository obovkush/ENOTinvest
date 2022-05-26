import React from 'react';
import { Grid } from '@mui/material';
import SliderForNewsAndYouTube from '../../components/SliderForNewsAndYouTube/SliderForNewsAndYouTube';
import Best from '../../components/StocksPacks/Best';
import Worst from '../../components/StocksPacks/Worst';
import MainPageHeader from '../../components/MainPageHeader/MainPageHeader';


function HomePage() {

  const cardLineStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  }

  return (
    <>
      <Grid container spacing={2} pt={2} >
        <Grid item xs={12} sm={12} md={12} lg={7} xl={8}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={cardLineStyles}>
                <MainPageHeader />
          </Grid>
          <h1 style={{ marginTop: '1rem' }}>
            Лучшие акции за сегодня
          </h1>
          <Best />
          <h1 style={{ marginTop: '1rem' }}>
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
