import React from 'react';
import ReactDOM from 'react-dom/client';
import CurrencyConverter from './CurrencyConverter.js';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Container>
        <CurrencyConverter />
      </Container>
    </BrowserRouter>
);