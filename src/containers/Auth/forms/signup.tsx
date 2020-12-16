import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import * as S from './styles';
import useRequest, { Options, State } from '../../../hooks/useRequest';

export default () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onBlur'
  });

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { loading, error, data } = requestData as State;

  const submit = (payload: Record<string, any>) => setOptions({
    method: 'POST',
    // url: `https://${process.env.REACT_APP_BACKEND}/auth/signup`,
    url: 'https://reqres.in/api/users',
    data: payload
  });

  useEffect(() => {
    // redirect to login, auto login, whatever
    console.log(data);
  }, [data]);

  return (
    <>
      <S.MsgContainer>
        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
        {loading && <p>Loading...</p>}
        {data && <p>Redirecting...</p>}
      </S.MsgContainer>

      <S.SmallTitle>Hey you, you&apos;re finally awake</S.SmallTitle>
      <S.Form key={0} onSubmit={handleSubmit(submit)} id="createAccountForm">
        <S.FormInputs>
          <S.Input
            type="text"
            placeholder="username"
            name="username"
            ref={register({ required: true, minLength: 4, maxLength: 18 })}
          />
          {errors.username?.type === 'required'
            && <S.ErrorMsg>username required</S.ErrorMsg>}
          {errors.username?.type === 'minLength'
            && <S.ErrorMsg>username should be at least 4 characters long</S.ErrorMsg>}
          {errors.username?.type === 'maxLength'
            && <S.ErrorMsg>username maximum length (18) exceeded</S.ErrorMsg>}
          <S.Input
            type="email"
            placeholder="email"
            name="email"
            ref={register({ required: true, pattern: /(.+)@(.+){2,}\.(.+){2,}/ })}
          />
          {errors.email?.type === 'required'
            && <S.ErrorMsg>email required</S.ErrorMsg>}
          {errors.email?.type === 'pattern'
            && <S.ErrorMsg>invalid email</S.ErrorMsg>}
          <S.InputDiv>
            <S.Input
              type={togglePassword ? 'password' : 'text'}
              placeholder="password"
              name="password"
              ref={register({ required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })}
            />
            <S.PasswordIndicator
              onClick={() => setTogglePassword(!togglePassword)}
              indicator={togglePassword ? 1 : 0}
            />
          </S.InputDiv>
          {errors.password?.type === 'required'
            && <S.ErrorMsg>password required</S.ErrorMsg>}
          {errors.password?.type === 'pattern'
            && (
            <S.ErrorMsg>
              password should be at least 8 characters long
              and contain at least one letter and one number
            </S.ErrorMsg>
            )}
        </S.FormInputs>
        <S.FormSubmit>
          <S.ConfirmButton
            type="submit"
            value="Create Acc"
            disabled={Object.keys(errors).length > 0}
          />
        </S.FormSubmit>
      </S.Form>
    </>
  );
};
