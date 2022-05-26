import React, { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import { Badge } from 'antd';
import axios from 'axios';
import DetailsOfAccordion from '../StockAccordion/DetailsOfAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Best() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const allNews = useSelector((state) => state.allNews);
  const stocks = useSelector((state) => state.stocks);
  const [filterStocks, setFilterStocks] = useState(stocks);

  const AccordionOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const historicalData = useCallback((key, currency, board) => {
    if (currency === 'USD') {
      dispatch({ type: 'REMOVE_HISTORY', payload: [] });
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();
      axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${key}/range/1/day/${year-1}-0${month}-${day}/${year}-0${month}-${day}?apiKey=MVOp2FJDsLDLqEmq1t6tYy8hXro8YgUh`)
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
  }, [dispatch]);

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/stocks/ru`)
      .then(({ data }) => {  
        const filterStocks = data.sort((a, b) => b.lastchangeprcnt - a.lastchangeprcnt)
        setFilterStocks(filterStocks.slice(0, 5));
        setLoading(false);
          });
  }, []);

  const wikipediaSearch = useCallback((elem) => {
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
  }, [dispatch]);

  const companyInfoSearch = useCallback((secid) => {
    const stocksCopy = [...stocks];
    const info = stocksCopy.filter((el) => el.secid === secid);
    if (info.length === 1) {
      dispatch({
        type: 'SET_CURRENT_COMPANY_INFO',
        payload: info[0].companyinfo,
      });
    } else {
      console.log('Отфильтровалось 0 или более 1 компании');
    }
  }, [dispatch, stocks]);

  const newsContentSearch = useCallback((elemName) => {
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
  }, [allNews, dispatch, sortedByPublishedDate]);

  return (
    <>
      {filterStocks.map((el, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${el.id}`}
            onChange={AccordionOpen(`panel${el.id}`)}
            sx={{marginTop: '7px',  borderRadius: '5px'}}
            key={el.secid}
            onClick={() => {
              wikipediaSearch(el.secid);
              companyInfoSearch(el.secid);
              newsContentSearch(el.shortName);
              historicalData(el.secid, el.currency, el.board);
            }}
          >
            <Badge.Ribbon
              placement="start"
              text={el.secid}
              color={el.lastchange > 0 ? '#004d40' : '#ad1457'}
            >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={el.id}
                    id={el.id}
                    sx={{
                      padding: '0 30px 0 70px',
                    }}
                  >
                    <Typography sx={{ width: '5%', flexShrink: 0 }}>
                    {<img src={el.img} width={30} alt="icon" />}
                    </Typography>
                    <Typography sx={{ width: '33%', flexShrink: 0, paddingTop: '5px' }}>
                      {el.shortName}
                    </Typography>
                    <Typography title="Текущая цена" sx={{ width: '20%', paddingTop: '5px' }}>
                      {el.currency === 'USD' ? `${el.last} $` : `${el.last} ₽`}
                    </Typography>
                    <Typography
                      title="Дневной прирост"
                      sx={{
                        width: '20%',
                        color: `${el.lastchange > 0 ? 'green' : 'red'}`,
                        paddingTop: '5px'
                      }}
                    >
                      {el.currency === 'USD'
                        ? `${el.lastchange} $`
                        : `${el.lastchange} ₽`}
                    </Typography>
                    <StraightOutlinedIcon
                      fontSize="small"
                      sx={{ 
                        color: `${el.lastchange > 0 ? 'green' : 'red'}`,
                        transform: `${el.lastchange > 0 ? 'rotate(35deg)' : 'rotate(135deg)'}`,
                        marginTop: '7px',
                        paddingBottom: '4px'
                      }}
                    />
                    <Typography
                      title="Процент изменения за день"
                      sx={{
                        width: '20%',
                        color: `${el.lastchange > 0 ? 'green' : 'red'}`,
                        paddingTop: '5px'
                      }}
                    >
                      {el.lastchangeprcnt}%
                    </Typography>
                  </AccordionSummary>
                </Badge.Ribbon>
                {expanded === `panel${el.id}` && <DetailsOfAccordion />}
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

export default memo(Best);
