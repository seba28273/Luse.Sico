import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Region from './region';
import Country from './country';
import Location from './location';
import Department from './department';
import Banco from './banco';
import CreditDetalle from './credit-detalle';
import Credit from './credit';
import Cliente from './cliente';
import ClienteMisDatos from './cliente/clientemisdatos';
import ClienteMisDatosAviso from './cliente/clientemisdatosmensajes';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
import Recaudador from './recaudador';
import RecaudadorDetalle from './recaudador-detalle';
import Token from './token';
import Transferencia from './transferencia';
import CuotasVencidas from './cuotasvencidas';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      {/*<ErrorBoundaryRoute path={`${match.url}/region`} component={Region} />*/}
      {/*<ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />*/}
      {/*      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />*/}
      <ErrorBoundaryRoute path={`${match.url}/department`} component={Department} />
      {/* <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
        {/*  <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/job`} component={Job} />
      <ErrorBoundaryRoute path={`${match.url}/job-history`} component={JobHistory} />*/}
      <ErrorBoundaryRoute path={`${match.url}/banco`} component={Banco} />
      <ErrorBoundaryRoute path={`${match.url}/credit`} component={Credit} />
      <ErrorBoundaryRoute path={`${match.url}/clientemisdatos`} component={ClienteMisDatos} />
      <ErrorBoundaryRoute path={`${match.url}/clientemisdatosmensajes`} component={ClienteMisDatosAviso} />
      {/*<ErrorBoundaryRoute path={`${match.url}/cliente`} component={Cliente} />*/}
      <PrivateRoute path={`${match.url}/cliente`} component={Cliente} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute path={`${match.url}/recaudador`} component={Recaudador} />
      <ErrorBoundaryRoute path={`${match.url}/recaudador-detalle`} component={RecaudadorDetalle} />
        <ErrorBoundaryRoute path={`${match.url}/token`} component={Token} />
        <ErrorBoundaryRoute path={`${match.url}/transferencia`} component={Transferencia} />
        <ErrorBoundaryRoute path={`${match.url}/cuotasvencidas`} component={CuotasVencidas} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
