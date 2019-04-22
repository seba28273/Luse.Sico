import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './credit.reducer';
import { ICredit } from 'app/shared/model/credit.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICreditUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICreditUpdateState {
  isNew: boolean;
}

export class CreditUpdate extends React.Component<ICreditUpdateProps, ICreditUpdateState> {
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
      const { creditEntity } = this.props;
      const entity = {
        ...creditEntity,
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
    this.props.history.push('/entity/credit');
  };

  render() {
    const { creditEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.credit.home.createOrEditLabel">
              <Translate contentKey="sicoApp.credit.home.createOrEditLabel">Create or edit a Credit</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : creditEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="credit-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                {/*<AvGroup>
                  <Label id="periodicidadLabel">
                    <Translate contentKey="sicoApp.credit.periodicidad">Periodicidad</Translate>
                  </Label>
                  <AvInput
                    id="credit-periodicidad"
                    type="select"
                    className="form-control"
                    name="periodicidad"
                    value={(!isNew && creditEntity.periodicidad) || 'DIARIO'}
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
                  <Label id="diaHoraEjecucionLabel" for="diaHoraEjecucion">
                    <Translate contentKey="sicoApp.credit.diaHoraEjecucion">Dia Hora Ejecucion</Translate>
                  </Label>
                  <AvField id="credit-diaHoraEjecucion" type="string" className="form-control" name="diaHoraEjecucion" />
                </AvGroup>
                <AvGroup>
                  <Label id="tipoCobroLabel">
                    <Translate contentKey="sicoApp.credit.tipoCobro">Tipo Cobro</Translate>
                  </Label>
                  <AvInput
                    id="credit-tipoCobro"
                    type="select"
                    className="form-control"
                    name="tipoCobro"
                    value={(!isNew && creditEntity.tipoCobro) || 'PRESTAMO'}
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
                  <Label id="montoLabel" for="monto">
                    <Translate contentKey="sicoApp.credit.monto">Monto</Translate>
                  </Label>
                  <AvField id="credit-monto" type="string" className="form-control" name="monto" />
                </AvGroup>
                <AvGroup>
                  <Label id="observacionesLabel" for="observaciones">
                    <Translate contentKey="sicoApp.credit.observaciones">Observaciones</Translate>
                  </Label>
                  <AvField id="credit-observaciones" type="text" name="observaciones" />
                </AvGroup>
                <AvGroup>
                  <Label id="activoLabel" check>
                    <AvInput id="credit-activo" type="checkbox" className="form-control" name="activo" />
                    <Translate contentKey="sicoApp.credit.activo">Activo</Translate>
                  </Label>
                </AvGroup>*/}
                <AvGroup>
                  <Label id="capitalPrestamoLabel" for="capitalPrestamo">
                    <Translate contentKey="sicoApp.credit.capitalPrestamo">Capital Prestamo</Translate>
                  </Label>
                  <AvField id="credit-capitalPrestamo" type="string" className="form-control" name="capitalPrestamo" />
                </AvGroup>
                <AvGroup>
                  <Label id="cantCuotasLabel" for="cantCuotas">
                    <Translate contentKey="sicoApp.credit.cantCuotas">Cant Cuotas</Translate>
                  </Label>
                  <AvField id="credit-cantCuotas" type="string" className="form-control" name="cantCuotas" />
                </AvGroup>
                {/*<AvGroup>
                  <Label id="cuotaCobradaLabel" for="cuotaCobrada">
                    <Translate contentKey="sicoApp.credit.cuotaCobrada">Cuota Cobrada</Translate>
                  </Label>
                  <AvField id="credit-cuotaCobrada" type="string" className="form-control" name="cuotaCobrada" />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaCreacionLabel" for="fechaCreacion">
                    <Translate contentKey="sicoApp.credit.fechaCreacion">Fecha Creacion</Translate>
                  </Label>
                  <AvInput
                    id="credit-fechaCreacion"
                    type="datetime-local"
                    className="form-control"
                    name="fechaCreacion"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.creditEntity.fechaCreacion)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaInicioLabel" for="fechaInicio">
                    <Translate contentKey="sicoApp.credit.fechaInicio">Fecha Inicio</Translate>
                  </Label>
                  <AvInput
                    id="credit-fechaInicio"
                    type="datetime-local"
                    className="form-control"
                    name="fechaInicio"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.creditEntity.fechaInicio)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaVencimientoLabel" for="fechaVencimiento">
                    <Translate contentKey="sicoApp.credit.fechaVencimiento">Fecha Vencimiento</Translate>
                  </Label>
                  <AvInput
                    id="credit-fechaVencimiento"
                    type="datetime-local"
                    className="form-control"
                    name="fechaVencimiento"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.creditEntity.fechaVencimiento)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="excluirFindeSemanasLabel" check>
                    <AvInput id="credit-excluirFindeSemanas" type="checkbox" className="form-control" name="excluirFindeSemanas" />
                    <Translate contentKey="sicoApp.credit.excluirFindeSemanas">Excluir Finde Semanas</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="porcParticipacionLabel" for="porcParticipacion">
                    <Translate contentKey="sicoApp.credit.porcParticipacion">Porc Participacion</Translate>
                  </Label>
                  <AvField id="credit-porcParticipacion" type="string" className="form-control" name="porcParticipacion" />
                </AvGroup>*/}
                {/*<AvGroup>
                  <Label id="interesesPrestamosLabel" for="interesesPrestamos">
                    <Translate contentKey="sicoApp.credit.interesesPrestamos">Intereses Prestamos</Translate>
                  </Label>
                  <AvField id="credit-interesesPrestamos" type="string" className="form-control" name="interesesPrestamos" />
                </AvGroup>
                <AvGroup>
                  <Label id="cuotaPuraLabel" for="cuotaPura">
                    <Translate contentKey="sicoApp.credit.cuotaPura">Cuota Pura</Translate>
                  </Label>
                  <AvField id="credit-cuotaPura" type="string" className="form-control" name="cuotaPura" />
                </AvGroup>
                <AvGroup>
                  <Label id="interesesCuotaLabel" for="interesesCuota">
                    <Translate contentKey="sicoApp.credit.interesesCuota">Intereses Cuota</Translate>
                  </Label>
                  <AvField id="credit-interesesCuota" type="string" className="form-control" name="interesesCuota" />
                </AvGroup>
                <AvGroup>
                  <Label id="cuotaRecuperoCapitalLabel" for="cuotaRecuperoCapital">
                    <Translate contentKey="sicoApp.credit.cuotaRecuperoCapital">Cuota Recupero Capital</Translate>
                  </Label>
                  <AvField id="credit-cuotaRecuperoCapital" type="string" className="form-control" name="cuotaRecuperoCapital" />
                </AvGroup>
                <AvGroup>
                  <Label id="cantidadRenegociadoLabel" for="cantidadRenegociado">
                    <Translate contentKey="sicoApp.credit.cantidadRenegociado">Cantidad Renegociado</Translate>
                  </Label>
                  <AvField id="credit-cantidadRenegociado" type="string" className="form-control" name="cantidadRenegociado" />
                </AvGroup>
                <AvGroup>
                  <Label id="incobrableLabel" check>
                    <AvInput id="credit-incobrable" type="checkbox" className="form-control" name="incobrable" />
                    <Translate contentKey="sicoApp.credit.incobrable">Incobrable</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="pagoManualLabel" check>
                    <AvInput id="credit-pagoManual" type="checkbox" className="form-control" name="pagoManual" />
                    <Translate contentKey="sicoApp.credit.pagoManual">Pago Manual</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="esPersonalLabel" check>
                    <AvInput id="credit-esPersonal" type="checkbox" className="form-control" name="esPersonal" />
                    <Translate contentKey="sicoApp.credit.esPersonal">Es Personal</Translate>
                  </Label>
                </AvGroup>*/}
                <Button tag={Link} id="cancel-save" to="/entity/credit" replace color="info">
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
  creditEntity: storeState.credit.entity,
  loading: storeState.credit.loading,
  updating: storeState.credit.updating,
  updateSuccess: storeState.credit.updateSuccess
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
)(CreditUpdate);
