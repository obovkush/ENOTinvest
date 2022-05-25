import { AccordionDetails, Grid, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Diagram from '../Diagram/Diagram';
import OneCompanyNews from './OneCompanyNews/OneCompanyNews';
import wikilogo from './wikilogo.png'

function DetailsOfAccordion() {
  const wikiLink = useSelector((state) => state.wikipediaUrl);
  const companyInfo = useSelector(state => state.companyInfo)

  return (
    <AccordionDetails>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography>Некоторая информация: цифры и буквы</Typography>
          <br />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid container xs={12} spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={9}>
            <Diagram />
          </Grid>
          <Grid item xs={3}>
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
