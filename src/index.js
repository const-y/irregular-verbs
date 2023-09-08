import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreContextProvider } from './context/storeContext';
import './index.css';

ReactDOM.render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>,
  document.getElementById('root')
);
