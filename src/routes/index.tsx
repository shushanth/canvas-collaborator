import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import CanvasLists from '../pages/canvas-list/CanvasLists';
import CanvasDetails from '../pages/canvas-details/CanvasDetails';

const history = createBrowserHistory();

const PageRoutes = (): JSX.Element => {
  return (
    <Router history={history}>
      <Route exact path="/" component={CanvasLists} />
      <Route path="/details/:id" component={CanvasDetails} />
    </Router>
  );
};

export default PageRoutes;
