import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Banco from './banco';
import BancoDetail from './banco-detail';
import BancoUpdate from './banco-update';
import BancoDeleteDialog from './banco-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BancoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BancoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BancoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Banco} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BancoDeleteDialog} />
  </>
);

export default Routes;
