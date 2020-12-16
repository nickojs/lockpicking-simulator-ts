import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import { Title, TextSmall, InnerContainer } from '../../generalStyles';

import SideMenu from '../../components/sidemenu';
import Forms from './forms';

const UnAuthMenu = [
  {
    id: 0,
    name: 'Create Account'
  },
  {
    id: 1,
    name: 'Login'
  },
  {
    id: 2,
    name: 'Request Token'
  }
];

const AuthMenu = [
  {
    id: 0,
    name: 'Update Account'
  },
  {
    id: 1,
    name: 'Delete Account'
  }
];

export type MenuItem = typeof UnAuthMenu[0];
export type MenuArray = MenuItem[];

export default () => {
  const [menu, toggleMenu] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [items, setItems] = useState<MenuArray>(UnAuthMenu);
  const container = useRef<HTMLDivElement | null>(null);

  const isAuth = false;

  const keyHandler = (e: React.KeyboardEvent) => {
    const key = e.nativeEvent.code;
    const currentFocusedElement = document.activeElement;

    // menu only opens if no form is focused
    if (currentFocusedElement === container.current && key === 'Space') toggleMenu(true);

    // only capture keys while the menu is opened
    if (!menu) return;

    switch (key) {
      case 'KeyW':
      case 'ArrowUp':
      case 'Numpad8':
        if (index > 0) setIndex((prevIndex) => prevIndex - 1);
        break;
      case 'KeyS':
      case 'ArrowDown':
      case 'Numpad2':
        if (index < Object.keys(items).length - 1) setIndex((prevIndex) => prevIndex + 1);
        break;
      case 'KeyD':
      case 'ArrowRight':
      case 'Numpad6':
        toggleMenu(false);
        break;
      default:
        break;
    }
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    container.current?.focus();
  };

  useEffect(() => { container.current?.focus(); }, []);

  useEffect(() => { setItems(isAuth ? AuthMenu : UnAuthMenu); }, [isAuth]);

  return (
    <>
      <S.Container
        tabIndex={0}
        ref={(ref) => container.current = ref}
        menu={menu ? 1 : 0}
        onKeyDown={keyHandler}
      >
        <InnerContainer>
          <Title>Login</Title>
          <TextSmall>Press space to open menu</TextSmall>
        </InnerContainer>

        <Forms index={index} isAuth={isAuth} />

      </S.Container>
      {menu && (
        <SideMenu
          index={index}
          items={items}
          onMouseDown={mouseDownHandler}
        />
      )}
    </>
  );
};
