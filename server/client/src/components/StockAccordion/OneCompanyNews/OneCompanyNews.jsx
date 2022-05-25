import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import NewsCard from './NewsCard'

export default function OneCompanyNews() {
  // const listOfConcatNews = useSelector(store => store.allNews)
  const newsForCurrentCompany = useSelector((store) => store.companyNews);

  const lineOfNews = { 
    paddingLeft: '0 !important',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
 }

  return (
    <Grid item xs={12} sx={lineOfNews}>
      {newsForCurrentCompany.length ? (
        newsForCurrentCompany.map((elem) => {
          return (
            <NewsCard elem={elem}/>
          );
        })
      ) : (
        <Grid item xs={12} sx={{ height: 'content' }}>
          <Typography sx={{ fontStyle: 'italic', fontSize: 15, color: 'gray' }}>
            Нет актуальных новостей по данной компании
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
