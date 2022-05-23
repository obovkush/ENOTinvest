import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Diagram from '../Diagram/Diagram';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  LinearProgress,
  Box,
  Grid,
} from '@mui/material';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import { Badge } from 'antd';
import DetailsOfAccordion from './DetailsOfAccordion';


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
  const allNews = useSelector((state) => state.allNews)
  const [filterStocks, setFilterStocks] = useState(stocks);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [currency, setCurrency] = useState('Все');
  const [expanded, setExpanded] = useState(false);

  const historicalData = (key, currency) => {
    if (currency === 'USD') {
      // setTimeout(() => {
      //   console.log('Здесь будет api/stocks/USD history');
      //   fetch(`https://api.polygon.io/v2/aggs/ticker/${key}/range/1/day/2020-05-20/2022-05-20?apiKey=MVOp2FJDsLDLqEmq1t6tYy8hXro8YgUh`, {
      //     method: 'GET',
      //     headers: { 'Content-Type': 'application/json' },
      //   }).then((res) => res.json())
      //     .then((data) => {
      //       dispatch({ type: 'HISTORY_USD', payload: data.results });
      //     })
      //     .catch((err) => console.log('stocks GET =>', err));
      // }, 10000);
    } else {
      console.log('Здесь будет api/stocks/RU history');
    }
}


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
  };

  const newsContentSearch = (elemName) => {
    const splitName = elemName.split(' ')[0]
    const lowerCaseName = splitName.toLowerCase();
    const upperCaseName = splitName.toUpperCase();
    const arrayOfNews = [...allNews]
    const companyNews = arrayOfNews.filter((elem) => elem.title.includes(splitName || lowerCaseName || upperCaseName) || elem.content?.includes(splitName || lowerCaseName || upperCaseName));
    console.log(companyNews)
    dispatch({ type: 'NEWS_OF_CURRENT_COMPANY', payload: companyNews });
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
          event.target.value.toUpperCase() ||
        el.shortName.slice(0, event.target.value.length).toLowerCase() ===
          event.target.value.toLowerCase(),
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
  function formatDateMinusYear(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear() - 1); // отнимаем 1 год
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  const [diagramLoading, setDiagramLoading] = useState(false);
  const history = useSelector((store) => store.history);

  const hystoriCal = React.useCallback(
    (key) => {
      setDiagramLoading(!diagramLoading);
      dispatch({
        type: 'REMOVE_HISTORY',
        payload: [],
      });
      if (!diagramLoading) {
        const today = new Date();
        const todayOneYearAgo = formatDateMinusYear(today);
        console.log('==========> todayOneYearAgo', todayOneYearAgo);
        const base_URL = [
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/TQBR/securities/${key}.json?from=${todayOneYearAgo}&start=0`,
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/TQBR/securities/${key}.json?from=${todayOneYearAgo}&start=100`,
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/TQBR/securities/${key}.json?from=${todayOneYearAgo}&start=200`,
        ]; //2022-01-01 // ${todayOneYearAgo}
        console.log(base_URL);

        axios
          .get(base_URL[0])
          .then((history) => {
            return history.data.history.data.map((el, i) => {
              return {
                id: i + 1,
                shortName: el[2],
                date: el[1],
                price: el[9],
              };
            });
          })
          .then((history) => {
            dispatch({
              type: 'SET_HISTORY',
              payload: history,
            });
          })
          .then(() => axios.get(base_URL[1]))
          .then((history) => {
            return history.data.history.data.map((el, i) => {
              return {
                id: i + 1,
                shortName: el[2],
                date: el[1],
                price: el[9],
              };
            });
          })
          .then((history) => {
            dispatch({
              type: 'SET_HISTORY',
              payload: history,
            });
          })
          .then(() => axios.get(base_URL[2]))
          .then((history) => {
            return history.data.history.data.map((el, i) => {
              return {
                id: i + 1,
                shortName: el[2],
                date: el[1],
                price: el[9],
              };
            });
          })
          .then((history) => {
            dispatch({
              type: 'SET_HISTORY',
              payload: history,
            });
          })
          .then(() => setDiagramLoading(false));
      }
    },
    [diagramLoading, dispatch],
  );
  // console.log('==========> diagramLoading', diagramLoading);
  // console.log('==========> history', history);

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

      {filterStocks.length
        ? filterStocks.map((el, index) => {
            return (
              <Accordion
                expanded={expanded === `panel${el.id}`}
                onChange={AccordionOpen(`panel${el.id}`)}
                key={el.secid}
                onClick={() => {
                  wikipediaSearch(el.secid);
                  hystoriCal(el.secid);
                  newsContentSearch(el.shortName);
                  historicalData(el.secid, el.currency);
                }}
              >
                <Badge.Ribbon
                  placement="start"
                  text={el.secid}
                  color={el.lastchange > 0 ? '#004d40' : '#ad1457'}
                >
                  <AccordionSummary
                    expandIcon={<AddTaskOutlinedIcon />}
                    aria-controls={el.id}
                    id={el.id}
                    sx={{
                      padding: '0 30px 0 70px',
                      backgroundColor: 'DarkSlateGrey',
                      color: 'white',
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
                      {el.lastchangeprcnt}%
                    </Typography>
                  </AccordionSummary>
                </Badge.Ribbon>
                <DetailsOfAccordion />
              </Accordion>
            );
          })
        : stocks.map((el, index) => {
            return (
              <Accordion
                expanded={expanded === `panel${el.id}`}
                onChange={AccordionOpen(`panel${el.id}`)}
                key={el.secid}
                onClick={() => {
                  wikipediaSearch(el.secid);
                  hystoriCal(el.secid);
                  historicalData(el.secid, el.currency);
                }}
              >
                <Badge.Ribbon
                  placement="start"
                  text={el.secid}
                  color={el.lastchange > 0 ? '#004d40' : '#ad1457'}
                >
                  <AccordionSummary
                    expandIcon={<AddTaskOutlinedIcon />}
                    aria-controls={el.id}
                    id={el.id}
                    sx={{
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
                      {el.lastchangeprcnt}%
                    </Typography>
                  </AccordionSummary>
                </Badge.Ribbon>
                <DetailsOfAccordion />
              </Accordion>
            );
          })}
      {}
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
