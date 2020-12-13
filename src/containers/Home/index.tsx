import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setNavigation } from '../../store/actions/user';

import * as S from './styles';
import { Title, TextSmall, InnerContainer } from '../../generalStyles';

import Menu from '../../components/menu';

import { Path } from '../../models/Path';

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export default () => {
  const [path, setPath] = useState<Path>('');
  const [direction, setDirection] = useState<Direction | null>(null);
  const [menu, toggleMenu] = useState<boolean>(false);
  // const { isAuth } = useSelector((state) => state.user);
  const container = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  const isAuth = true;

  const triggerRedirect = (dir: Direction) => {
    if (direction === dir) {
      history.push(path);
    }
  };

  const keyHandler = (e: React.KeyboardEvent) => {
    const key = e.nativeEvent.code;

    switch (key) {
      case 'KeyW':
      case 'ArrowUp':
      case 'Numpad8':
        triggerRedirect(Direction.UP);
        setDirection(Direction.UP);
        setPath('game-options');
        break;
      case 'KeyA':
      case 'ArrowLeft':
      case 'Numpad4':
        triggerRedirect(Direction.LEFT);
        setDirection(Direction.LEFT);
        setPath('stats');
        break;
      case 'KeyS':
      case 'ArrowDown':
      case 'Numpad2':
        triggerRedirect(Direction.DOWN);
        setDirection(Direction.DOWN);
        setPath('about');
        break;
      case 'KeyD':
      case 'ArrowRight':
      case 'Numpad6':
        triggerRedirect(Direction.RIGHT);
        setDirection(Direction.RIGHT);
        setPath(isAuth ? 'logout' : 'auth');
        break;
      case 'Space':
        toggleMenu(!menu);
        break;
      default:
        toggleMenu(false);
        break;
    }
  };

  const mouseHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    container.current?.focus();
  };

  useEffect(() => { setPath(''); }, [menu]);

  useEffect(() => { container.current?.focus(); }, []);

  return (
    <>
      <S.Container
        ref={(ref) => container.current = ref}
        tabIndex={0}
        onKeyDown={keyHandler}
        isMenuOpen={menu}
      >
        <InnerContainer>
          <Title>lockpicking simulator</Title>
          <hr />
          <TextSmall>Press space to start</TextSmall>
        </InnerContainer>
      </S.Container>
      {menu && (
        <Menu
          path={path}
          onMouseDown={mouseHandler}
        />
      )}
    </>
  );
};
