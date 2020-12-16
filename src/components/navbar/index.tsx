import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

import * as S from './styles';
import arrow from '../../assets/sideMenuArrow.png';

export default () => {
  const [menu, setMenu] = useState(false);
  const { token, username } = useSelector((state: RootState) => state.user);

  const returnButtonHandler = () => {
    setMenu(false);
  };

  return (
    <S.Header menu={menu}>
      <S.Navbar>
        <h1>{username || 'Not Logged In'}</h1>
        <div>
          <S.Button to="/" onClick={returnButtonHandler}>Home</S.Button>
          {token && <S.Button to="/logout">Logout</S.Button>}
        </div>
      </S.Navbar>
      <S.ArrowContainer menu={menu}>
        <S.Arrow src={arrow} alt="Arrow" onClick={() => setMenu(!menu)} />
      </S.ArrowContainer>
    </S.Header>
  );
};
