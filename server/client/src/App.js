import './App.css';
import { useEffect } from 'react';

import AppBar from './components/AppBar/AppBar';
import AppRouter from './routes/AppRouter';

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
    <div className="App container">
      <AppBar />
      <section className="list App-content">
        <AppRouter />
      </section>
    </div>
  );
}

export default App;
