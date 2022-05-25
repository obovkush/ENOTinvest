import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function Profile() {
  const [portfolio, setPortfolio] = useState();
  const [shares, setShares] = useState()
  const [etfs, setEtfs] = useState()
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/profile`)
      .then((data) => data)
      .then((data) => {
        console.log('данные с апишки', data);
        setPortfolio(data.data.profile);
        setShares(data.data.shares)
        setEtfs(data.data.etfs)
        setLoading(false);
      });
  }, []);

  const AccordionOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tikerSearch = (figi, type) => {
    if (type === 'share') {
      const findTiker = shares.instruments.filter((el) => el.figi === figi)
        return findTiker[0].ticker
    } else if (type === 'etf'){
      const findTikerEtfs = etfs.instruments.filter((el) => el.figi === figi)
        return findTikerEtfs[0].ticker
    } else {
      const findTiker = portfolio.positions.filter((el) => el.figi === figi)
      return findTiker[0].current_nkd.currency.toUpperCase()
    }
  }

  const nameSearch = (figi, type) => {
    if (type === 'share') {
      const findTiker = shares.instruments.filter((el) => el.figi === figi)
        return findTiker[0].name
    } else if (type === 'etf'){
      const findTikerEtfs = etfs.instruments.filter((el) => el.figi === figi)
        return findTikerEtfs[0].name
    } else {
      return 'Валюта'
    }
  }

  return (
    <>
      Состояние портфеля:
      {loading
        ? 'идет загрузка'
        : ` ${
            portfolio.total_amount_currencies.units +
            portfolio.total_amount_etf.units +
            portfolio.total_amount_shares.units
          } 
          ${
            portfolio.expected_yield.units
          }%
          `}
      {loading ? 'идет загрузка' : portfolio.positions.map((el, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${el.id}`}
            onChange={AccordionOpen(`panel${el.id}`)}
            key={index}
          >
            <Badge.Ribbon
              placement="start"
              text={tikerSearch(el.figi, el.instrument_type)}
              color={el.expected_yield.units > 0 ? 'green' : 'red'}
            >
              <AccordionSummary
                expandIcon={<AddTaskOutlinedIcon />}
                aria-controls={el.id}
                id={el.id}
                sx={{
                  backgroundColor: `${
                    el.expected_yield.units > 0 ? 'palegreen' : 'pink'
                  }`,
                  color: `${el.expected_yield.units > 0 ? 'green' : 'red'}`,
                  padding: '0 30px 0 70px',
                }}
              >
                <StraightOutlinedIcon
                  fontSize="small"
                  sx={{ transform: 'rotate(135deg)' }}
                />
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {nameSearch(el.figi, el.instrument_type)}
                </Typography>
                <Typography title="Текущая цена" sx={{ width: '20%' }}>
                  {el.current_price.units}$
                </Typography>
                <Typography title="Дневной прирост" sx={{ width: '20%' }}>
                  {el.expected_yield.units}$
                </Typography>
                <Typography
                  title="Процент изменения за день"
                  sx={{
                    width: '20%',
                    color: `${el.expected_yield.units > 0 ? 'green' : 'red'}`,
                  }}
                >
                  {el.expected_yield.units}%
                </Typography>
              </AccordionSummary>
            </Badge.Ribbon>
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
