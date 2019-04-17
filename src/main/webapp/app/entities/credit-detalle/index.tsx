import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CreditDetalle from './credit-detalle';
import CreditDetalleDetail from './credit-detalle-detail';
import CreditDetalleUpdate from './credit-detalle-update';
import CreditDetalleDeleteDialog from './credit-detalle-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreditDetalleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CreditDetalleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CreditDetalleDetail} />
      <ErrorBoundaryRoute path={match.url} component={CreditDetalle} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CreditDetalleDeleteDialog} />
  </>
);

export default Routes;
