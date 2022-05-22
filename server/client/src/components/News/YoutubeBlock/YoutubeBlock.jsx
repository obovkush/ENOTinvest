import { Box, LinearProgress, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player/lazy'

export default function YoutubeBlock({ spinner, Item }) {
  const { loading, setLoading } = spinner
  const dispatch = useDispatch()
  const listFromChanelInvestFuture = useSelector(store => store.youtube)

  // Модель плеера с адаптивным дизайном
  const ResponsivePlayer = (videoId) => {
    // Для получения ссылки на видео, напишем функцию с добавлением ID каждого видео
    const videoUrl = (videoId) => {
      return `https://www.youtube.com/watch?v=${videoId}`
    }
    
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
