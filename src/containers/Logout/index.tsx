import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../store/userSlice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
