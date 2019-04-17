import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './credit.reducer';
import { ICredit } from 'app/shared/model/credit.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICreditDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CreditDetail extends React.Component<ICreditDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { creditEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="sicoApp.credit.detail.title">Credit</Translate> [<b>{creditEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="periodicidad">
                <Translate contentKey="sicoApp.credit.periodicidad">Periodicidad</Translate>
              </span>
            </dt>
            <dd>{creditEntity.periodicidad}</dd>
            <dt>
              <span id="diaHoraEjecucion">
                <Translate contentKey="sicoApp.credit.diaHoraEjecucion">Dia Hora Ejecucion</Translate>
              </span>
            </dt>
            <dd>{creditEntity.diaHoraEjecucion}</dd>
            <dt>
              <span id="tipoCobro">
                <Translate contentKey="sicoApp.credit.tipoCobro">Tipo Cobro</Translate>
              </span>
            </dt>
            <dd>{creditEntity.tipoCobro}</dd>
            <dt>
              <span id="monto">
                <Translate contentKey="sicoApp.credit.monto">Monto</Translate>
              </span>
            </dt>
            <dd>{creditEntity.monto}</dd>
            <dt>
              <span id="observaciones">
                <Translate contentKey="sicoApp.credit.observaciones">Observaciones</Translate>
              </span>
            </dt>
            <dd>{creditEntity.observaciones}</dd>
            <dt>
              <span id="activo">
                <Translate contentKey="sicoApp.credit.activo">Activo</Translate>
              </span>
            </dt>
            <dd>{creditEntity.activo ? 'true' : 'false'}</dd>
            <dt>
              <span id="cantCuotas">
                <Translate contentKey="sicoApp.credit.cantCuotas">Cant Cuotas</Translate>
              </span>
            </dt>
            <dd>{creditEntity.cantCuotas}</dd>
            <dt>
              <span id="cuotaCobrada">
                <Translate contentKey="sicoApp.credit.cuotaCobrada">Cuota Cobrada</Translate>
              </span>
            </dt>
            <dd>{creditEntity.cuotaCobrada}</dd>
            <dt>
              <span id="fechaCreacion">
                <Translate contentKey="sicoApp.credit.fechaCreacion">Fecha Creacion</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={creditEntity.fechaCreacion} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaInicio">
                <Translate contentKey="sicoApp.credit.fechaInicio">Fecha Inicio</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={creditEntity.fechaInicio} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaVencimiento">
                <Translate contentKey="sicoApp.credit.fechaVencimiento">Fecha Vencimiento</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={creditEntity.fechaVencimiento} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="excluirFindeSemanas">
                <Translate contentKey="sicoApp.credit.excluirFindeSemanas">Excluir Finde Semanas</Translate>
              </span>
            </dt>
            <dd>{creditEntity.excluirFindeSemanas ? 'true' : 'false'}</dd>
            <dt>
              <span id="porcParticipacion">
                <Translate contentKey="sicoApp.credit.porcParticipacion">Porc Participacion</Translate>
              </span>
            </dt>
            <dd>{creditEntity.porcParticipacion}</dd>
            <dt>
              <span id="capitalPrestamo">
                <Translate contentKey="sicoApp.credit.capitalPrestamo">Capital Prestamo</Translate>
              </span>
            </dt>
            <dd>{creditEntity.capitalPrestamo}</dd>
            <dt>
              <span id="interesesPrestamos">
                <Translate contentKey="sicoApp.credit.interesesPrestamos">Intereses Prestamos</Translate>
              </span>
            </dt>
            <dd>{creditEntity.interesesPrestamos}</dd>
            <dt>
              <span id="cuotaPura">
                <Translate contentKey="sicoApp.credit.cuotaPura">Cuota Pura</Translate>
              </span>
            </dt>
            <dd>{creditEntity.cuotaPura}</dd>
            <dt>
              <span id="interesesCuota">
                <Translate contentKey="sicoApp.credit.interesesCuota">Intereses Cuota</Translate>
              </span>
            </dt>
            <dd>{creditEntity.interesesCuota}</dd>
            <dt>
              <span id="cuotaRecuperoCapital">
                <Translate contentKey="sicoApp.credit.cuotaRecuperoCapital">Cuota Recupero Capital</Translate>
              </span>
            </dt>
            <dd>{creditEntity.cuotaRecuperoCapital}</dd>
            <dt>
              <span id="cantidadRenegociado">
                <Translate contentKey="sicoApp.credit.cantidadRenegociado">Cantidad Renegociado</Translate>
              </span>
            </dt>
            <dd>{creditEntity.cantidadRenegociado}</dd>
            <dt>
              <span id="incobrable">
                <Translate contentKey="sicoApp.credit.incobrable">Incobrable</Translate>
              </span>
            </dt>
            <dd>{creditEntity.incobrable ? 'true' : 'false'}</dd>
            <dt>
              <span id="pagoManual">
                <Translate contentKey="sicoApp.credit.pagoManual">Pago Manual</Translate>
              </span>
            </dt>
            <dd>{creditEntity.pagoManual ? 'true' : 'false'}</dd>
            <dt>
              <span id="esPersonal">
                <Translate contentKey="sicoApp.credit.esPersonal">Es Personal</Translate>
              </span>
            </dt>
            <dd>{creditEntity.esPersonal ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/credit" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/credit/${creditEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ credit }: IRootState) => ({
  creditEntity: credit.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditDetail);
