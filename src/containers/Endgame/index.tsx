import React from 'react';
import { RouteProps } from 'react-router-dom';
import Dialog from '../../components/dialog';

interface EndgameProps {
  location: RouteProps['location']
}

type EndgameState = {
  state: {
    endgame: number;
  }
}
export default ({ location }: EndgameProps) => {
  const { state } = location as unknown as EndgameState;

  return (
    <Dialog>
      {state.endgame === 1 && (<p>You lose!</p>)}
      {state.endgame === 2 && (<p>You win!</p>)}
    </Dialog>
  );
};
