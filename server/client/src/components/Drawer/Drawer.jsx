import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AppRouter from '../../routes/AppRouter';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import Home from '@mui/icons-material/Home';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

import { SIGNIN_ROUTE } from '../../utils/consts';
import { logout } from '../../api/userAPI';

import logo from './logo.png';
import axios from 'axios';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);

  const user = useSelector((store) => store.user);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
  };
  const date = new Date().toLocaleString("ru", options)

  // Меняем цвет на hover элементов сайдбара + теперь заработал NavLink
  const linkStyle = {
    [`& .active, & .${listItemClasses.root}:hover`]: {
      color: "#f07800",
      fontWeight: "bold",
      "& svg": {
        fill: "#f07800"
      }
    }
  }

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

  const handleLogout = () => {
    try {
      logout()
        .then(localStorage.removeItem('token'))
        .then(() => {
          dispatch({
            type: 'LOGOUT_USER',
            payload: {},
          });
        })
        .then(() => navigate(SIGNIN_ROUTE));
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const sidebarNavItems = [
    {
      display: 'Главная',
      to: '/',
      section: '',
      icon: <Home sx={{ fill: '#ffffff' }} />,
    },
    {
      display: 'Акции',
      to: '/stocks',
      section: 'stocks',
      icon: <Dns sx={{ fill: '#ffffff' }} />,
    },
    {
      display: 'Портфель',
      to: '/profile',
      section: 'profile',
      icon: <Public sx={{ fill: '#ffffff' }} />,
    },
    user.email
      ? {
          display: 'Выход',
          to: '/logout',
          section: 'logout',
          icon: <PersonOffIcon sx={{ fill: '#ffffff' }} />,
          onClick: () => handleLogout(),
        }
      : {
          display: 'Вход / Регистрация',
          to: '/signin',
          section: 'signin',
          icon: <PersonAddAlt1Icon sx={{ fill: '#ffffff' }} />,
        },
  ];
  const drawer = (
    <div>
      <Toolbar sx={{ maxHeight: '64px' }}>
        <div className="sidebar__logo">
          <img src={logo} style={{ height: 100 }} alt="logo" />
        </div>
      </Toolbar>
      <Divider sx={{ borderColor: 'white' }} />
      <Toolbar sx={{ justifyContent: 'center' }}>
        <div className="sidebar__menu__item" style={{ fontSize: '17px', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '14px', fontStyle: 'italic' }}>{date}</Typography>
          USD: {usd.toFixed(2)}
          <br />
          EUR: {eur.toFixed(2)}
          <br />
        </div>
      </Toolbar>
      <Divider sx={{ borderColor: 'white' }} />
      <List sx={ linkStyle }>
        {sidebarNavItems.map((item, index) => (
          <NavLink to={item.to} key={index} onClick={item.onClick}>
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
          backgroundColor: '#4d5357',
        }}
      >
        {/* <Toolbar
          sx={{
            justifyContent: 'space-between',
            borderLeft: '1px solid white',
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
          <AccountMenu />
        </Toolbar> */}
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
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#4d5357',
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
              backgroundColor: '#4d5357',
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
        {user.isActivated === false ? (
          <Alert severity="warning">
            <AlertTitle>Не активирован</AlertTitle>
            Вам на почту направлено письмо со ссылкой на активацию — пожалуйста,
            перейдите по ссылке в письме для активации аккаунта. <br />
            Если у вас есть активированный аккаунт
            <Link to={SIGNIN_ROUTE} onClick={handleLogout}>
              <strong> войдите</strong>
            </Link>
          </Alert>
        ) : (
          <></>
        )}
        <IconButton
          color="default"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, mt: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Toolbar /> */}
        <AppRouter />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
