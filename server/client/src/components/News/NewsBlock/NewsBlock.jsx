import { LinearProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Box } from '@mui/system';

export default function NewsBlock() {

  // Создам стейт для хранения данных, прилетающих с RSS ленты. 
  const dispatch = useDispatch()
  const listFromRSS = useSelector(store => store.news)
  const [loading, setLoading] = useState(true)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    axios.get('http://localhost:5000/api/rssnews')
      .then((listFromRSS) => {
        const { items } = listFromRSS.data
        console.log('====> RSS новости Finam', items)
        if (items.length) {
          dispatch({ type: 'SET_ALL_NEWS', payload: items })
          setLoading(false)
        }
      })
  }, [])

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
