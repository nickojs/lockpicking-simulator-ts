import React, { useState/* , useEffect */ } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { setAuth } from '../../../../store/actions/user';

import * as S from './styles';
import { FormProps } from '.';

export default ({ optionsHandler }: FormProps) => {
  const [togglePassword, setTogglePassword] = useState(true);
  const { register, handleSubmit, errors } = useForm();

  // const history = useHistory();
  // const dispatch = useDispatch();

  const submit = (payload: Record<string, any>) => optionsHandler({
    method: 'POST',
    url: `https://${process.env.REACT_APP_BACKEND}/auth/login`,
    data: payload
  });

  return (
    <>
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
