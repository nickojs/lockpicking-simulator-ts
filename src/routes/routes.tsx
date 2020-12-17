import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../containers/Home';
// import LockpadMenu from '../containers/LockpadMenu/LockpadMenu';
// import Lockpad from '../containers/Lockpad/Lockpad';
// import Outcome from '../containers/Outcome/Outcome';
import About from '../containers/About';
import Auth from '../containers/Auth';
import Logout from '../containers/Logout';
import Stats from '../containers/Stats';
import GameOptions from '../containers/GameOptions';

// import withNavigation from '../hoc/withNavigation';

const routesArray = [
  // { path: '/game-options', name: 'Options', Component: LockpadMenu },
  // { path: '/game', name: 'Game', Component: Lockpad },
  // { path: '/endgame', name: 'Endgame', Component: Outcome },
  //  { path: '/about', name: 'About', Component: About },
  //  { path: '/auth', name: 'Auth', Component: Auth },
  // { path: '/logout', name: 'Logout', Component: Logout }
  //  { path: '/stats', name: 'Stats', Component: Stats }
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
  { path: '/stats', name: 'Stats', Component: Stats },
  { path: '/auth', name: 'Auth', Component: Auth },
  { path: '/logout', name: 'Logout', Component: Logout },
  { path: '/game-options', name: 'Game Options', Component: GameOptions }
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
