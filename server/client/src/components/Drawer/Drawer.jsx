import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppRouter from '../../routes/AppRouter';
import People from '@mui/icons-material/People';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import Home from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import axios from 'axios';
import AccountMenu from './AccountMenu/AccountMenu';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);

  useEffect(() => {
    axios
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((data) => {
        setUsd(data.data.Valute.USD.Value);
        setEur(data.data.Valute.EUR.Value);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarNavItems = [
    {
      display: 'Главная',
      to: '/',
      section: '',
      icon: <Home />,
    },
    {
      display: 'Акции',
      to: '/stocks',
      section: 'stocks',
      icon: <Dns />,
    },
    {
      display: 'Аномалии',
      to: '/anomaly',
      section: 'anomaly',
      icon: <Public />,
    },
    {
      display: 'Логин',
      to: '/signin',
      section: 'signin',
      icon: <People />,
    },
    {
      display: 'Регистрация',
      to: '/signup',
      section: 'signup',
      icon: <People />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <div className="sidebar__logo">
          <img src={logo} style={{ height: 100 }} alt="logo" />
        </div>
      </Toolbar>
      <Divider />
      <Toolbar sx={{ justifyContent: 'center' }}>
        <div className="sidebar__menu__item" style={{ fontSize: '17px' }}>
          USD: {usd}
          <br />
          EUR: {eur}
        </div>
      </Toolbar>
      <Divider />
      <List>
        {sidebarNavItems.map((item, index) => (
          <NavLink to={item.to} key={index}>
            <ListItem key={item.display} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.display} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          justifyContent: 'space-between',
          backgroundColor: '#1d2327',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* Какой-нибудь текст или нет */}
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1d2327',
              color: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1d2327',
              color: 'white',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Блок ниже это основная область сайта!!! */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          pt: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <AppRouter />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
