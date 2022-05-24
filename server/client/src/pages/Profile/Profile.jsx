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
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/profile`)
      .then((data) => data)
      .then((data) => {
        console.log('данные с апишки', data);
        setPortfolio(data.data);
        setLoading(false);
        console.log('портфель в аксиосе после опишки', portfolio);
      });
  }, []);

  const AccordionOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
              text={el.figi}
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
                  {el?.figi}
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
