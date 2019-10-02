import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepartment } from 'app/shared/model/department.model';
import { IBanco } from 'app/shared/model/banco.model';
import { getEntities as getBancos } from 'app/entities/banco/banco.reducer';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset, getEntityByEmail } from 'app/entities/cliente/cliente.reducer';

import { ICliente } from 'app/shared/model/cliente.model';
import { APP_DATE_FORMAT } from 'app/config/constants';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import banco from 'app/entities/banco/banco';
import authentication from 'app/shared/reducers/authentication';

export interface IClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IClienteUpdateState {
  isNew: boolean;
  departmentId: string;
  bancoId: string;
}

export class ClienteUpdate extends React.Component<IClienteUpdateProps, IClienteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      departmentId: '0',
      bancoId: '0',
      isNew: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    this.props.getEntityByEmail('sebastian28273@hotmail.com');
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
      this.props.updateEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/cliente');
  };

  render() {
    const { clienteEntity, departments, bancos, loading, updating } = this.props;
    const { isNew } = this.state;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sicoApp.cliente.home.createOrEditLabel2">
              <Translate contentKey="sicoApp.cliente.home.createOrEditLabel">Create or edit a Cliente</Translate>
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
                    <AvInput id="cliente-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    <Translate contentKey="sicoApp.cliente.firstName">First Name</Translate>
                  </Label>
                  <AvField
                    id="cliente-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="sicoApp.cliente.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    id="cliente-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dniLabel" for="dni">
                    <Translate contentKey="sicoApp.cliente.dni">Dni</Translate>
                  </Label>
                  <AvField
                    id="cliente-dni"
                    type="text"
                    name="dni"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaNacimientoLabel" for="fechaNacimiento">
                    <Translate contentKey="sicoApp.cliente.fechaNacimiento">Fecha Nacimiento</Translate>
                  </Label>
                  <AvInput
                    id="cliente-fechaNacimiento"
                    type="datetime-local"
                    className="form-control"
                    name="fechaNacimiento"
                    placeholder={'YYYY-MM-DD'}
                    value={isNew ? null : convertDateTimeFromServer(APP_DATE_FORMAT)}
                    /*value={isNew ? null : convertDateTimeFromServer(this.props.clienteEntity.fechaNacimiento)}*/
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="direccionLabel" for="direccion">
                    <Translate contentKey="sicoApp.cliente.direccion">Direccion</Translate>
                  </Label>
                  <AvField id="cliente-direccion" type="text" name="direccion" />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroLabel" for="numero">
                    <Translate contentKey="sicoApp.cliente.numero">Numero</Translate>
                  </Label>
                  <AvField id="cliente-numero" type="string" className="form-control" name="numero" />
                </AvGroup>
                <AvGroup>
                  <Label for="department.id">
                    <Translate contentKey="sicoApp.cliente.department">Department</Translate>
                  </Label>
                  <AvInput id="cliente-department" type="select" className="form-control" name="department.id">
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
                  <Label id="telefonoLabel" for="telefono">
                    <Translate contentKey="sicoApp.cliente.telefono">Telefono</Translate>
                  </Label>
                  <AvField id="cliente-telefono" type="text" name="telefono" />
                </AvGroup>
                <AvGroup>
                  <Label id="mailLabel" for="mail">
                    <Translate contentKey="sicoApp.cliente.mail">Mail</Translate>
                  </Label>
                  <AvField id="cliente-mail" type="text" name="mail" />
                </AvGroup>
                <AvGroup>
                  <Label id="sexoLabel">
                    <Translate contentKey="sicoApp.cliente.sexo">Sexo</Translate>
                  </Label>
                  <AvInput
                    id="cliente-sexo"
                    type="select"
                    className="form-control"
                    name="sexo"
                    value={(!isNew && clienteEntity.sexo) || 'MASCULINO'}
                  >
                    <option value="MASCULINO">
                      <Translate contentKey="sicoApp.SEXO.MASCULINO" />
                    </option>
                    <option value="FEMENINO">
                      <Translate contentKey="sicoApp.SEXO.FEMENINO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="nroCbu">
                    <Translate contentKey="sicoApp.cliente.nroCbu">Nro CBU</Translate>
                  </Label>
                  <AvField id="cliente-nroCbu" type="string" className="form-control" name="nroCbu" />
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="salary">
                    <Translate contentKey="sicoApp.cliente.numeroCuenta">Numero Cuenta</Translate>
                  </Label>
                  <AvField id="cliente-numeroCuenta" type="string" className="form-control" name="numeroCuenta" />
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="salary">
                    <Translate contentKey="sicoApp.cliente.salary">Salary</Translate>
                  </Label>
                  <AvField id="cliente-salary" type="string" className="form-control" name="salary" />
                </AvGroup>
                <AvGroup>
                  <Label id="scoringCreditLabel" for="scoringCredit">
                    <Translate contentKey="sicoApp.cliente.scoringCredit">Scoring Credit</Translate>
                  </Label>
                  <AvField id="cliente-scoringCredit" type="string" className="form-control" name="scoringCredit" />
                </AvGroup>
                <AvGroup>
                  <Label for="banco.id">
                    <Translate contentKey="sicoApp.cliente.banco">Banco</Translate>
                  </Label>
                  <AvInput id="cliente-banco" type="select" className="form-control" name="banco.id">
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
  getDepartments,
  getBancos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  getEntityByEmail
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteUpdate);
