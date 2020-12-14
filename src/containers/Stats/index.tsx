import React, { useEffect, useState } from 'react';
// import moment from 'moment';
import * as S from './styles';

import useRequest, { Options, State } from '../../hooks/useRequest';
import { Title, InnerContainer } from '../../generalStyles';

export default () => {
  const [options, setOptions] = useState<Options>(null);
  const [response] = useRequest(options);
  const { data, loading, error } = response as State;

  useEffect(() => {
    setOptions({
      method: 'GET',
      url: 'https://api.jikan.moe/v3/anime/1' // using <any> API just to test the request hook
    });
  }, []);

  // logic for fetching database scores

  // let stats;

  // if (data) {
  //   stats = data.records.map((s) => (
  //     <tr key={s.id}>
  //       <td>{s.username}</td>
  //       <td>{Number(s.time).toFixed(2)}</td>
  //       <td>{s.picks}</td>
  //       <td>{moment(s.createdAt).format('MMMM Do [at] h:mm:ss a')}</td>
  //     </tr>
  //   ));
  // }

  return (
    <S.Container>
      <InnerContainer>
        <Title>Stats</Title>
      </InnerContainer>
      <InnerContainer>
        <S.MsgContainer>
          {error && <S.ErrorMsg>{error}</S.ErrorMsg> }
          {loading && <p>Loading...</p>}
        </S.MsgContainer>
        {data
          && (
          <S.Table>
            <thead>
              <tr>
                <th>username</th>
                <th>time</th>
                <th>picks</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {/* {stats} */}
            </tbody>
          </S.Table>
          )}
      </InnerContainer>
    </S.Container>
  );
};
