import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

import { logout } from '../../api/userAPI';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { HOME_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../../utils/consts';

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log('user', user);
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
        .then(() => navigate(HOME_ROUTE));
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const isSignRoute =
    location.pathname === SIGNIN_ROUTE || location.pathname === SIGNUP_ROUTE;
  // console.log(isSignRoute);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    user.email ? handleLogout() : navigate(SIGNIN_ROUTE);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static" >
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         Content
    //       </Typography>
    //       {(user.email || !isSignRoute) && (
    //         <div>
    //           <IconButton
    //             size="large"
    //             aria-label="account of current user"
    //             aria-controls="menu-appbar"
    //             aria-haspopup="true"
    //             onClick={handleMenu}
    //             color="inherit"
    //           >
    //             <AccountCircle />
    //           </IconButton>
    //           <Menu
    //             id="menu-appbar"
    //             anchorEl={anchorEl}
    //             anchorOrigin={{
    //               vertical: 'top',
    //               horizontal: 'right',
    //             }}
    //             keepMounted
    //             transformOrigin={{
    //               vertical: 'top',
    //               horizontal: 'right',
    //             }}
    //             open={Boolean(anchorEl)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem onClick={handleClose}>Профиль</MenuItem>
    //             <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
    //           </Menu>
    //         </div>
    //       )}
    //       {!isSignRoute ? (
    //         <FormGroup>
    //           <FormControlLabel
    //             label={user.email ? 'Logout' : 'Login'}
    //             control={
    //               <Switch
    //                 color="secondary"
    //                 checked={Boolean(user.email)}
    //                 onChange={handleChange}
    //                 aria-label="login switch"
    //               />
    //             }
    //           />
    //         </FormGroup>
    //       ) : (
    //         <FormGroup>
    //           <FormControlLabel
    //             label={user.email ? 'Logout' : 'Login'}
    //             control={
    //               <Switch
    //                 disabled
    //                 color="secondary"
    //                 checked={Boolean(user.email)}
    //                 // onChange={handleChange}
    //                 aria-label="login switch"
    //               />
    //             }
    //           />
    //         </FormGroup>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    // </Box>
    <div>
      <Sidebar/>
      <Outlet/>
    </div>
  );
}
