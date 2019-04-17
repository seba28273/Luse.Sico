import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICredit } from 'app/shared/model/credit.model';
import { getEntities as getCredits } from 'app/entities/credit/credit.reducer';
import { getEntity, updateEntity, createEntity, reset } from './credit-detalle.reducer';
import { ICreditDetalle } from 'app/shared/model/credit-detalle.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICreditDetalleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICreditDetalleUpdateState {
  isNew: boolean;
  creditId: string;
}

export class CreditDetalleUpdate extends React.Component<ICreditDetalleUpdateProps, ICreditDetalleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      creditId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCredits();
  }

  saveEntity = (event, errors, values) => {
    values.fechaProgramada = convertDateTimeToServer(values.fechaProgramada);
    values.fechaEjecucion = convertDateTimeToServer(values.fechaEjecucion);

    if (errors.length === 0) {
      const { creditDetalleEntity } = this.props;
      const entity = {
        ...creditDetalleEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/credit-detalle');
  };

  render() {
    const { creditDetalleEntity, credits, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.creditDetalle.home.createOrEditLabel">
              <Translate contentKey="sicoApp.creditDetalle.home.createOrEditLabel">Create or edit a CreditDetalle</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : creditDetalleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="credit-detalle-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nroCuotaLabel" for="nroCuota">
                    <Translate contentKey="sicoApp.creditDetalle.nroCuota">Nro Cuota</Translate>
                  </Label>
                  <AvField id="credit-detalle-nroCuota" type="string" className="form-control" name="nroCuota" />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaProgramadaLabel" for="fechaProgramada">
                    <Translate contentKey="sicoApp.creditDetalle.fechaProgramada">Fecha Programada</Translate>
                  </Label>
                  <AvInput
                    id="credit-detalle-fechaProgramada"
                    type="datetime-local"
                    className="form-control"
                    name="fechaProgramada"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.creditDetalleEntity.fechaProgramada)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaEjecucionLabel" for="fechaEjecucion">
                    <Translate contentKey="sicoApp.creditDetalle.fechaEjecucion">Fecha Ejecucion</Translate>
                  </Label>
                  <AvInput
                    id="credit-detalle-fechaEjecucion"
                    type="datetime-local"
                    className="form-control"
                    name="fechaEjecucion"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.creditDetalleEntity.fechaEjecucion)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="reintentosLabel" for="reintentos">
                    <Translate contentKey="sicoApp.creditDetalle.reintentos">Reintentos</Translate>
                  </Label>
                  <AvField id="credit-detalle-reintentos" type="string" className="form-control" name="reintentos" />
                </AvGroup>
                <AvGroup>
                  <Label id="ejecutadaLabel" check>
                    <AvInput id="credit-detalle-ejecutada" type="checkbox" className="form-control" name="ejecutada" />
                    <Translate contentKey="sicoApp.creditDetalle.ejecutada">Ejecutada</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="observacionesLabel" for="observaciones">
                    <Translate contentKey="sicoApp.creditDetalle.observaciones">Observaciones</Translate>
                  </Label>
                  <AvField id="credit-detalle-observaciones" type="text" name="observaciones" />
                </AvGroup>
                <AvGroup>
                  <Label id="cantidadRenegociadoLabel" for="cantidadRenegociado">
                    <Translate contentKey="sicoApp.creditDetalle.cantidadRenegociado">Cantidad Renegociado</Translate>
                  </Label>
                  <AvField id="credit-detalle-cantidadRenegociado" type="string" className="form-control" name="cantidadRenegociado" />
                </AvGroup>
                <AvGroup>
                  <Label for="credit.id">
                    <Translate contentKey="sicoApp.creditDetalle.credit">Credit</Translate>
                  </Label>
                  <AvInput id="credit-detalle-credit" type="select" className="form-control" name="credit.id">
                    <option value="" key="0" />
                    {credits
                      ? credits.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/credit-detalle" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  credits: storeState.credit.entities,
  creditDetalleEntity: storeState.creditDetalle.entity,
  loading: storeState.creditDetalle.loading,
  updating: storeState.creditDetalle.updating,
  updateSuccess: storeState.creditDetalle.updateSuccess
});

const mapDispatchToProps = {
  getCredits,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditDetalleUpdate);
