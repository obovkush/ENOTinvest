import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
} from '@mui/material';

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

export default function MainPageHeader() {
  const dispatch = useDispatch();
  const tinkoff = useSelector((state) => state.tinkoff);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const worst = 'worst'
  const best = 'best'

  useEffect(() => {
    tinkoff.length === 3 && setLoading(false)
  }, [tinkoff])
  
  const tikerSearchBest = (best) => {
    const fltr = tinkoff[1].positions.sort((a, b) => a.expected_yield.units - b.expected_yield.units)
    if (best === 'best') {
      return fltr[0].expected_yield.units
    }
    if (fltr[0].instrument_type === 'share') {
      const findTiker = tinkoff[0].instruments.filter((el) => el.figi === fltr[0].figi);
      return findTiker[0].ticker;
    } else if (fltr[0].instrument_type === 'etf') {
      const findTikerEtfs = tinkoff[2].instruments.filter((el) => el.figi === fltr[0].figi);
      return findTikerEtfs[0].ticker;
    } else {
      return 'RUB'
    }
  }

  const tikerSearchWorst = (worst) => {
    const fltr = tinkoff[1].positions.sort((a, b) => a.expected_yield.units - b.expected_yield.units)
    if (worst === 'worst') {
      return fltr[8].expected_yield.units
    }
    if (fltr[8].instrument_type === 'share') {
      const findTiker = tinkoff[0].instruments.filter((el) => el.figi === fltr[8].figi);
      return findTiker[0].ticker;
    } else if (fltr[8].instrument_type === 'etf') {
      const findTikerEtfs = tinkoff[2].instruments.filter((el) => el.figi === fltr[8].figi);
      return findTikerEtfs[0].ticker;
    } else {
      return 'RUB'
    }
  }

  const totalCash = () => {
    return `${(tinkoff[1].total_amount_currencies.units + tinkoff[1].total_amount_etf.units + tinkoff[1].total_amount_shares.units).toLocaleString()} ₽`
  }


  return (
    user.isActivated
      ? <>
      <Card sx={{ width: '32%', backgroundColor: '#ca441a', textAlign: 'center', color: 'white' }}>
      {loading
          ? ''
          : 
        <CardContent>
          {informationForCards[1].icon}
          <Typography variant="h4" component="div">
            {totalCash()}
          </Typography>
          <Typography variant="body2">
            {`Результат за все время ${tinkoff[1].expected_yield.units}%`}
          </Typography>
        </CardContent>
        }
      </Card>
      <Card sx={{ width: '32%', backgroundColor: '#f07800', textAlign: 'center', color: 'white' }}>
      {loading
          ? ''
          : 
      <CardContent >
        {informationForCards[0].icon}
        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
        <Box>
        <Typography sx={{fontSize: '30px'}}>
        {((`${tinkoff[1].total_amount_shares.units}` / (`${tinkoff[1].total_amount_currencies.units +
              tinkoff[1].total_amount_etf.units +
              tinkoff[1].total_amount_shares.units} `)) * 100).toFixed(1)}% 
          </Typography>
          <Typography sx={{fontSize: '20px'}}>
        Акции
        </Typography>
        </Box>
        <Box>
        <Typography sx={{fontSize: '30px'}}>
        {((`${tinkoff[1].total_amount_etf.units}` / (`${tinkoff[1].total_amount_currencies.units +
              tinkoff[1].total_amount_etf.units +
              tinkoff[1].total_amount_shares.units}`)) * 100).toFixed(1)}% 
          </Typography>
          <Typography sx={{fontSize: '20px'}}>
        Фонды
        </Typography>
        </Box>
        <Box>
        <Typography sx={{fontSize: '30px'}}>
        {((`${tinkoff[1].total_amount_currencies.units}` / (`${tinkoff[1].total_amount_currencies.units +
              tinkoff[1].total_amount_etf.units +
              tinkoff[1].total_amount_shares.units}`)) * 100).toFixed(1)}% 
          </Typography>
          <Typography sx={{fontSize: '20px'}}>
        Валюта
        </Typography>
        </Box>
        </Box>
      </CardContent>
  }
    </Card>
      
  <Card sx={{ width: '32%', backgroundColor: '#ffa801', textAlign: 'center', color: 'white' }}>
  {loading
        ? ''
        : 
    <CardContent>
      {informationForCards[2].icon} 
      <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <Box>
      <Typography sx={{fontSize: '30px'}}>
      {tikerSearchBest(best)}
        </Typography>
        <Typography sx={{fontSize: '20px'}}>
      {tikerSearchBest()}
      </Typography>
      </Box>
      <Box>
      <Typography sx={{fontSize: '30px'}}>
      {tikerSearchWorst(worst)}
        </Typography>
        <Typography sx={{fontSize: '20px'}}>
        {tikerSearchWorst()}
      </Typography>
      </Box>
      </Box>
    </CardContent>
}
  </Card>
    </> : <></>
  );
}
