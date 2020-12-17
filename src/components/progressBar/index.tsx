import React from 'react';
import * as S from './styles';

interface ProgressBarProps {
  difficulty: number;
  difficultyHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProgressBar = ({ difficulty, difficultyHandler }: ProgressBarProps) => (
  <S.ProgressContainer>
    <S.DifficultyMeter>{difficulty}</S.DifficultyMeter>
    <S.ProgressBar
      type="range"
      min={0}
      max={10}
      step={1}
      onChange={difficultyHandler}
      value={difficulty}
    />
  </S.ProgressContainer>
);

export default ProgressBar;
