import React, { useState } from 'react';
import * as S from './styles';

import Dialog from '../../../components/dialog';
import useRequest, { Options, State } from '../../../hooks/useRequest';

import SignupForm from './signup';
// import LoginForm from './loginForm/loginForm';
// import TokenForm from './tokenForm/tokenForm';
// import UpdateForm from './updateForm/updateForm';
// import DeleteForm from './deleteForm/deleteForm';

const Forms = ({ index }: { index: number }) => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { loading, error, data } = requestData as State;

  const requestHandler = (payload: Options) => setOptions(payload);

  let form = null;

  switch (index) {
    case 0:
      form = (
        <SignupForm optionsHandler={requestHandler} />
      );
      break;
    // case 1:
    //   form = (
    //     <LoginForm
    //       optionsHandler={requestHandler}
    //       dataHandler={requestData}
    //     />
    //   );
    //   break;
    // case 2:
    //   form = (
    //     <TokenForm
    //       optionsHandler={requestHandler}
    //       dataHandler={requestData}
    //     />
    //   );
    //   break;
    // case 3:
    //   form = (
    //     <UpdateForm
    //       optionsHandler={requestHandler}
    //       dataHandler={requestData}
    //     />
    //   );
    //   break;
    // case 4:
    //   form = (
    //     <DeleteForm
    //       optionsHandler={requestHandler}
    //       dataHandler={requestData}
    //     />
    //   );
    //   break;
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
