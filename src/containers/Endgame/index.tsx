import React from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import * as S from './styles';
// eslint-disable-next-line import/extensions
import answers from './text.json';

interface EndgameProps {
  location: RouteProps['location']
}

type EndgameState = {
  state: {
    endgame: number;
  }
}

const GameOver = () => {
  const generateRandomNumber = (min: number, max: number) => (
    Math.ceil(Math.random() * (max - min) + min)
  );

  const generatePhrase = () => {
    const randomNumber = generateRandomNumber(0, 6);
    return answers.gameOver[randomNumber];
  };

  const randomPhrase = generatePhrase();

  return (
    <>
      <S.Text>
        {randomPhrase}
      </S.Text>
    </>
  );
};

const Unlocked = ({ name }: { name: string}) => (
  <h1>
    Congratulations,
    {' '}
    {name}
    !
    {' '}
    <br />
    You unlocked the chest
  </h1>
);

export default ({ location }: EndgameProps) => {
  const { state } = location as unknown as EndgameState;
  const history = useHistory();

  const returnHandler = () => history.push('/');

  return (
    <S.Container>
      <S.DialogPadded>
        {state.endgame === 1 && <GameOver />}
        {state.endgame === 2 && <Unlocked name="test" />}
        <S.Navigation>
          <S.Button onClick={returnHandler}>
            Return
          </S.Button>
        </S.Navigation>
      </S.DialogPadded>
    </S.Container>
  );
};
