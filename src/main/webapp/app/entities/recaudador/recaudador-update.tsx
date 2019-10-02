import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './recaudador.reducer';
import { IRecaudador } from 'app/shared/model/recaudador.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecaudadorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRecaudadorUpdateState {
  isNew: boolean;
}

export class RecaudadorUpdate extends React.Component<IRecaudadorUpdateProps, IRecaudadorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.fechaCreacion = convertDateTimeToServer(values.fechaCreacion);
    values.fechaInicio = convertDateTimeToServer(values.fechaInicio);
    values.fechaVencimiento = convertDateTimeToServer(values.fechaVencimiento);

    if (errors.length === 0) {
      const { recaudadorEntity } = this.props;
      const entity = {
        ...recaudadorEntity,
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
    this.props.history.push('/entity/recaudador');
  };

  render() {
    const { recaudadorEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.recaudador.home.createOrEditLabel">
              <Translate contentKey="sicoApp.recaudador.home.createOrEditLabel">Create or edit a Recaudador</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : recaudadorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="recaudador-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="activoLabel" check>
                    <AvInput id="recaudador-activo" type="checkbox" className="form-control" name="activo" />
                    <Translate contentKey="sicoApp.recaudador.activo">Activo</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cantCuotasLabel" for="cantCuotas">
                    <Translate contentKey="sicoApp.recaudador.cantCuotas">Cant Cuotas</Translate>
                  </Label>
                  <AvField id="recaudador-cantCuotas" type="string" className="form-control" name="cantCuotas" />
                </AvGroup>
                <AvGroup>
                  <Label id="cantidadRenegociadoLabel" for="cantidadRenegociado">
                    <Translate contentKey="sicoApp.recaudador.cantidadRenegociado">Cantidad Renegociado</Translate>
                  </Label>
                  <AvField id="recaudador-cantidadRenegociado" type="string" className="form-control" name="cantidadRenegociado" />
                </AvGroup>
                <AvGroup>
                  <Label id="capitalPrestamoLabel" for="capitalPrestamo">
                    <Translate contentKey="sicoApp.recaudador.capitalPrestamo">Capital Prestamo</Translate>
                  </Label>
                  <AvField id="recaudador-capitalPrestamo" type="string" className="form-control" name="capitalPrestamo" />
                </AvGroup>
                <AvGroup>
                  <Label id="cuotaCobradaLabel" for="cuotaCobrada">
                    <Translate contentKey="sicoApp.recaudador.cuotaCobrada">Cuota Cobrada</Translate>
                  </Label>
                  <AvField id="recaudador-cuotaCobrada" type="string" className="form-control" name="cuotaCobrada" />
                </AvGroup>
                <AvGroup>
                  <Label id="cuotaPuraLabel" for="cuotaPura">
                    <Translate contentKey="sicoApp.recaudador.cuotaPura">Cuota Pura</Translate>
                  </Label>
                  <AvField id="recaudador-cuotaPura" type="string" className="form-control" name="cuotaPura" />
                </AvGroup>
                <AvGroup>
                  <Label id="cuotaRecuperoCapitalLabel" for="cuotaRecuperoCapital">
                    <Translate contentKey="sicoApp.recaudador.cuotaRecuperoCapital">Cuota Recupero Capital</Translate>
                  </Label>
                  <AvField id="recaudador-cuotaRecuperoCapital" type="string" className="form-control" name="cuotaRecuperoCapital" />
                </AvGroup>
                <AvGroup>
                  <Label id="diaHoraEjecucionLabel" for="diaHoraEjecucion">
                    <Translate contentKey="sicoApp.recaudador.diaHoraEjecucion">Dia Hora Ejecucion</Translate>
                  </Label>
                  <AvField id="recaudador-diaHoraEjecucion" type="string" className="form-control" name="diaHoraEjecucion" />
                </AvGroup>
                <AvGroup>
                  <Label id="esPersonalLabel" check>
                    <AvInput id="recaudador-esPersonal" type="checkbox" className="form-control" name="esPersonal" />
                    <Translate contentKey="sicoApp.recaudador.esPersonal">Es Personal</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="excluirFindeSemanasLabel" check>
                    <AvInput id="recaudador-excluirFindeSemanas" type="checkbox" className="form-control" name="excluirFindeSemanas" />
                    <Translate contentKey="sicoApp.recaudador.excluirFindeSemanas">Excluir Finde Semanas</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="fechaCreacionLabel" for="fechaCreacion">
                    <Translate contentKey="sicoApp.recaudador.fechaCreacion">Fecha Creacion</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-fechaCreacion"
                    type="datetime-local"
                    className="form-control"
                    name="fechaCreacion"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.recaudadorEntity.fechaCreacion)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaInicioLabel" for="fechaInicio">
                    <Translate contentKey="sicoApp.recaudador.fechaInicio">Fecha Inicio</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-fechaInicio"
                    type="datetime-local"
                    className="form-control"
                    name="fechaInicio"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.recaudadorEntity.fechaInicio)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaVencimientoLabel" for="fechaVencimiento">
                    <Translate contentKey="sicoApp.recaudador.fechaVencimiento">Fecha Vencimiento</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-fechaVencimiento"
                    type="datetime-local"
                    className="form-control"
                    name="fechaVencimiento"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.recaudadorEntity.fechaVencimiento)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="incobrableLabel" check>
                    <AvInput id="recaudador-incobrable" type="checkbox" className="form-control" name="incobrable" />
                    <Translate contentKey="sicoApp.recaudador.incobrable">Incobrable</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="interesesCuotaLabel" for="interesesCuota">
                    <Translate contentKey="sicoApp.recaudador.interesesCuota">Intereses Cuota</Translate>
                  </Label>
                  <AvField id="recaudador-interesesCuota" type="string" className="form-control" name="interesesCuota" />
                </AvGroup>
                <AvGroup>
                  <Label id="interesesPrestamosLabel" for="interesesPrestamos">
                    <Translate contentKey="sicoApp.recaudador.interesesPrestamos">Intereses Prestamos</Translate>
                  </Label>
                  <AvField id="recaudador-interesesPrestamos" type="string" className="form-control" name="interesesPrestamos" />
                </AvGroup>
                <AvGroup>
                  <Label id="montoLabel" for="monto">
                    <Translate contentKey="sicoApp.recaudador.monto">Monto</Translate>
                  </Label>
                  <AvField id="recaudador-monto" type="string" className="form-control" name="monto" />
                </AvGroup>
                <AvGroup>
                  <Label id="observacionesLabel" for="observaciones">
                    <Translate contentKey="sicoApp.recaudador.observaciones">Observaciones</Translate>
                  </Label>
                  <AvField id="recaudador-observaciones" type="text" name="observaciones" />
                </AvGroup>
                <AvGroup>
                  <Label id="pagoManualLabel" for="pagoManual">
                    <Translate contentKey="sicoApp.recaudador.pagoManual">Pago Manual</Translate>
                  </Label>
                  <AvField id="recaudador-pagoManual" type="string" className="form-control" name="pagoManual" />
                </AvGroup>
                <AvGroup>
                  <Label id="periodicidadLabel">
                    <Translate contentKey="sicoApp.recaudador.periodicidad">Periodicidad</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-periodicidad"
                    type="select"
                    className="form-control"
                    name="periodicidad"
                    value={(!isNew && recaudadorEntity.periodicidad) || 'DIARIO'}
                  >
                    <option value="DIARIO">
                      <Translate contentKey="sicoApp.Periodicidad.DIARIO" />
                    </option>
                    <option value="SEMANAL">
                      <Translate contentKey="sicoApp.Periodicidad.SEMANAL" />
                    </option>
                    <option value="MENSUAL">
                      <Translate contentKey="sicoApp.Periodicidad.MENSUAL" />
                    </option>
                    <option value="BIMENSUAL">
                      <Translate contentKey="sicoApp.Periodicidad.BIMENSUAL" />
                    </option>
                    <option value="SEMESTRAL">
                      <Translate contentKey="sicoApp.Periodicidad.SEMESTRAL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="porcParticipacionLabel" for="porcParticipacion">
                    <Translate contentKey="sicoApp.recaudador.porcParticipacion">Porc Participacion</Translate>
                  </Label>
                  <AvField id="recaudador-porcParticipacion" type="string" className="form-control" name="porcParticipacion" />
                </AvGroup>
                <AvGroup>
                  <Label id="tipoCobroLabel">
                    <Translate contentKey="sicoApp.recaudador.tipoCobro">Tipo Cobro</Translate>
                  </Label>
                  <AvInput
                    id="recaudador-tipoCobro"
                    type="select"
                    className="form-control"
                    name="tipoCobro"
                    value={(!isNew && recaudadorEntity.tipoCobro) || 'PRESTAMO'}
                  >
                    <option value="PRESTAMO">
                      <Translate contentKey="sicoApp.TipoCobro.PRESTAMO" />
                    </option>
                    <option value="INSUMOINFORMATICO">
                      <Translate contentKey="sicoApp.TipoCobro.INSUMOINFORMATICO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="idClienteLabel" for="idCliente">
                    <Translate contentKey="sicoApp.recaudador.idCliente">Id Cliente</Translate>
                  </Label>
                  <AvField id="recaudador-idCliente" type="string" className="form-control" name="idCliente" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/recaudador" replace color="info">
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
  recaudadorEntity: storeState.recaudador.entity,
  loading: storeState.recaudador.loading,
  updating: storeState.recaudador.updating,
  updateSuccess: storeState.recaudador.updateSuccess
});

const mapDispatchToProps = {
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
)(RecaudadorUpdate);
