import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recaudador.reducer';
import { IRecaudador } from 'app/shared/model/recaudador.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecaudadorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RecaudadorDetail extends React.Component<IRecaudadorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { recaudadorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="sicoApp.recaudador.detail.title">Recaudador</Translate> [<b>{recaudadorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="activo">
                <Translate contentKey="sicoApp.recaudador.activo">Activo</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.activo ? 'true' : 'false'}</dd>
            <dt>
              <span id="cantCuotas">
                <Translate contentKey="sicoApp.recaudador.cantCuotas">Cant Cuotas</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.cantCuotas}</dd>
            <dt>
              <span id="cantidadRenegociado">
                <Translate contentKey="sicoApp.recaudador.cantidadRenegociado">Cantidad Renegociado</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.cantidadRenegociado}</dd>
            <dt>
              <span id="capitalPrestamo">
                <Translate contentKey="sicoApp.recaudador.capitalPrestamo">Capital Prestamo</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.capitalPrestamo}</dd>
            <dt>
              <span id="cuotaCobrada">
                <Translate contentKey="sicoApp.recaudador.cuotaCobrada">Cuota Cobrada</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.cuotaCobrada}</dd>
            <dt>
              <span id="cuotaPura">
                <Translate contentKey="sicoApp.recaudador.cuotaPura">Cuota Pura</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.cuotaPura}</dd>
            <dt>
              <span id="cuotaRecuperoCapital">
                <Translate contentKey="sicoApp.recaudador.cuotaRecuperoCapital">Cuota Recupero Capital</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.cuotaRecuperoCapital}</dd>
            <dt>
              <span id="diaHoraEjecucion">
                <Translate contentKey="sicoApp.recaudador.diaHoraEjecucion">Dia Hora Ejecucion</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.diaHoraEjecucion}</dd>
            <dt>
              <span id="esPersonal">
                <Translate contentKey="sicoApp.recaudador.esPersonal">Es Personal</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.esPersonal ? 'true' : 'false'}</dd>
            <dt>
              <span id="excluirFindeSemanas">
                <Translate contentKey="sicoApp.recaudador.excluirFindeSemanas">Excluir Finde Semanas</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.excluirFindeSemanas ? 'true' : 'false'}</dd>
            <dt>
              <span id="fechaCreacion">
                <Translate contentKey="sicoApp.recaudador.fechaCreacion">Fecha Creacion</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recaudadorEntity.fechaCreacion} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaInicio">
                <Translate contentKey="sicoApp.recaudador.fechaInicio">Fecha Inicio</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recaudadorEntity.fechaInicio} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaVencimiento">
                <Translate contentKey="sicoApp.recaudador.fechaVencimiento">Fecha Vencimiento</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recaudadorEntity.fechaVencimiento} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="incobrable">
                <Translate contentKey="sicoApp.recaudador.incobrable">Incobrable</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.incobrable ? 'true' : 'false'}</dd>
            <dt>
              <span id="interesesCuota">
                <Translate contentKey="sicoApp.recaudador.interesesCuota">Intereses Cuota</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.interesesCuota}</dd>
            <dt>
              <span id="interesesPrestamos">
                <Translate contentKey="sicoApp.recaudador.interesesPrestamos">Intereses Prestamos</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.interesesPrestamos}</dd>
            <dt>
              <span id="monto">
                <Translate contentKey="sicoApp.recaudador.monto">Monto</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.monto}</dd>
            <dt>
              <span id="observaciones">
                <Translate contentKey="sicoApp.recaudador.observaciones">Observaciones</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.observaciones}</dd>
            <dt>
              <span id="pagoManual">
                <Translate contentKey="sicoApp.recaudador.pagoManual">Pago Manual</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.pagoManual}</dd>
            <dt>
              <span id="periodicidad">
                <Translate contentKey="sicoApp.recaudador.periodicidad">Periodicidad</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.periodicidad}</dd>
            <dt>
              <span id="porcParticipacion">
                <Translate contentKey="sicoApp.recaudador.porcParticipacion">Porc Participacion</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.porcParticipacion}</dd>
            <dt>
              <span id="tipoCobro">
                <Translate contentKey="sicoApp.recaudador.tipoCobro">Tipo Cobro</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.tipoCobro}</dd>
            <dt>
              <span id="idCliente">
                <Translate contentKey="sicoApp.recaudador.idCliente">Id Cliente</Translate>
              </span>
            </dt>
            <dd>{recaudadorEntity.idCliente}</dd>
          </dl>
          <Button tag={Link} to="/entity/recaudador" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/recaudador/${recaudadorEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ recaudador }: IRootState) => ({
  recaudadorEntity: recaudador.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecaudadorDetail);
