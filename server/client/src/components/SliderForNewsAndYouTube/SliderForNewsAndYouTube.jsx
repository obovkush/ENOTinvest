import * as React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import YoutubeBlock from '../News/YoutubeBlock/YoutubeBlock';
import NewsBlock from '../News/NewsBlock/NewsBlock';
import AllNewsBlock from '../News/AllNewsBlock/AllNewsBlock';
import { styled } from '@mui/material/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// Элемент MUI необходимый для отрисовки
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Paper
      sx={{
        bgcolor: 'background.paper',
        height: 920,
        overflowY: 'hidden',
      }}

    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Все новости" {...a11yProps(0)} />
          <Tab label="Статьи" {...a11yProps(1)} />
          <Tab label="Видео" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Box
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        // onChangeIndex={handleChangeIndex}
        id="custom_scroll"
        sx={{
          bgcolor: 'background.paper',
          height: 920,
          overflowY: 'auto',
        }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AllNewsBlock spinner={{loading, setLoading}} Item={Item} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <NewsBlock spinner={{loading, setLoading}} Item={Item} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <YoutubeBlock spinner={{loading, setLoading}} Item={Item} />
        </TabPanel>
      </Box>
    </Paper>
  );
}
