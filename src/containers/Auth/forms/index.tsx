import React, { useState } from 'react';
import * as S from './styles';

import Dialog from '../../../components/dialog';
import useRequest, { Options, State } from '../../../hooks/useRequest';

import Signup from './signup';
import Login from './login';
import Token from './token';
// import TokenForm from './tokenForm/tokenForm';
// import UpdateForm from './updateForm/updateForm';
// import DeleteForm from './deleteForm/deleteForm';

export interface FormProps {
  optionsHandler: (payload: Options) => void;
}

const Forms = ({ index }: { index: number }) => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { loading, error, data } = requestData as State;

  const requestHandler = (payload: Options) => setOptions(payload);

  let form = null;

  switch (index) {
    case 0:
      form = (
        <Signup optionsHandler={requestHandler} />
      );
      break;
    case 1:
      form = (
        <Login optionsHandler={requestHandler} />
      );
      break;
    case 2:
      form = (
        <Token optionsHandler={requestHandler} />
      );
      break;
    default:
      break;
  }

  return (
    <Dialog>
      <S.MsgContainer>
        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
        {loading && <p>Loading...</p>}
        {data && <p>Redirecting...</p>}
      </S.MsgContainer>
      {form}
    </Dialog>
  );
};

export default Forms;
