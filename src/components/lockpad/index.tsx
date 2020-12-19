import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduceLife, reduceQtd, clearPicks } from '../../store/pickSlice';

import { RootState } from '../../store/rootReducer';
import { Config } from '../../store/settingsSlice';

import * as S from './styles';
import lockhole from '../../assets/lockpad/lockhole.png';
import pickImg from '../../assets/lockpad/pick_with_space.png';

import useAngle from '../../hooks/useAngle';
import distanceMeter from '../../helpers/distance-meter';

interface LockpadProps {
  event: MouseEvent | null;
  keyDown: boolean;
}

enum ENDGAME {
  WAITING,
  FAIL,
  WIN,
}

const DEGS = 90;

export default ({ event, keyDown }: LockpadProps) => {
  const { config } = useSelector((state: RootState) => state.settings);
  const { unlockzone } = config as Config;
  const { pickLife, pickQtd } = useSelector((state: RootState) => state.pick);

  const [keyDownTime, setKeyDownTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(-1);
  const [unlockable, setUnlockable] = useState<boolean>(false);
  const [endgame, setEndgame] = useState<ENDGAME>(ENDGAME.WAITING);

  const dispatch = useDispatch();
  const pickRef = useRef<HTMLImageElement | null>(null);
  const pickPosition = useAngle(pickRef, event);

  // const postStats = useCallback((time, picks) => {
  //   console.log('posting stats...');

  //   fetch(`https://${process.env.REACT_APP_BACKEND}/stats`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username,
  //       time,
  //       picks
  //     })
  //   });
  // }, [token, username]);

  useEffect(() => {
    const distance = distanceMeter(pickPosition, unlockzone);
    setDistance(distance > DEGS ? -3 : DEGS - distance);
  }, [pickPosition, unlockzone]);

  useEffect(() => {
    if (!keyDown) setKeyDownTime(0);
    const timer = setInterval(() => {
      if (keyDown) setKeyDownTime((pState: number) => pState + 16);
    }, 16);

    return () => { clearInterval(timer); };
  }, [keyDown]);

  useEffect(() => {
    setUnlockable(false);
    if (distance === 90) {
      setUnlockable(true);
    }
  }, [distance]);

  useEffect(() => {
    if (unlockable && keyDownTime > 750) {
      setEndgame(ENDGAME.WIN);
    }
  }, [unlockable, keyDownTime]);

  useEffect(() => {
    if (keyDownTime > 150 && pickLife > 0 && !unlockable) {
      dispatch(reduceLife(0.5));
    }
  }, [keyDownTime, pickLife, unlockable]);

  useEffect(() => {
    if (pickLife === 0) {
      dispatch(reduceQtd());
    }
  }, [pickLife]);

  useEffect(() => {
    if (pickQtd - 1 < 0) {
      setEndgame(ENDGAME.FAIL);
    }
  }, [pickQtd]);

  useEffect(() => {
    if (endgame > 0) {
      dispatch(clearPicks());
    }
  }, [endgame]);

  return (
    <>
      {endgame === 0 && (
      <S.LockBackground>
        <S.LockpadContainer
          position={distance}
          isTurning={keyDown}
        >
          <S.Pick
            src={pickImg}
            alt="a picklock that looks like a twig"
            ref={(ref) => pickRef.current = ref}
            // @ts-ignore
            position={pickPosition}
          />
          <S.LockpadBackground>
            <S.Lockpad
              src={lockhole}
              alt="an ugly but functional lockpad"
            />
          </S.LockpadBackground>
        </S.LockpadContainer>
      </S.LockBackground>
      )}
      {endgame > 0 && (
        <Redirect
          to={{
            pathname: '/endgame',
            state: {
              endgame
            }
          }}
        />
      )}
    </>
  );
};
