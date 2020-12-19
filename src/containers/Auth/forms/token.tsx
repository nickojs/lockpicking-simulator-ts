import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as S from './styles';
import useRequest, { Options, State } from '../../../hooks/useRequest';

export default () => {
  const { register, handleSubmit, errors } = useForm();

  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { loading, error } = requestData as State;

  const submit = (payload: Record<string, any>) => setOptions({
    method: 'POST',
    // url: `https://${process.env.REACT_APP_BACKEND}/auth/request-token`,
    url: 'https://reqres.in/api/users',
    data: payload
  });

  return (
    <>
      <S.MsgContainer>
        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
        {loading && <p>Loading...</p>}
      </S.MsgContainer>

      <S.SmallTitle>
        Forgot your password? Request a temporary token!
      </S.SmallTitle>

      <S.Form key={2} onSubmit={handleSubmit(submit)} id="resetTokenForm">
        <S.FormInputs>
          <S.Input
            type="text"
            placeholder="email"
            name="email"
            ref={register({ required: true, pattern: /(.+)@(.+){2,}\.(.+){2,}/ })}
          />
          {errors?.username?.types?.required
            && <S.ErrorMsg>email required</S.ErrorMsg>}
          {errors?.username?.types?.pattern
            && <S.ErrorMsg>email should be... an email!</S.ErrorMsg>}
        </S.FormInputs>
        <S.FormSubmit>
          <S.ConfirmButton
            type="submit"
            value="Request Token"
            disabled={Object.keys(errors).length > 0}
          />
        </S.FormSubmit>
      </S.Form>
    </>
  );
};
