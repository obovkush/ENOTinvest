import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

import 'boxicons/css/boxicons.min.css';
import { checkAuth } from './api/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from './components/Drawer/Drawer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      try {
        checkAuth().then((data) => {
          console.log('dataFromServerLogin', data);
          dispatch({
            type: 'SET_USER',
            payload: data,
          });
        });
      } catch (err) {
        console.log('errorFromServerRefresh', err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    user.isActivated &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}api/favorite/user/${user.id}/read`,
        )
        .then(({ data }) => {
          if (data.length) {
            dispatch({ type: 'SET_ALL_FAVORITE', payload: data });
          }
        });
  }, [dispatch, user.id, user.isActivated]);

  return <Drawer />;
}

export default App;
