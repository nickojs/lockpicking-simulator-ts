import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import WebFont from 'webfontloader';
import store from './store/store';

WebFont.load({
  google: {
    families: ['Cinzel:400,700', 'Cormorant Garamond:400', 'serif']
  }
});

const render = () => {
  // eslint-disable-next-line global-require
  const App = require('./App').default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
