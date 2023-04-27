import React from 'react';
import ReactDOM from 'react-dom/client';
import CurrencyConverter from './CurrencyConverter.js';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <CurrencyConverter />
    </BrowserRouter>
);