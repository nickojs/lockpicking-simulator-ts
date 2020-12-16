import React from 'react';
import * as S from './styles';
import Hint from '../hint';

import { Path } from '../../models/Path';

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  path: Path;
}

export default ({ path, ...props }: MenuProps) => (
  <S.MenuContainer
    {...props}
  >
    <Hint>
      Use the WASD keys to control the menu
      {' '}
      <br />
      Select an option and press the same key again to enter
    </Hint>
    <S.MenuLayer>

      <S.MenuTop>
        <p>Play</p>
        <S.ColumnWrapper>
          <S.ArrowUp active={path === 'game-options' ? 1 : 0} />
        </S.ColumnWrapper>
      </S.MenuTop>

      <S.MenuLeft>
        <p>Stats</p>
        <S.RowWrapper>
          <S.ArrowLeft active={path === 'stats' ? 1 : 0} />
        </S.RowWrapper>
      </S.MenuLeft>

      <S.MenuRight isAuth={false}>
        <S.RowWrapper>
          <S.ArrowRight active={path === 'auth' ? 1 : 0} />
        </S.RowWrapper>
        <p>Auth</p>
        {/* <p>{isAuth ? 'Logout' : 'Login'}</p> */}
      </S.MenuRight>

      <S.MenuBottom>
        <S.ColumnWrapper>
          <S.ArrowDown active={path === 'about' ? 1 : 0} />
        </S.ColumnWrapper>
        <p>About</p>
      </S.MenuBottom>
    </S.MenuLayer>
  </S.MenuContainer>
);

// about the "condition ? 1 : 0" comparison on the active props, check:
// https://github.com/styled-components/styled-components/issues/1198
