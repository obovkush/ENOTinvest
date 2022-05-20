import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Diagram from '../Diagram/Diagram'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  LinearProgress,
  Box,
  Grid,
  Paper,
  TableRow,
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

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography>
                      Некоторая информация: цифры и буквы
                      </Typography>
                      <br />
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Diagram />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Информация о компании
                  </Typography>
                  <br />
                  <Typography sx={{ fontSize: 12 }}>
                  ПАО Сберба́нк — российский финансовый конгломерат, крупнейший универсальный банк России и Восточной Европы. По итогам 2019 года у Сбербанка 96,2 миллионов активных частных клиентов и 2,6 миллиона активных корпоративных клиентов. Среди крупнейших банков мира по размеру активов находится в восьмом десятке. Включён Банком России в перечень системно значимых кредитных организаций. Владельцем 50 % плюс 1 акция ПАО «Сбербанк» является Фонд национального благосостояния России, контролируемый Правительством России, остальные акции находятся в публичном обращении. Рыночная капитализация на август 2021 года составляла 7,3 триллиона рублей. В 2021 году ценность бренда Сбербанка выросла до 730,6 миллиардов рублей. С 2017 года Сбербанк удерживает первую позицию в рейтинге наиболее дорогих брендов в России, который составляет компания Brand Finance. Сбербанк — самый востребованный банк среди розничных клиентов, его услугами пользуется большинство жителей России, его объёмы розничного бизнеса в несколько раз больше ближайшего конкурента — «Банка ВТБ».
                  </Typography>
                </Grid>
              </Grid>

              
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
