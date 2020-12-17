import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSettings } from '../../store/settingsSlice';

import zoneGenerator from '../../helpers/zone-generator';

import * as S from './styles';
import ProgressBar from '../../components/progressBar';
import Dialog from '../../components/dialog';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [difficulty, setDifficulty] = useState<number>(0);

  const changeDifficultyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(+e.target.value);
  };

  const dispatchGameSettings = () => {
    const roundedDifficulty = Math.floor(difficulty);
    const data = zoneGenerator(roundedDifficulty);

    const gameSettings = {
      ...data,
      startingTime: Date.now()
    };

    dispatch(setSettings({ settings: gameSettings }));
    history.push('/game');
  };

  return (
    <S.Container>
      <Dialog>
        <S.Title>How to play</S.Title>
        <S.HowToList>
          <li>Click and hold the pick to move it</li>
          <li>Press and hold any key unlock</li>
          <li>Don&apos;t hush it! Otherwise you&apos;ll jam the lock.</li>
        </S.HowToList>

        <S.Title>Set difficulty</S.Title>
        <S.DifficultyContainer>
          <ProgressBar
            difficulty={difficulty}
            difficultyHandler={changeDifficultyHandler}
          />
          <S.Button
            onClick={dispatchGameSettings}
          >
            Play
          </S.Button>
        </S.DifficultyContainer>
      </Dialog>
    </S.Container>
  );
};
