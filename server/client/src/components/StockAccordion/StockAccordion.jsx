import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';

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
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/stocks/ru`)
      .then(({ data }) => {
        if (data.length) {
          dispatch({ type: 'SET_ALL_STOCKS', payload: data });
          setLoading(false);
        }
      });
    }, []);

  // Функция проверки значений (определеяем выросла цена или упала, от этого зависят стили)
  const isGrow = (num) => num > 0;

  const [currency, setCurrency] = React.useState('Все');
  const [expanded, setExpanded] = useState(false);
  const [fullStocksENG, setStocksENG] = useState('');

  const moneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  
  // данные за 2 года
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {stocks && stocks.map((el, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${el.id}`}
            onChange={handleChange(`panel${el.id}`)}
            key={index}
          >
            <Badge.Ribbon placement="start" text={el.secid} color={el.lastchange > 0 ? 'green' : 'red'}>
              <AccordionSummary
                expandIcon={<AddTaskOutlinedIcon />}
                aria-controls={el.id}
                id={el.id}
                sx={{
                  backgroundColor: `${el.lastchange > 0 ? 'palegreen' : 'pink'}`,
                  color: `${el.lastchange > 0 ? 'green' : 'red'}`,
                  padding: '0 30px 0 70px',
                }}
              >
                <StraightOutlinedIcon
                  fontSize="small"
                  sx={{ transform: 'rotate(135deg)' }}
                />
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {el?.shortName}
                </Typography>
                <Typography title="Текущая цена" sx={{ width: '20%' }}>
                  {el.last.toFixed(2)}$
                </Typography>
                <Typography title="Дневной прирост" sx={{ width: '20%' }}>
                  {el.lastchange.toFixed(2)}$
                </Typography>
                <Typography
                  title="Процент изменения за день"
                  sx={{
                    width: '20%',
                    color: `${el.lastchange > 0 ? 'green' : 'red'}`,
                  }}
                >
                  {el.lastchange > 0 ?
                    (<>+{-((el.prevprice - el.last) / el.last * 100).toFixed(2)}%</>)
                    : (<>-{((el.prevprice - el.last) / el.last * 100).toFixed(2)}%</>)
                  }
                </Typography>
              </AccordionSummary>
            </Badge.Ribbon>
            <AccordionDetails>
              <Typography>Здесь будет график</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}

      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

export default StockAccordion;
