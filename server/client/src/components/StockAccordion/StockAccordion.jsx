import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Diagram from '../Diagram/Diagram'
import { Accordion, AccordionDetails, AccordionSummary, Typography, LinearProgress, Box, Grid, Link } from '@mui/material';
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
  const [filterStocks, setFilterStocks] = useState(stocks);
  const wikiLink = useSelector((state) => state.wikipediaUrl)
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [currency, setCurrency] = useState('Все');
  const [expanded, setExpanded] = useState(false);

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

  const AccordionOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const wikipediaSearch = (elem) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/wikipedia`, {
        secid: elem,
      })
      .then((data) => {
        if (data.data) {
          dispatch({ type: 'SET_LINK_OF_WIKIPEDIA', payload: data.data });
          setLoading(false);
        }
      });
  }

  const moneyChange = (event) => {
    setCurrency(event.target.value);
    if (currency === '$' || currency === '€') {
      const filtrstocks = stocks.filter((el) => el.value === currency);
      setFilterStocks(filtrstocks);
    } else {
      setFilterStocks(stocks);
    }
  };

  const searchStock = (event) => {
    const filtrstocks = stocks.filter(
      (el) =>
        el.secid.slice(0, event.target.value.length) ===
        event.target.value.toUpperCase() || el.shortName.slice(0, event.target.value.length).toLowerCase() ===
        event.target.value.toLowerCase()
    );
    setFilterStocks(filtrstocks);
  };

  const FondsCheck = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      const filtrstocks = stocks.filter((el) => el.type === 'Фонд');
      setFilterStocks(filtrstocks);
    } else {
      setFilterStocks(stocks);
    }
  };

  return (
    <>
      <TextField
        onChange={(value) => searchStock(value)}
        sx={{ width: '180px', paddingBottom: '20px' }}
        id="filled-basic"
        label="Поиск по акциям"
        variant="filled"
      />

      <TextField
        id="standard-select-currency-native"
        sx={{ width: '180px', paddingLeft: '20px', paddingTop: '24px' }}
        select
        value={currency}
        onChange={moneyChange}
        SelectProps={{
          native: true,
        }}
        variant="standard"
      >
        {currencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

      <Checkbox
        checked={checked}
        sx={{ paddingLeft: '20px', paddingTop: '24px' }}
        onChange={FondsCheck}
        inputProps={{ 'aria-label': 'controlled' }}
      />

      {filterStocks.length > 0
        ? filterStocks.map((el, index) => {
          return (
            <Accordion
              expanded={expanded === `panel${el.id}`}
              onChange={AccordionOpen(`panel${el.id}`)}
              key={el.secid}
              onClick={() => wikipediaSearch(el.secid)}
            >
              <Badge.Ribbon
                placement="start"
                text={el.secid}
                color={el.lastchange > 0 ? 'green' : 'red'}
              >
                <AccordionSummary
                  expandIcon={<AddTaskOutlinedIcon />}
                  aria-controls={el.id}
                  id={el.id}
                  sx={{
                    backgroundColor: `${el.lastchange > 0 ? 'palegreen' : 'pink'
                      }`,
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
                    {el.lastchange > 0 ? (
                      <>
                        +
                        {
                          -(
                            ((el.prevprice - el.last) / el.last) *
                            100
                          ).toFixed(2)
                        }
                        %
                      </>
                    ) : (
                      <>
                        -
                        {(((el.prevprice - el.last) / el.last) * 100).toFixed(
                          2,
                        )}
                        %
                      </>
                    )}
                  </Typography>
                </AccordionSummary>
              </Badge.Ribbon>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>
                      Некоторая информация: цифры и буквы
                    </Typography>
                    <br />
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Diagram />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Главные новости
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <a href={wikiLink}>Информация о компании на Wikipedia</a>
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })
        : stocks.map((el, index) => {
          return (
            <Accordion
              expanded={expanded === `panel${el.id}`}
              onChange={AccordionOpen(`panel${el.id}`)}
              key={el.secid}
              onClick={() => wikipediaSearch(el.secid)}
            >
              <Badge.Ribbon
                placement="start"
                text={el.secid}
                color={el.lastchange > 0 ? 'green' : 'red'}
              >
                <AccordionSummary
                  expandIcon={<AddTaskOutlinedIcon />}
                  aria-controls={el.id}
                  id={el.id}
                  sx={{
                    backgroundColor: `${el.lastchange > 0 ? 'palegreen' : 'pink'
                      }`,
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
                    {el.lastchange > 0 ? (
                      <>
                        +
                        {
                          -(
                            ((el.prevprice - el.last) / el.last) *
                            100
                          ).toFixed(2)
                        }
                        %
                      </>
                    ) : (
                      <>
                        -
                        {(((el.prevprice - el.last) / el.last) * 100).toFixed(
                          2,
                        )}
                        %
                      </>
                    )}
                  </Typography>
                </AccordionSummary>
              </Badge.Ribbon>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>
                      Некоторая информация: цифры и буквы
                    </Typography>
                    <br />
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Diagram />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Главные новости
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <a href={wikiLink}>Информация о компании на Wikipedia</a>
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      { }
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
