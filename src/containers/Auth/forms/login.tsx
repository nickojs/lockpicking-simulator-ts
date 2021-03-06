import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setAuth } from '../../../store/userSlice';

import * as S from './styles';
import useRequest, { Options, State } from '../../../hooks/useRequest';

export default () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const { register, handleSubmit, errors } = useForm();

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { loading, error, data } = requestData as State;

  const dispatch = useDispatch();
  const submit = (payload: Record<string, any>) => setOptions({
    method: 'POST',
    // url: `https://${process.env.REACT_APP_BACKEND}/auth/login`,
    url: 'https://reqres.in/api/users',
    data: payload
  });

  useEffect(() => {
    // mock auth token
    if (data) {
      const authObj = {
        token: 'token',
        username: data.username
      };

      dispatch(setAuth(authObj));
      localStorage.setItem('auth', JSON.stringify(authObj));
    }
  }, [data]);

  return (
    <>
      <S.MsgContainer>
        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
        {loading && <p>Loading...</p>}
      </S.MsgContainer>

      <S.SmallTitle>Wait... I know you</S.SmallTitle>
      <S.Form key={1} onSubmit={handleSubmit(submit)} id="loginForm">
        <S.FormInputs>
          <S.Input
            type="text"
            placeholder="username"
            name="username"
            ref={register({ required: true })}
          />
          {errors?.username?.types?.required
            && <S.ErrorMsg>username is required</S.ErrorMsg>}
          <S.InputDiv>
            <S.Input
              type={togglePassword ? 'password' : 'text'}
              placeholder="password"
              name="password"
              ref={register({ required: true })}
            />
            <S.PasswordIndicator
              onClick={() => setTogglePassword(!togglePassword)}
              indicator={togglePassword ? 1 : 0}
            />
          </S.InputDiv>
          {errors?.password?.types?.required
            && <S.ErrorMsg>password is required</S.ErrorMsg>}
        </S.FormInputs>
        <S.FormSubmit>
          <S.ConfirmButton
            type="submit"
            value="Login"
            disabled={Object.keys(errors).length > 0}
          />
        </S.FormSubmit>
      </S.Form>
    </>
  );
};
