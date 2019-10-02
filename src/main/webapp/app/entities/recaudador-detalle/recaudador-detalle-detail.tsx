import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recaudador-detalle.reducer';
import { IRecaudadorDetalle } from 'app/shared/model/recaudador-detalle.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecaudadorDetalleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RecaudadorDetalleDetail extends React.Component<IRecaudadorDetalleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { recaudadorDetalleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="sicoApp.recaudadorDetalle.detail.title">RecaudadorDetalle</Translate> [<b>
              {recaudadorDetalleEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ejecutada">
                <Translate contentKey="sicoApp.recaudadorDetalle.ejecutada">Ejecutada</Translate>
              </span>
            </dt>
            <dd>{recaudadorDetalleEntity.ejecutada}</dd>
            <dt>
              <span id="fechaEjecucion">
                <Translate contentKey="sicoApp.recaudadorDetalle.fechaEjecucion">Fecha Ejecucion</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recaudadorDetalleEntity.fechaEjecucion} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaProgramada">
                <Translate contentKey="sicoApp.recaudadorDetalle.fechaProgramada">Fecha Programada</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recaudadorDetalleEntity.fechaProgramada} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="nroCuota">
                <Translate contentKey="sicoApp.recaudadorDetalle.nroCuota">Nro Cuota</Translate>
              </span>
            </dt>
            <dd>{recaudadorDetalleEntity.nroCuota}</dd>
            <dt>
              <span id="observaciones">
                <Translate contentKey="sicoApp.recaudadorDetalle.observaciones">Observaciones</Translate>
              </span>
            </dt>
            <dd>{recaudadorDetalleEntity.observaciones}</dd>
            <dt>
              <span id="reintentos">
                <Translate contentKey="sicoApp.recaudadorDetalle.reintentos">Reintentos</Translate>
              </span>
            </dt>
            <dd>{recaudadorDetalleEntity.reintentos}</dd>
            <dt>
              <Translate contentKey="sicoApp.recaudadorDetalle.recaudador">Recaudador</Translate>
            </dt>
            <dd>{recaudadorDetalleEntity.recaudador ? recaudadorDetalleEntity.recaudador.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/recaudador-detalle" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/recaudador-detalle/${recaudadorDetalleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ recaudadorDetalle }: IRootState) => ({
  recaudadorDetalleEntity: recaudadorDetalle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecaudadorDetalleDetail);
