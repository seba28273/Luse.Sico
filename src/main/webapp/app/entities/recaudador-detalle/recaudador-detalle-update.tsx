import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecaudador } from 'app/shared/model/recaudador.model';
import { getEntities as getRecaudadors } from 'app/entities/recaudador/recaudador.reducer';
import { getEntity, updateEntity, createEntity, reset } from './recaudador-detalle.reducer';
import { IRecaudadorDetalle } from 'app/shared/model/recaudador-detalle.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecaudadorDetalleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRecaudadorDetalleUpdateState {
  isNew: boolean;
  recaudadorId: string;
}

export class RecaudadorDetalleUpdate extends React.Component<IRecaudadorDetalleUpdateProps, IRecaudadorDetalleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      recaudadorId: '0',
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

    this.props.getRecaudadors();
  }

  saveEntity = (event, errors, values) => {
    values.fechaEjecucion = convertDateTimeToServer(values.fechaEjecucion);
    values.fechaProgramada = convertDateTimeToServer(values.fechaProgramada);

    if (errors.length === 0) {
      const { recaudadorDetalleEntity } = this.props;
      const entity = {
        ...recaudadorDetalleEntity,
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
    this.props.history.push('/entity/recaudador-detalle');
  };

  render() {
    const { recaudadorDetalleEntity, recaudadors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.recaudadorDetalle.home.createOrEditLabel">
              <Translate contentKey="sicoApp.recaudadorDetalle.home.createOrEditLabel">Create or edit a RecaudadorDetalle</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : recaudadorDetalleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="recaudador-detalle-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ejecutadaLabel" for="ejecutada">
                    <Translate contentKey="sicoApp.recaudadorDetalle.ejecutada">Ejecutada</Translate>
                  </Label>
                  <AvField id="recaudador-detalle-ejecutada" type="string" className="form-control" name="ejecutada" />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaEjecucionLabel" for="fechaEjecucion">
                    <Translate contentKey="sicoApp.recaudadorDetalle.fechaEjecucion">Fecha Ejecucion</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-detalle-fechaEjecucion"
                    type="datetime-local"
                    className="form-control"
                    name="fechaEjecucion"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.recaudadorDetalleEntity.fechaEjecucion)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaProgramadaLabel" for="fechaProgramada">
                    <Translate contentKey="sicoApp.recaudadorDetalle.fechaProgramada">Fecha Programada</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-detalle-fechaProgramada"
                    type="datetime-local"
                    className="form-control"
                    name="fechaProgramada"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.recaudadorDetalleEntity.fechaProgramada)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nroCuotaLabel" for="nroCuota">
                    <Translate contentKey="sicoApp.recaudadorDetalle.nroCuota">Nro Cuota</Translate>
                  </Label>
                  <AvField id="recaudador-detalle-nroCuota" type="string" className="form-control" name="nroCuota" />
                </AvGroup>
                <AvGroup>
                  <Label id="observacionesLabel" for="observaciones">
                    <Translate contentKey="sicoApp.recaudadorDetalle.observaciones">Observaciones</Translate>
                  </Label>
                  <AvField id="recaudador-detalle-observaciones" type="text" name="observaciones" />
                </AvGroup>
                <AvGroup>
                  <Label id="reintentosLabel" for="reintentos">
                    <Translate contentKey="sicoApp.recaudadorDetalle.reintentos">Reintentos</Translate>
                  </Label>
                  <AvField id="recaudador-detalle-reintentos" type="string" className="form-control" name="reintentos" />
                </AvGroup>
                <AvGroup>
                  <Label for="recaudador.id">
                    <Translate contentKey="sicoApp.recaudadorDetalle.recaudador">Recaudador</Translate>
                  </Label>
                  <AvInput id="recaudador-detalle-recaudador" type="select" className="form-control" name="recaudador.id">
                    <option value="" key="0" />
                    {recaudadors
                      ? recaudadors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/recaudador-detalle" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
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
  recaudadors: storeState.recaudador.entities,
  recaudadorDetalleEntity: storeState.recaudadorDetalle.entity,
  loading: storeState.recaudadorDetalle.loading,
  updating: storeState.recaudadorDetalle.updating,
  updateSuccess: storeState.recaudadorDetalle.updateSuccess
});

const mapDispatchToProps = {
  getRecaudadors,
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
)(RecaudadorDetalleUpdate);
