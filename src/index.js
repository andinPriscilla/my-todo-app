import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyProvider from './context/Myprovider'

// If you want the context for the whole App, import and use the provider component here
ReactDOM.render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


