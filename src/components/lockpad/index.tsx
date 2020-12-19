import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Config } from '../../store/settingsSlice';

import * as S from './styles';
// import Notification from '../../../components/notification/notification';
import lockhole from '../../assets/lockpad/lockhole.png';
import pickImg from '../../assets/lockpad/pick_with_space.png';

import useAngle from '../../hooks/useAngle';
import distanceMeter from '../../helpers/distance-meter';

interface LockpadProps {
  event: MouseEvent | null;
  keyDown: boolean;
}

const DEGS = 90;

export default ({ event, keyDown }: LockpadProps) => {
  // const { input, movement, pick, game, user } = useSelector((state) => state);
  // const { token, username } = user;
  // const { pickLife, pickLives } = pick;
  const { config } = useSelector((state: RootState) => state.settings);
  const { unlockzone } = config as Config;

  const [keyDownTime, setKeyDownTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(-1);
  const [unlockable, setUnlockable] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  // const dispatch = useDispatch();
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

  // // defines if the pick is on the hotzone
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
    if (distance === 90) {
      setUnlockable(true);
    }
  }, [distance]);

  useEffect(() => {
    if (unlockable && keyDownTime > 750) {
      setRedirect(true);
    }
  }, [unlockable, keyDownTime]);

  // // defines wherever the pick is broken or not
  // useEffect(() => {
  //   // if the key is not being pressed, exits this effect
  //   if (!keyPressMoment) return;

  //   const diffTime = Math.abs(Date.now() - keyPressMoment);
  //   // starts to "hurt" the pick after sometime
  //   if (diffTime > 20) {
  //     dispatch(gameActions.toggleUnlock(false));
  //     dispatch(pickActions.reducePickLife());

  //     if (isUnlockable) {
  //       dispatch(gameActions.toggleUnlock(true));
  //     }
  //   }
  // }, [keyPressMoment, isUnlockable, dispatch]);

  // // remove a pick if pickLife reduces to zero, also toggles notification
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(gameActions.toggleNotification(null));
  //   }, 1500);

  //   if (pickLife === 0) {
  //     dispatch(gameActions.toggleNotification('Oops! You just broke a pick'));
  //     dispatch(pickActions.reducePickLives());
  //   }

  //   return () => { clearTimeout(timer); };
  // }, [pickLife, dispatch]);

  // // ends game if pickLives is reduced to zero
  // useEffect(() => {
  //   if (pickLives === 0) dispatch(gameActions.toggleGameOver(true));
  // }, [pickLives, dispatch]);

  return (
    <>
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
      {redirect
        && <Redirect to="/" />}
      {/* {notification
        && <Notification>Oops, you just broke a pick</Notification>} */}
    </>
  );
};
