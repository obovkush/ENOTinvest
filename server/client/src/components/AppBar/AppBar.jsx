import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { logout } from '../../api/userAPI';
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
    <>
      <Outlet/>
    </>
  );
}
