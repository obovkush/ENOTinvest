import { Divider, LinearProgress, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system';
import logo from '../../Drawer/logo.png';

export default function NewsBlock({ spinner, Item }) {

  const { loading, setLoading } = spinner
  const listFromRSS = useSelector(store => store.news)

  return (
    loading ?
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> :
      (
        
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#eaeaea', mt: 0, pt: 0 }} >
          {listFromRSS &&
            listFromRSS.map((elem, index) => {
              return (
                <>
                <ListItem alignItems="flex-start" key={index} sx={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                width: '100%'
              }}>

                <Box
                  component="img"
                  sx={{
                    background: 'white',
                    borderRadius: 2,
                    width: 120,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    objectFit: 'contain',
                    mr: 2,
                  }}
                  alt="The today news"
                  src={elem.enclosure?.url || logo}
                />

                <ListItemText
                  secondary={
                    <a
                      href={elem.link}
                      className="elem-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {elem.title}
                    </a>
                  }
                  sx={{ width: 300 }}
                />
              </ListItem>
              <Divider variant="middle" />
              </>
              )
            })
          }
        </List>
      )
  )
}
