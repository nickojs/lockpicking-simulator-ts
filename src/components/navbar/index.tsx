import React, { useState } from 'react';
import * as S from './styles';
import arrow from '../../assets/sideMenuArrow.png';

export default () => {
  // const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(true);
  // const { isAuth, username } = useSelector((state) => state.user);

  const returnButtonHandler = () => {
    setToggleMenu(!toggleMenu);
    // dispatch({ type: 'RESET_GAME' });
  };

  return (
    <S.Header toggle={toggleMenu}>
      <S.Navbar>
        <h1>Not ss</h1>
        {/* <h1>{isAuth ? username : 'Not Logged In'}  </h1> */}
        <S.Button onClick={returnButtonHandler}>Home</S.Button>
      </S.Navbar>
      <S.ArrowContainer toggle={toggleMenu}>
        <S.Arrow src={arrow} alt="Arrow" onClick={() => setToggleMenu(!toggleMenu)} />
      </S.ArrowContainer>
    </S.Header>
  );
};
