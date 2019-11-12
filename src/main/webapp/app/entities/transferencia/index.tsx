import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Transferencia from './transferencia';
import TransferenciaDetail from './transferencia-detail';
import TransferenciaUpdate from './transferencia-update';
import TransferenciaDeleteDialog from './transferencia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransferenciaDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransferenciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransferenciaUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Transferencia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TransferenciaDeleteDialog} />
  </>
);

export default Routes;
