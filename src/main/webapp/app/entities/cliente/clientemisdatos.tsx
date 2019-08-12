import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getEntityByEmail } from './cliente.reducer';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { getEntities as getBancos } from 'app/entities/banco/banco.reducer';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { createEntityMisDatos, updateEntityMisDatos, reset } from './cliente.reducer';
import { Button, Row, Col, Label } from 'reactstrap';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { IClienteUpdateProps } from 'app/entities/cliente/cliente-update';
import { getStorage, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClienteUpdateState {
  isNew: boolean;
  departmentId: string;
  bancoId: string;
  isNews: any;
}

export class ClienteMisDatos extends React.Component<IClienteUpdateProps, IClienteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      departmentId: '0',
      bancoId: '0',
      isNew: !this.props.clienteEntity || !this.props.clienteEntity.id
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.reset();
    this.props.getEntityByEmail();
    if (this.props.clienteEntity.id > 0) this.state.isNew = false;
    else {
      this.state.isNew = true;
    }

    this.props.getDepartments();
    this.props.getBancos();
  }

  saveEntity = (event, errors, values) => {
    values.fechaNacimiento = convertDateTimeToServer(values.fechaNacimiento);

    if (errors.length === 0) {
      const { clienteEntity } = this.props;
      const entity = {
        ...clienteEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntityMisDatos(entity);
      } else {
        this.props.updateEntityMisDatos(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/clientemisdatosmensajes');
  };
  render() {
    const { clienteEntity, departments, bancos, loading, updating } = this.props;
    const { isNew } = this.state;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.cliente.home.createOrEditLabel" className="title">
              <Translate contentKey="sicoApp.cliente.home.actualizarmisdatos">Actualizar mis Datos</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clienteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cliente-id" type="text" className="bg" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="firstNameLabel" for="firstName" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.firstName">First Name</Translate>
                    </Label>
                  </div>
                  <AvField
                    id="cliente-firstName"
                    type="text"
                    name="firstName"
                    className="bg"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="lastNameLabel" for="lastName" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.lastName">Last Name</Translate>
                    </Label>
                  </div>
                  <AvField
                    id="cliente-lastName"
                    type="text"
                    name="lastName"
                    className="bg"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="mailLabel" for="mail" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.mail">Mail</Translate>
                    </Label>
                  </div>
                  <AvField id="cliente-mail" className="bg" required type="text" name="mail" />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="dniLabel" for="dni" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.dni">Dni</Translate>
                    </Label>
                  </div>
                  <AvField
                    id="cliente-dni"
                    type="text"
                    name="dni"
                    className="bg"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="fechaNacimientoLabel" for="fechaNacimiento" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.fechaNacimiento">Fecha Nacimiento</Translate>
                    </Label>
                  </div>
                  <AvInput
                    id="cliente-fechaNacimiento"
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    className="bg"
                    placeholder={'DD-MM-YYYY'}
                    value={convertDateTimeFromServer(this.props.clienteEntity.fechaNacimiento)}
                  />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="direccionLabel" for="direccion" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.direccion">Direccion</Translate>
                    </Label>
                  </div>
                  <AvField id="cliente-direccion" className="bg" type="text" name="direccion" />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="numeroLabel" for="numero" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.numero">Numero</Translate>
                    </Label>
                  </div>
                  <AvField id="cliente-numero" type="string" className="bg" name="numero" />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label for="department.id" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.department">Department</Translate>
                    </Label>
                  </div>
                  <AvInput id="cliente-department" type="select" className="bg" name="department.id">
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.departmentName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="telefonoLabel" for="telefono" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.telefono">Telefono</Translate>
                    </Label>
                  </div>
                  <AvField id="cliente-telefono" className="bg" type="text" name="telefono" />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="sexoLabel" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.sexo">Sexo</Translate>
                    </Label>
                  </div>
                  <AvInput id="cliente-sexo" type="select" className="bg" name="sexo" value={clienteEntity.sexo}>
                    <option value="MASCULINO">
                      <Translate contentKey="sicoApp.SEXO.MASCULINO" />
                    </option>
                    <option value="FEMENINO">
                      <Translate contentKey="sicoApp.SEXO.FEMENINO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="salaryLabel" for="nroCbu" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.nroCbu">Nro CBU</Translate>
                    </Label>
                  </div>
                  <AvField id="cliente-nroCbu" type="string" className="bg" name="nroCbu" />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label id="salaryLabel" for="numeroCuenta" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.numeroCuenta">Numero Cuenta</Translate>
                    </Label>
                  </div>
                  <AvField id="cliente-numeroCuenta" type="string" className="bg" name="numeroCuenta" />
                </AvGroup>
                <AvGroup>
                  <div className="divsubtitulos">
                    <Label for="banco.id" className="subtitulos">
                      <Translate contentKey="sicoApp.cliente.banco">Banco</Translate>
                    </Label>
                  </div>
                  <AvInput id="cliente-banco" type="select" className="bg" name="banco.id">
                    <option value="" key="0" />
                    {bancos
                      ? bancos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.bancoName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/cliente" replace color="info">
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
  departments: storeState.department.entities,
  bancos: storeState.banco.entities,
  clienteEntity: storeState.cliente.entity,
  loading: storeState.cliente.loading,
  updating: storeState.cliente.updating,
  updateSuccess: storeState.cliente.updateSuccess
});

const mapDispatchToProps = {
  getEntityByEmail,
  getDepartments,
  getBancos,
  createEntityMisDatos,
  updateEntityMisDatos,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteMisDatos);
