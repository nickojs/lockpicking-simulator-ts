import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import { Title, TextSmall, InnerContainer } from '../../generalStyles';

import SideMenu from '../../components/sidemenu';

export default () => {
  const [menu, toggleMenu] = useState<boolean>(false);
  // const [triggerForm, setTriggerForm] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const container = useRef<HTMLDivElement | null>(null);

  const keyHandler = (e: React.KeyboardEvent) => {
    const key = e.nativeEvent.code;

    switch (key) {
      case 'KeyW':
      case 'ArrowUp':
      case 'Numpad8':
        if (index > 0) setIndex((prevIndex) => prevIndex - 1);
        break;
      case 'KeyS':
      case 'ArrowDown':
      case 'Numpad2':
        if (index < 4) setIndex((prevIndex) => prevIndex + 1);
        break;
      case 'Tab':
      case 'Space':
        // setTriggerForm(true);
        toggleMenu(!menu);
        break;
      default:
        break;
    }
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    container.current?.focus();
  };

  // const changeFormType = (i) => setIndex(i);

  useEffect(() => { container.current?.focus(); }, []);

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
        {/* {triggerForm
          && <Forms index={index} changeForm={changeFormType} />} */}
      </S.Container>
      {menu && (
        <SideMenu
          index={index}
          onMouseDown={mouseDownHandler}
        />
      )}
    </>
  );
};
