import { Link, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NewsBlock() {

  // Создам стейт для хранения данных, прилетающих с RSS ленты. 
  // Переписать на Redux? =======================================>>>> TODO !!!!!!!!!!!!!!! 
  const [dataFromRSS, setdataFromRSS] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api/rssnews')
      .then((listFromRSS) => {
        const { items } = listFromRSS.data
        console.log('====> RSS новости Finam', items)
        setdataFromRSS(items);
      })
  }, [])

  return (
    <Paper
      sx={{
        marginTop: 5,
        maxWidth: 300,
        height: 700,
        overflow: 'auto',
      }}
      elevation={16}
    >
      <h3 style={{ marginTop: 10, backgroundColor: 'lightgrey' }}>Финансовые новости за сегодня</h3>
      <Stack spacing={2}>
        {dataFromRSS &&
          dataFromRSS.map((elem, index) => {
            return (
              <Item
                key={index}
              >
                <img src={elem.enclosure?.url} style={{ width: 277, objectFit: 'contain' }} alt="" />
                <a href={elem.link} className="elem-link" target="_blank" rel="noopener noreferrer">
                  {elem.title}
                </a>
              </Item>
            )
          })
        }
      </Stack>
    </Paper>
  )
}
