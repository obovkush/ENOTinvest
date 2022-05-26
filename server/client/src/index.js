import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const baseTheme = createMuiTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
