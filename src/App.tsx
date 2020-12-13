import React from 'react';
import Navbar from './components/navbar';
import routes from './routes/routes';

export default () => (
  <>
    <Navbar />
    {routes}
  </>
);
