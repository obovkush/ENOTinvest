import { AccordionDetails, Grid, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Diagram from '../Diagram/Diagram';
import OneCompanyNews from './OneCompanyNews/OneCompanyNews';
import wikilogo from './wikilogo.png'

function DetailsOfAccordion() {
  const wikiLink = useSelector((state) => state.wikipediaUrl);
  const companyInfo = useSelector(state => state.companyInfo)
  const stockData = useSelector((store) => store.history);
  
  let hodie = stockData[stockData.length - 1]?.date;
  let oneMonths = `${hodie?.substring(0, 2)}.0${hodie?.substring(3, 5) - 1}.${hodie?.substring(6, 10)}`;
  let sixMonths = `${hodie?.substring(0, 2)}.${Number(hodie?.substring(3, 5)) + 6}.${hodie?.substring(6, 10) -1}`;
  let resultOneMonths = (stockData.filter((el) => el.date === oneMonths)[0]?.price);
  let resultSixMonths = (stockData.filter((el) => el.date === sixMonths)[0]?.price);

  return (
    <AccordionDetails>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography>Изменения за месяц: {(((stockData[stockData.length - 1]?.price - resultOneMonths) / resultOneMonths) * 100 )?.toFixed(2)} %</Typography>
          <Typography>Изменения за полгода: {(((stockData[stockData.length - 1]?.price - resultSixMonths) / resultSixMonths) * 100 )?.toFixed(2)} %</Typography>
          <Typography>Изменения за год: {(((stockData[stockData.length - 1]?.price - stockData[0]?.price) / stockData[0]?.price) * 100 )?.toFixed(2)} %</Typography>
          {/* <br /> */}
        </Grid>
        <Grid container xs={12} spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            <Diagram />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Typography>О компании:</Typography>
            <Typography sx={{ fontSize: 12 }}>
              {companyInfo}
            </Typography>
            <br />
            <Typography sx={{ fontSize: 12, fontStyle: 'italic' }}>
              <a href={wikiLink} target="_blank" rel="noreferrer">
                <img src={wikilogo} style={{ height: 30 }} alt="wikilogo" />
                Информация о компании на Wikipedia
              </a>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>Новости компании:</Typography>
          <OneCompanyNews />
        </Grid>
      </Grid>
    </AccordionDetails>
  );
}

export default memo(DetailsOfAccordion);
