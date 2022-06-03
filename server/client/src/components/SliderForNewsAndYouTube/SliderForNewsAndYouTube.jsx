import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { instagramTabsStylesHook } from '@mui-treasury/styles/tabs';
import GridOnOutlined from '@material-ui/icons/GridOnOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AllNewsBlock from '../News/AllNewsBlock/AllNewsBlock';
import NewsBlock from '../News/NewsBlock/NewsBlock';
import YoutubeBlock from '../News/YoutubeBlock/YoutubeBlock';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

// Элемент MUI необходимый для отрисовки
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicTabs() {
  const [loading, setLoading] = React.useState(true)
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabsStyles = instagramTabsStylesHook.useTabs();
  const tabItemStyles = instagramTabsStylesHook.useTabItem();

  return (

    <Box sx={{ height: '95vh', overflowY: 'hidden' }}>

      <Tabs
        // стиль для Табсов - флекс
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
        }}
        // стиль для линии под иконкой
        TabIndicatorProps={{
          style: {
            backgroundColor: "#D97D54"
          }
        }}
        value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
        <Tab icon={<GridOnOutlined />} />
        <Tab icon={<NewspaperIcon />} />
        <Tab icon={<YouTubeIcon />} />
      </Tabs>

      <Box id="custom_scroll" sx={{ height: '93%', overflowY: 'auto', }}
      >
        <TabPanel value={tabIndex} index={0} >
          <AllNewsBlock spinner={{ loading, setLoading }} Item={Item} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1} >
          <NewsBlock spinner={{ loading, setLoading }} Item={Item} />
        </TabPanel>
        <TabPanel value={tabIndex} index={2} >
          <YoutubeBlock spinner={{ loading, setLoading }} Item={Item} />
        </TabPanel>
      </Box>

    </Box>

  );
}
