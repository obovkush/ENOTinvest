import { Grid, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import logo from '/home/falcon/elbrus/final/ENOTinvest/server/client/src/components/Drawer/logo.png'

export default function OneCompanyNews() {

  // const listOfConcatNews = useSelector(store => store.allNews)
  const newsForCurrentCompany = useSelector(store => store.companyNews)

  return (
    <>
      {
        newsForCurrentCompany.length
          ? newsForCurrentCompany.map((elem) => {
            return (
              <Grid container spacing={2} id="custom_scroll" sx={{ textAlign: 'center', height: 180, overflow: 'auto' }}>
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3} sx={{ textAlign: 'center', height: 180, overflow: 'hidden' }}>
                  <a href={elem.link} className="elem-link" target="_blank" rel="noopener noreferrer">
                    <img src={elem.enclosure?.url || logo} style={{ height: '60%', objectFit: 'contain' }} alt="" />
                    <Typography style={{ fontSize: '12px', height: '40%' }}>{elem.title}</Typography>
                  </a>
                </Grid>
              </Grid>
            )
          })
          :
          <Grid item xs={12} sx={{ height: 'content' }}>
            <Typography sx={{ fontStyle: 'italic', fontSize: 15, color: 'gray' }}>Нет актуальных новостей по данной компании</Typography>
          </Grid>
      }
    </>
  )
}
