import React, { useState } from 'react';
import * as S from './styles';
import arrow from '../../assets/sideMenuArrow.png';

export default () => {
  // const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  // const { isAuth, username } = useSelector((state) => state.user);

  const isAuth = false;
  const username = 'false';

  const returnButtonHandler = () => {
    setMenu(false);
    // dispatch({ type: 'RESET_GAME' });
  };

  return (
    <S.Header menu={menu}>
      <S.Navbar>
        <h1>{isAuth ? username : 'Not Logged In'}</h1>
        <S.Button to="/" onClick={returnButtonHandler}>Home</S.Button>
      </S.Navbar>
      <S.ArrowContainer menu={menu}>
        <S.Arrow src={arrow} alt="Arrow" onClick={() => setMenu(!menu)} />
      </S.ArrowContainer>
    </S.Header>
  );
};
