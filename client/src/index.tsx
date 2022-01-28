import { CssBaseline } from '@mui/material';
import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import { App } from './containers';
import { IoCContainer, IoCProvider } from './ioc';
//import reportWebVitals from './reportWebVitals';
import './styles.scss';

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <React.StrictMode>
    <IoCProvider container={IoCContainer}>
      <CssBaseline />
      <App />
    </IoCProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
