import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import ReactPlayer from 'react-player/lazy'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function YoutubeBlock() {

  // Создам стейт для хранения данных, прилетающих с API. 
  // Переписать на Redux? =======================================>>>> TODO !!!!!!!!!!!!!!! 
  const [dataFromChanelInvestFuture, setDataFromChanelInvestFuture] = useState(null)

  // Для получения ссылки на видео, напишем функцию с добавлением ID каждого видео
  const videoUrl = (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`
  }

  // Модель плеера с адаптивным дизайном
  const ResponsivePlayer = (videoId) => {
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={videoUrl(videoId)}
          width='100%'
          height='100%'
        />
      </div>
    )
  }

  // useEffect(() => {
  //   // По необходимости нужно добавить различные свойства к запросу, например сортировка.
  //   axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-WK8QlQJpAROCrO7dRvqcw&maxResults=3&key=AIzaSyABhJbYlM-GGIKjhaAguyWZKyaRyKCdtVU')
  //     .then((listFromChanelInvestFuture) => {
  //       const { items } = listFromChanelInvestFuture.data
  //       console.log('====> Видео с канала InvestFuture', items);
  //       setDataFromChanelInvestFuture(items);
  //     })
  //     .catch(error => console.log(error))
  // }, [])

  return (
    <Paper
      sx={{
        maxWidth: 300,
        height: 700,
        overflow: 'auto',
      }}
      elevation={16}
    >
      <h3 style={{ marginTop: 10, backgroundColor: 'lightgrey' }}>YouTube News</h3>
      <Stack spacing={2}>
        {dataFromChanelInvestFuture &&
          dataFromChanelInvestFuture.map(elem => {
            return (
              <Item
                key={elem.id.videoId}
              >
                {ResponsivePlayer(elem.id.videoId)}
                {elem.snippet.title}
              </Item>
            )
          })
        }
      </Stack>
    </Paper>
  )
}
