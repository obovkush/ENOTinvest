import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';

import { Badge } from 'antd';

function StockAccordion() {
  const [stocksData, setStocksData] = useState([]);

  
  async function moexTickerLast(ticker) {
    const res = await fetch(
      'https://iss.moex.com/iss/engines/stock/markets/shares/securities/boards/TQBR/' +
        ticker +
        '.json',
    );
    // .then(function (res) {
    return res.json();
    // });
    // return json.marketdata.data.filter(function (d) {
    //   return ['TQBR', 'TQTF'].indexOf(d[1]) !== -1;
    // })[0][12];
  }
  // useEffect(() => {
  //   fetch(
  //     'https://iss.moex.com/iss/engines/stock/markets/shares/securities/boards/TQBR/' +
  //       ticker +
  //       '.json'
  //   )
  // })

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
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
              149,24$
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
                color: 'green',
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
              +0,00035&#8381;
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
