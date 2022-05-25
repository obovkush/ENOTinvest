import React from 'react';
import { Grid } from '@mui/material';
import SliderForNewsAndYouTube from '../../components/SliderForNewsAndYouTube/SliderForNewsAndYouTube';
import Best from '../../components/StocksPacks/Best';
import Worst from '../../components/StocksPacks/Worst';
import MainPageHeader from '../../components/MainPageHeader/MainPageHeader';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function HomePage() {

  const informationForCards = [
    {
      name: 'firstCard',
      displayName: 'Главная',
      color: '#ca441a',
      info: 1000,
      additionalInfo: 'Состояние портфеля',
      icon: <BusinessCenterIcon sx={{ fill: '#ffffff', fontSize: 30 }} />,
    },
    {
      name: 'secondCard',
      displayName: 'Акции',
      color: '#f07800',
      info: 2000,
      additionalInfo: 'Состав кошелька',
      icon: <AccountBalanceWalletIcon sx={{ fill: '#ffffff', fontSize: 30 }} />,
    },
    {
      name: 'thirdCard',
      displayName: 'Портфель',
      color: '#ffa801',
      info: 3000,
      additionalInfo: 'Результаты акций',
      icon: <ShowChartIcon sx={{ fill: '#ffffff', fontSize: 30 }} />,
    },
  ]

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
            {informationForCards.map(elem => {
              return (
                <MainPageHeader elem={elem} />
              )
            })
            }
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
