import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Transferencia from './transferencia';
import TransferenciaDetail from './transferencia-detail';


const Routes = ({ match }) => (
  <>
    <Switch>
     
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransferenciaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Transferencia} />
    </Switch>

  </>
);

export default Routes;
