import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
} from '@mui/material';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { Badge } from 'antd';

const currencies = [
  {
    value: 'Все',
    label: 'Все',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },

];

function StockAccordion() {
  const [stocksData, setStocksData] = useState({});

  // useEffect(() => {
  //   !stocksData.securities &&
  //     fetch(
  //       `https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json`,
  //     )
  //       .then((data) => data.json())
  //       .then((data) => setStocksData(data));
  // }, [stocksData]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/stocks/stocksRU`, {
      method: 'GET',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((data) => setStocksData(data));
  }, []);
  console.log(stocksData);

  // let filterMarketData;
  // if (stocksData.marketdata) {
  //   filterMarketData = stocksData.marketdata.data.filter((el) =>
  //     demoStocks.includes(el[0]),
  //   );
  // }
  // let filterSecurities;
  // if (stocksData.securities) {
  //   filterSecurities = stocksData.securities.data.filter((el) =>
  //     demoStocks.includes(el[0]),
  //   );
  // }
  // console.log(filterMarketData);
  // console.log(filterSecurities);

  // const oneStockMarketData = filterMarketData[0] || [];
  // const oneStockSecurities = stocksData?.securities?.data[0] || [];
  // const tiker = oneStockSecurities[0] || 'нет данных';
  // const companyName = oneStockSecurities[2] || 'нет данных';
  // const currentPrice = oneStockMarketData[12] || 'нет данных';
  // const prevPrice = oneStockSecurities[3] || 'нет данных';
  // const diffPrice = Number(currentPrice) - Number(prevPrice) || 'нет данных';
  // const diffPercent =
  //   ((diffPrice / prevPrice) * 100).toFixed(2) || 'нет данных';

  // let isGrow = diffPrice > 0 ? true : false;

  const [currency, setCurrency] = React.useState('Все');
  const [expanded, setExpanded] = useState(false);
  const [fullStocksENG, setStocksENG] = useState('');

  const moneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  // useEffect(() => {
  //   fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=MVOp2FJDsLDLqEmq1t6tYy8hXro8YgUh', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.results);
  //     })
  //     .catch((err) => console.log('stocks GET =>', err));
  // });

  useEffect(() => {
    fetch('http://localhost:5000/api/stocks/stocksENG', {
      method: 'GET',
      // withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStocksENG(data);
      })
      .catch((err) => console.log('stocks GET =>', err));
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Button>Получить данные</Button>
       {/* <div>
       <TextField
          id="outlined-select-currency"
          select
          label="Валюта"
          value={currency}
          onChange={moneyChange}
          helperText="Выберите фильтр по валюте"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div> */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <Badge.Ribbon placement="start" text="AAPL" color="red">
          <AccordionSummary
            expandIcon={<AddTaskOutlinedIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: 'pink',
              color: 'red',
              padding: '0 30px 0 70px',
            }}
          >
            <StraightOutlinedIcon
              fontSize="small"
              sx={{ transform: 'rotate(135deg)' }}
            />
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Apple Inc.
            </Typography>
            <Typography title="Текущая цена" sx={{ width: '20%' }}>
              {fullStocksENG.c}$
            </Typography>
            <Typography title="Дневной прирост" sx={{ width: '20%' }}>
              -2,67$
            </Typography>
            <Typography
              title="Процент изменения за день"
              sx={{
                width: '20%',
                color: 'red',
              }}
            >
              -1,23%
            </Typography>
          </AccordionSummary>
        </Badge.Ribbon>
        <AccordionDetails>
          <Typography>Здесь будет график</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <Badge.Ribbon placement="start" text="SBER" color="green">
          <AccordionSummary
            expandIcon={<AddTaskOutlinedIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: 'palegreen',
              color: 'green',
              padding: '0 30px 0 70px',
            }}
          >
            <StraightOutlinedIcon
              fontSize="small"
              sx={{ transform: 'rotate(45deg)' }}
            />
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Сбербанк ПАО
            </Typography>
            <Typography title="Текущая цена" sx={{ width: '20%' }}>
              153.70&#8381;
            </Typography>
            <Typography title="Дневной прирост" sx={{ width: '20%' }}>
              +4&#8381;
            </Typography>
            <Typography
              title="Процент изменения за день"
              sx={{
                width: '20%',
              }}
            >
              +3.5%
            </Typography>
          </AccordionSummary>
        </Badge.Ribbon>
        <AccordionDetails>
          <Typography>Здесь будет график</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <Badge.Ribbon
          placement="start"
          // text={tiker}
          // color={isGrow ? 'green' : 'red'}
        >
          <AccordionSummary
            expandIcon={<AddTaskOutlinedIcon />}
            aria-controls="panel3bh-content"
            id="panel3Sbh-header"
            sx={{
              // backgroundColor: isGrow ? 'palegreen' : 'pink',
              // color: isGrow ? 'green' : 'red',
              padding: '0 30px 0 70px',
            }}
          >
            <StraightOutlinedIcon
              fontSize="small"
              // sx={{ transform: isGrow ? 'rotate(45deg)' : 'rotate(135deg)' }}
            />
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {/* {companyName} */}
            </Typography>
            <Typography title="Текущая цена" sx={{ width: '20%' }}>
              {/* {currentPrice}&#8381; */}
            </Typography>
            <Typography title="Дневной прирост" sx={{ width: '20%' }}>
              {/* {diffPrice}&#8381; */}
            </Typography>
            <Typography
              title="Процент изменения за день"
              sx={{
                width: '20%',
              }}
            >
              {/* {diffPercent}% */}
            </Typography>
          </AccordionSummary>
        </Badge.Ribbon>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <Badge.Ribbon placement="start" text="AAPL">
          <AccordionSummary
            expandIcon={<AddTaskOutlinedIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ padding: '0 30px 0 70px' }}
          >
            <StraightOutlinedIcon fontSize="small" />
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Apple Inc.
            </Typography>
            <Typography
              title="Текущая цена"
              sx={{ width: '20%', color: 'text.secondary' }}
            >
              34$
            </Typography>
            <Typography
              title="Дневной прирост"
              sx={{ width: '20%', color: 'text.primary' }}
            >
              +4$
            </Typography>
            <Typography
              title="Процент изменения за день"
              sx={{
                width: '20%',
                color: 'text.primary',
              }}
            >
              2%
            </Typography>
          </AccordionSummary>
        </Badge.Ribbon>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default StockAccordion;
