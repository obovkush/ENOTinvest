import './App.css';
import { useEffect } from 'react';

import AppBar from './components/AppBar/AppBar';
import AppRouter from './routes/AppRouter';
import 'boxicons/css/boxicons.min.css'
import { Grid } from '@mui/material';

import { checkAuth } from './api/userAPI';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={4} md={2}>
        <AppBar />
      </Grid>
      <Grid item xs={10} md={10} pr={2}>
        <AppRouter />
      </Grid>
    </Grid>

  );
}

export default App;
