import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import YoutubeBlock from '../YoutubeBlock/YoutubeBlock';
import NewsBlock from '../NewsBlock/NewsBlock';

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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
        height: 700,
        overflowY: 'hidden',
        width: 400
      }}
      elevation={8}

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
        onChangeIndex={handleChangeIndex}
        id="custom_scroll"
        sx={{
          bgcolor: 'background.paper',
          height: 640,
          overflowY: 'auto',
          width: 400
        }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <NewsBlock />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <YoutubeBlock />
        </TabPanel>
      </Box>
    </Paper>
  );
}
