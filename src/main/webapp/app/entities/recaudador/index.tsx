import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Recaudador from './recaudador';
import RecaudadorDetail from './recaudador-detail';
import RecaudadorUpdate from './recaudador-update';
import RecaudadorDeleteDialog from './recaudador-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecaudadorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecaudadorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecaudadorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Recaudador} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RecaudadorDeleteDialog} />
  </>
);

export default Routes;
