import React, { useEffect, useState } from 'react';

import * as S from './styles';
import Lockpad from '../../components/lockpad';
// import HUD from '../../components/hud/hud';

const LockPad = () => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [keyDown, setKeyDown] = useState<boolean>(false);
  const [keyDownTime, setKeyDownTime] = useState<number>(0);

  const mouseDownHandler = () => {
    setMouseDown(true);
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
  };

  const keyDownHandler = () => {
    setKeyDown(true);
  };

  const keyUpHandler = () => {
    setKeyDown(false);
    setKeyDownTime(0);
  };

  const mouseMoveHandler = () => {
    if (mouseDown) {
      console.log('moving mouse');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (keyDown) setKeyDownTime((pState: number) => pState + 16);
    }, 16);

    return () => { clearInterval(timer); };
  }, [keyDown]);

  useEffect(() => {
    console.log(keyDownTime);
  }, [keyDownTime]);

  return (
    <>
      {/* <HUD life={pickLife} picks={pickLives} info={info} /> */}
      <S.Container>
        <S.InnerContainer
          tabIndex={0}
          onMouseUp={mouseUpHandler}
          onMouseDown={mouseDownHandler}
          onKeyUp={keyUpHandler}
          onKeyDown={keyDownHandler}
          onMouseMove={mouseMoveHandler}
        >
          <Lockpad />
        </S.InnerContainer>
      </S.Container>
    </>
  );
};

export default LockPad;
