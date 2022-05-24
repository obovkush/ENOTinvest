import './App.css';
import { useEffect } from 'react';

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

  return <Drawer />;
}

export default App;
