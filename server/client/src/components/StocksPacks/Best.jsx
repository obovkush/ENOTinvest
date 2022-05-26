import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import axios from 'axios';
import DetailsOfAccordion from '../StockAccordion/DetailsOfAccordion';

export default function Best() {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const stocks = useSelector((state) => state.stocks);
  const [filterStocks, setFilterStocks] = useState(stocks);

  const AccordionOpen = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/stocks/ru`)
      .then(({ data }) => {  
        const filterStocks = data.sort((a, b) => b.lastchangeprcnt - a.lastchangeprcnt)
        setFilterStocks(filterStocks.slice(0, 5));
        setLoading(false);
          });
  }, []);

  return (
    <>
      {filterStocks.map((el, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${el.id}`}
            onChange={AccordionOpen(`panel${el.id}`)}
            key={index}
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
                  backgroundColor: `${
                    el.lastchange > 0 ? 'palegreen' : 'pink'
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
                  {el.lastchangeprcnt}%
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
