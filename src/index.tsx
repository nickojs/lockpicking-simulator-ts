import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import WebFont from 'webfontloader';
import App from './App';

WebFont.load({
  google: {
    families: ['Cinzel:400,700', 'Cormorant Garamond:400', 'serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
