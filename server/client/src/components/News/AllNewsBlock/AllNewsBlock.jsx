import { LinearProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Box } from '@mui/system';

export default function AllNewsBlock() {

  const dispatch = useDispatch()
  const listFromRSS = useSelector(store => store.news)
  const [loading, setLoading] = useState(true)

  return (
    <div>Hello</div>
  //   loading ?
  //     <Box sx={{ width: '100%' }}>
  //       <LinearProgress />
  //     </Box> :
  //     (
  //       <Stack spacing={2}>
  //         {listFromRSS &&
  //           listFromRSS.map((elem, index) => {
  //             return (
  //               <Item
  //                 key={index}
  //                 sx={{
  //                   display: 'flex',
  //                   flexDirection: 'row',
  //                   alignItems: 'center',
  //                 }}
  //               >
  //                 <a href={elem.link} className="elem-link" style={{ marginRight: 5 }} target="_blank" rel="noopener noreferrer">
  //                   {elem.title}
  //                 </a>
  //                 <img src={elem.enclosure?.url} style={{ width: 120, objectFit: 'contain' }} alt="" />
  //               </Item>
  //             )
  //           })
  //         }
  //       </Stack>
  //     )
  )
}
