import { LinearProgress, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system';

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
                  <a href={elem.link} className="elem-link" style={{ marginRight: 5 }} target="_blank" rel="noopener noreferrer">
                    {elem.title}
                  </a>
                  <img src={elem.enclosure?.url} style={{ width: 120, objectFit: 'contain' }} alt="" />
                </Item>
              )
            })
          }
        </Stack>
      )
  )
}
