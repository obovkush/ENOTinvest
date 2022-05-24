import { AccordionDetails, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Diagram from '../Diagram/Diagram';
import OneCompanyNews from './OneCompanyNews/OneCompanyNews';

export default function DetailsOfAccordion() {
  const wikiLink = useSelector((state) => state.wikipediaUrl);

  return (
    <AccordionDetails>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Некоторая информация: цифры и буквы</Typography>
          <br />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Diagram />
        </Grid>
        <Grid item xs={12}>
          <Typography>Новости компании:</Typography>
          <OneCompanyNews />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <a href={wikiLink}>Информация о компании на Wikipedia</a>
          </Typography>
        </Grid>
      </Grid>
    </AccordionDetails>
  );
}
