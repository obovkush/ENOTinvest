import { LinearProgress, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system';
import logo from '../../Drawer/logo.png'

export default function NewsBlock({ spinner, Item }) {
  
  const { loading, setLoading } = spinner
  const listFromRSS = useSelector(store => store.news)

  return (
    loading ?
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> :
      (
        <Stack spacing={2}>
          {listFromRSS &&
            listFromRSS.map((elem, index) => {
              return (
                <Item
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img src={elem.enclosure?.url || logo} style={{ width: 120, objectFit: 'contain' }} alt="" />
                  <a href={elem.link} className="elem-link" style={{ marginLeft: 10, textAlign: 'start' }} target="_blank" rel="noopener noreferrer">
                    {elem.title}
                  </a>
                </Item>
              )
            })
          }
        </Stack>
      )
  )
}
