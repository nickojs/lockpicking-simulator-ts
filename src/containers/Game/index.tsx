import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Config } from '../../store/settingsSlice';

import * as S from './styles';
import Lockpad from '../../components/lockpad';
import HUD from '../../components/hud';

export default () => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [keyDown, setKeyDown] = useState<boolean>(false);
  const [event, setEvent] = useState<MouseEvent | null>(null);

  const { config } = useSelector((state: RootState) => state.settings);
  const { info } = config as Config;
  const { pickLife, pickQtd } = useSelector((state: RootState) => state.pick);

  const mouseDownHandler = () => {
    setMouseDown(true);
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    const key = e.nativeEvent.code;
    if (key !== 'Space') return;
    setKeyDown(true);
  };

  const keyUpHandler = () => {
    setKeyDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (mouseDown && !keyDown) {
      const { nativeEvent } = e;
      setEvent(nativeEvent);
    }
  };

  return (
    <>
      <HUD life={pickLife} picks={pickQtd} info={info} />
      <S.Container>
        <S.InnerContainer
          tabIndex={0}
          onMouseUp={mouseUpHandler}
          onMouseDown={mouseDownHandler}
          onKeyUp={keyUpHandler}
          onKeyDown={keyDownHandler}
          onMouseMove={mouseMoveHandler}
        >
          <Lockpad
            event={event}
            keyDown={keyDown}
          />
        </S.InnerContainer>
      </S.Container>
    </>
  );
};
