import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../containers/Home';
import About from '../containers/About';
import Auth from '../containers/Auth';
import Logout from '../containers/Logout';
import Stats from '../containers/Stats';
import GameOptions from '../containers/GameOptions';
import Game from '../containers/Game';
import Endgame from '../containers/Endgame';

const routesArray = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
  { path: '/stats', name: 'Stats', Component: Stats },
  { path: '/auth', name: 'Auth', Component: Auth },
  { path: '/logout', name: 'Logout', Component: Logout },
  { path: '/game-options', name: 'Game Options', Component: GameOptions },
  { path: '/game', name: 'Game', Component: Game },
  { path: '/endgame', name: 'Endgame', Component: Endgame }
];

const routes = (
  <Switch>
    {routesArray.map(
      ({ path, Component }) => (
        <Route
          exact
          key={path}
          path={path}
          component={Component}
        />
      )
    )}
    <Redirect to="/" />
  </Switch>

);

export default routes;
