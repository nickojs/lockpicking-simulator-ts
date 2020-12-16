import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/userSlice';

import Navbar from './components/navbar';
import routes from './routes/routes';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      dispatch(setAuth(JSON.parse(token)));
    }
  }, []);

  return (
    <>
      <Navbar />
      {routes}
    </>
  );
};
