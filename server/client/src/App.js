import './App.css';
import { useEffect } from 'react';

import AppBar from './components/AppBar/AppBar';
import AppRouter from './routes/AppRouter';
import 'boxicons/css/boxicons.min.css';
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
    <Grid container spacing={2}>
      <Grid item xs={4} md={3}>
        <AppBar />
      </Grid>
      <Grid item xs={8} md={9}>
        <AppRouter />
      </Grid>
    </Grid>
    // <div className="App container">
    //   <AppBar />
    //   <section className="list App-content">
    //     <AppRouter />
    //   </section>
    // </div>
  );
}

export default App;
