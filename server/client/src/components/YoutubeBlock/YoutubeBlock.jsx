import { Box, LinearProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import ReactPlayer from 'react-player/lazy'

export default function YoutubeBlock() {
  // Создам стейт для хранения данных, прилетающих с API. 
  const dispatch = useDispatch()
  const listFromChanelInvestFuture = useSelector(store => store.youtube)
  const [loading, setLoading] = useState(true)

  // Для получения ссылки на видео, напишем функцию с добавлением ID каждого видео
  const videoUrl = (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`
  }

  // Элемент MUI необходимый для отрисовки
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

  useEffect(() => {
    // По необходимости нужно добавить различные свойства к запросу, например сортировка.
    axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-WK8QlQJpAROCrO7dRvqcw&maxResults=3&key=AIzaSyABhJbYlM-GGIKjhaAguyWZKyaRyKCdtVU')
      .then((listFromChanelInvestFuture) => {
        const { items } = listFromChanelInvestFuture.data
        console.log('====> Видео с канала InvestFuture', items);
        if (items.length) {
          dispatch({ type: 'SET_ALL_YOUTUBE_VIDEO', payload: items })
          setLoading(false)
        }
      })
      .catch(error => console.log(error))
  }, [])

  return (
    loading ?
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> :
      (
        <Stack spacing={2}>
          {listFromChanelInvestFuture &&
            listFromChanelInvestFuture.map(elem => {
              return (
                <Item
                  key={elem.id.videoId}
                >
                  {ResponsivePlayer(elem.id.videoId)}
                  <p style={{ color: '#202124', marginBottom: 0 }}>{elem.snippet.title}</p>
                </Item>
              )
            })
          }
        </Stack>
      )
  )
}
