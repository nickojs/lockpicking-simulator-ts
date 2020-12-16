import React from 'react';

import Dialog from '../../../components/dialog';

import Signup from './signup';
import Login from './login';
import Token from './token';
// import TokenForm from './tokenForm/tokenForm';
// import UpdateForm from './updateForm/updateForm';
// import DeleteForm from './deleteForm/deleteForm';

const Forms = ({ index, isAuth }: { index: number, isAuth: boolean }) => {
  let form = null;

  switch (index) {
    case 0:
      form = isAuth ? (
        <p>Update Account Form</p>
      ) : <Signup />;
      break;
    case 1:
      form = isAuth ? (
        <p>Delete Account Form</p>
      ) : <Login />;
      break;
    case 2:
      form = isAuth ? null : <Token />;
      break;
    default:
      break;
  }

  return (
    form && (
      <Dialog>
        {form}
      </Dialog>
    ));
};

export default Forms;
