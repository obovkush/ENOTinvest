import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { Badge } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import DetailsOfAccordion from '../../components/StockAccordion/DetailsOfAccordion';

const logos = [
  {
    value: 'HPQ',
    url: 'https://invest-brands.cdn-tinkoff.ru/US40434L1052x640.png',
  },
  {
    value: 'AAPL',
    url: 'https://invest-brands.cdn-tinkoff.ru/US0378331005x640.png',
  },
  {
    value: 'F',
    url: 'https://invlab.ru/wp-content/uploads/2019/01/%C2%ABFord%C2%BB-1.png',
  },
  {
    value: 'VTBA',
    url: 'https://invest-brands.cdn-tinkoff.ru/RU000A0JTVJ2x640.png',
  },
  {
    value: 'FXGD',
    url: 'https://invest-brands.cdn-tinkoff.ru/FXGDx640.png',
  },
  {
    value: 'TECH',
    url: 'https://invest-brands.cdn-tinkoff.ru/TECHx640.png',
  },
  {
    value: 'TUSD',
    url: 'https://invest-brands.cdn-tinkoff.ru/TUSDx640.png',
  },
  {
    value: 'TSPX',
    url: 'https://invest-brands.cdn-tinkoff.ru/TSPXx160.png',
  },
  {
    value: 'RUB',
    url: 'https://i.pinimg.com/originals/45/57/24/455724f1105f77c3217b7a48f64f71ec.png',
  },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.75),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  marginRight: 30,
  marginTop: 15,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '19ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function Profile() {
  const allNews = useSelector((state) => state.allNews);
  const dispatch = useDispatch();
  const tinkoff = useSelector((state) => state.tinkoff);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [key, setKey] = useState();

  useEffect(() => {
    tinkoff.length && setLoading(false)
  }, [tinkoff])

  const historicalData = useCallback(
    (key, currency, board) => {
      if (currency === 'USD') {
        dispatch({ type: 'REMOVE_HISTORY', payload: [] });
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        axios
          .get(
            `https://api.polygon.io/v2/aggs/ticker/${key}/range/1/day/${
              year - 1
            }-0${month}-${day}/${year}-0${month}-${day}?apiKey=MVOp2FJDsLDLqEmq1t6tYy8hXro8YgUh`,
          )
          .then(({ data }) => {
            dispatch({
              type: 'SET_HISTORY',
              payload: data.results?.map((el, i) => {
                return {
                  id: i,
                  price: el.c,
                  date: new Date(el.t).toLocaleDateString('sma-SE'),
                };
              }),
            });
          })
          .catch((err) => console.log('У вас закончился лимит! 1 минута'));
      } else if (currency === 'RUB') {
        dispatch({ type: 'REMOVE_HISTORY', payload: [] });
        const today = new Date();
        const todayOneYearAgo = formatDateMinusYear(today);
        const base_URL = [
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/${board}/securities/${key}.json?from=${todayOneYearAgo}&start=0`,
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/${board}/securities/${key}.json?from=${todayOneYearAgo}&start=100`,
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/${board}/securities/${key}.json?from=${todayOneYearAgo}&start=200`,
        ]; //2022-01-01

        Promise.allSettled(base_URL.map((url) => axios.get(url))).then((data) =>
          data.forEach((result, num) => {
            if (result.status === 'fulfilled') {
              // result.value.data.history.data.map
              dispatch({
                type: 'SET_HISTORY',
                payload: result.value.data.history.data.map((el, i) => {
                  return {
                    id: i + 1,
                    shortName: el[2],
                    date: new Date(el[1]).toLocaleDateString('sma-SE'),
                    price: el[9],
                  };
                }),
              });
            }
            if (result.status === 'rejected') {
              console.log(`Не удалось получить данные по ${num} запросу`);
            }
          }),
        );
      }
    },
    [dispatch],
  );

  const AccordionOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tikerSearch = (figi, type) => {
    if (type === 'share') {
      const findTiker = tinkoff[0].instruments.filter((el) => el.figi === figi);
      return findTiker[0].ticker;
    } else if (type === 'etf') {
      const findTikerEtfs = tinkoff[2].instruments.filter((el) => el.figi === figi);
      return findTikerEtfs[0].ticker;
    } else {
      const findTiker = tinkoff[1].positions.filter((el) => el.figi === figi);
      return findTiker[0].current_nkd.currency.toUpperCase();
    }
  };

  const nameSearch = (figi, type) => {
    if (type === 'share') {
      const findTiker = tinkoff[0].instruments.filter((el) => el.figi === figi);
      return findTiker[0].name;
    } else if (type === 'etf') {
      const findTikerEtfs = tinkoff[2].instruments.filter((el) => el.figi === figi);
      return findTikerEtfs[0].name;
    } else {
      return 'Валюта';
    }
  };

  const wikipediaSearch = useCallback(
    (elem) => {
      axios
        .post(`${process.env.REACT_APP_API_URL}api/wikipedia`, {
          secid: elem,
        })
        .then((data) => {
          if (data.data) {
            dispatch({ type: 'SET_LINK_OF_WIKIPEDIA', payload: data.data });
          }
        });
    },
    [dispatch],
  );

  const sortedByPublishedDate = useCallback((array) => {
    const sortedArray = array.sort((a, b) => {
      const newsElemA = a?.pubDate?.replace(/[A-Z-:\s]/gim, '').trim();
      const newsElemB = b?.pubDate?.replace(/[A-Z-:\s]/gim, '').trim();
      const youtubeElemA = a?.snippet?.publishedAt
        ?.replace(/[A-Z-:]/gim, '')
        .trim();
      const youtubeElemB = b?.snippet?.publishedAt
        ?.replace(/[A-Z-:]/gim, '')
        .trim();
      if ((newsElemA || youtubeElemA) > (newsElemB || youtubeElemB)) {
        return -1;
      }
      if ((newsElemA || youtubeElemA) < (newsElemB || youtubeElemB)) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
  }, []);

  const newsContentSearch = useCallback(
    (elemName) => {
      const splitName = elemName.split(' ')[0];
      const lowerCaseName = splitName.toLowerCase();
      const upperCaseName = splitName.toUpperCase();
      const arrayOfNews = [...allNews];
      const companyNews = arrayOfNews.filter(
        (elem) =>
          elem.title.includes(splitName || lowerCaseName || upperCaseName) ||
          elem.content?.includes(splitName || lowerCaseName || upperCaseName),
      );
      const firstFiveNews = arrayOfNews.slice(0, 5);
      if (!companyNews.length) {
        dispatch({
          type: 'NEWS_OF_CURRENT_COMPANY',
          payload: sortedByPublishedDate(firstFiveNews),
        });
      } else {
        dispatch({
          type: 'NEWS_OF_CURRENT_COMPANY',
          payload: sortedByPublishedDate(companyNews),
        });
      }
    },
    [allNews, dispatch, sortedByPublishedDate],
  );

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

  const keyListener = (event) => {
    setKey(event.target.value);
  };

  const findImg = (figi, type) => {
    if (type === 'share') {
      const findTiker = tinkoff[0].instruments.filter((el) => el.figi === figi);
      const fltr = logos.filter((el) => el.value === findTiker[0].ticker)
      return fltr[0].url
    } else if (type === 'etf') {
      const findTikerEtfs = tinkoff[2].instruments.filter((el) => el.figi === figi);
      const fltr = logos.filter((el) => el.value === findTikerEtfs[0].ticker)
      console.log('///', fltr)
      return fltr[0].url
    } else {
      const findTiker = tinkoff[1].positions.filter((el) => el.figi === figi);
      const fltr = logos.filter((el) => el.value === findTiker[0].current_nkd.currency.toUpperCase())
      return fltr[0].url
    }
  }

  const clearKey = () => {};

  return (
    <>
      Состояние портфеля:
      {loading
        ? ''
        : ` ${
            tinkoff[1].total_amount_currencies.units +
            tinkoff[1].total_amount_etf.units +
            tinkoff[1].total_amount_shares.units
          } 
          ${tinkoff[1].expected_yield.units}%
          `}
      <Search sx={{ display: 'inline-block' }}>
        <StyledInputBase
          onChange={(value) => keyListener(value)}
          placeholder="Введите ключ"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <Button onClick={clearKey} variant="text">
        Добавить
      </Button>
      {loading
        ? 'идет загрузка'
        : tinkoff[1].positions.map((el, index) => {
            return (
              <Accordion
                expanded={expanded === `panel${el.figi}`}
                onChange={AccordionOpen(`panel${el.figi}`)}
                sx={{ marginTop: '8px', borderRadius: '5px' }}
                key={el.figi}
                onClick={() => {
                  wikipediaSearch(tikerSearch(el.figi, el.instrument_type));
                  newsContentSearch(nameSearch(el.figi, el.instrument_type));
                  historicalData(tikerSearch(el.figi, el.instrument_type), el.current_price.currency.toUpperCase(), el.board);
                }}
              >
                <Badge.Ribbon
                  placement="start"
                  text={tikerSearch(el.figi, el.instrument_type)}
                  color={el.expected_yield.units > 0 ? '#004d40' : '#ad1457'}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={el.figi}
                    id={el.figi}
                    sx={{
                      padding: '0 30px 0 70px',
                    }}
                  >
                       <Typography sx={{ width: '3%', flexShrink: 0 }}>
                    {<img src={findImg(el.figi, el.instrument_type)} width={30} alt="icon" />}
                    </Typography>
                    <Typography sx={{ width: '33%', flexShrink: 0, paddingTop: '5px' }}>
                      {nameSearch(el.figi, el.instrument_type)}
                    </Typography>
                    <Typography title="Текущая цена" sx={{ width: '20%', paddingTop: '5px' }}>
                      {el.current_price.currency === 'usd' ? `${el.current_price.units} $` : `${el.current_price.units} ₽`}
                    </Typography>
                    <Typography title="Сумма в портфеле" sx={{ width: '20%', paddingTop: '5px' }}>
                      {el.current_price.currency === 'usd' ? `${el.current_price.units * el.quantity.units} $` : `${el.current_price.units * el.quantity.units} ₽`}
                    </Typography>
                    <StraightOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: `${
                          el.expected_yield.units > 0 ? 'green' : 'red'
                        }`,
                        marginTop: '7px',
                        paddingBottom: '4px',
                        transform: `${
                          el.expected_yield.units > 0
                            ? 'rotate(35deg)'
                            : 'rotate(135deg)'
                        }`,
                      }}
                    />
                    <Typography
                      title="Процент изменения за день"
                      sx={{
                        width: '20%',
                        color: `${
                          el.expected_yield.units > 0 ? 'green' : 'red'
                        }`,
                        paddingTop: '5px'
                      }}
                    >
                    {el.current_price.currency === 'usd' ? `${el.expected_yield.units} $` : `${el.expected_yield.units} ₽`}
                     
                    </Typography>
                  </AccordionSummary>
                </Badge.Ribbon>
                <DetailsOfAccordion />
              </Accordion>
            );
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
