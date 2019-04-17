import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './credit-detalle.reducer';
import { ICreditDetalle } from 'app/shared/model/credit-detalle.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICreditDetalleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CreditDetalleDetail extends React.Component<ICreditDetalleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { creditDetalleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="sicoApp.creditDetalle.detail.title">CreditDetalle</Translate> [<b>{creditDetalleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nroCuota">
                <Translate contentKey="sicoApp.creditDetalle.nroCuota">Nro Cuota</Translate>
              </span>
            </dt>
            <dd>{creditDetalleEntity.nroCuota}</dd>
            <dt>
              <span id="fechaProgramada">
                <Translate contentKey="sicoApp.creditDetalle.fechaProgramada">Fecha Programada</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={creditDetalleEntity.fechaProgramada} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaEjecucion">
                <Translate contentKey="sicoApp.creditDetalle.fechaEjecucion">Fecha Ejecucion</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={creditDetalleEntity.fechaEjecucion} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="reintentos">
                <Translate contentKey="sicoApp.creditDetalle.reintentos">Reintentos</Translate>
              </span>
            </dt>
            <dd>{creditDetalleEntity.reintentos}</dd>
            <dt>
              <span id="ejecutada">
                <Translate contentKey="sicoApp.creditDetalle.ejecutada">Ejecutada</Translate>
              </span>
            </dt>
            <dd>{creditDetalleEntity.ejecutada ? 'true' : 'false'}</dd>
            <dt>
              <span id="observaciones">
                <Translate contentKey="sicoApp.creditDetalle.observaciones">Observaciones</Translate>
              </span>
            </dt>
            <dd>{creditDetalleEntity.observaciones}</dd>
            <dt>
              <span id="cantidadRenegociado">
                <Translate contentKey="sicoApp.creditDetalle.cantidadRenegociado">Cantidad Renegociado</Translate>
              </span>
            </dt>
            <dd>{creditDetalleEntity.cantidadRenegociado}</dd>
            <dt>
              <Translate contentKey="sicoApp.creditDetalle.credit">Credit</Translate>
            </dt>
            <dd>{creditDetalleEntity.credit ? creditDetalleEntity.credit.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/credit-detalle" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/credit-detalle/${creditDetalleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ creditDetalle }: IRootState) => ({
  creditDetalleEntity: creditDetalle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditDetalleDetail);
