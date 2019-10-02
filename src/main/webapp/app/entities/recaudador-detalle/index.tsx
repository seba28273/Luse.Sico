import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecaudadorDetalle from './recaudador-detalle';
import RecaudadorDetalleDetail from './recaudador-detalle-detail';
import RecaudadorDetalleUpdate from './recaudador-detalle-update';
import RecaudadorDetalleDeleteDialog from './recaudador-detalle-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecaudadorDetalleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecaudadorDetalleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecaudadorDetalleDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecaudadorDetalle} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RecaudadorDetalleDeleteDialog} />
  </>
);

export default Routes;
