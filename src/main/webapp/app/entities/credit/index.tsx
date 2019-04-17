import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Credit from './credit';
import CreditDetail from './credit-detail';
import CreditUpdate from './credit-update';
import CreditDeleteDialog from './credit-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreditUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CreditUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CreditDetail} />
      <ErrorBoundaryRoute path={match.url} component={Credit} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CreditDeleteDialog} />
  </>
);

export default Routes;
