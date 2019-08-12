import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IClienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IClienteState = IPaginationBaseState;

export class Cliente extends React.Component<IClienteProps, IClienteState> {
  state: IClienteState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { clienteList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="cliente-heading">
          <Translate contentKey="sicoApp.cliente.home.title">Clientes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sicoApp.cliente.home.createLabel">Create new Cliente</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('firstName')}>
                  <Translate contentKey="sicoApp.cliente.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('lastName')}>
                  <Translate contentKey="sicoApp.cliente.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('dni')}>
                  <Translate contentKey="sicoApp.cliente.dni">Dni</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cuit')}>
                  <Translate contentKey="sicoApp.cliente.cuit">Dni</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fechaNacimiento')}>
                  <Translate contentKey="sicoApp.cliente.fechaNacimiento">Fecha Nacimiento</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('direccion')}>
                  <Translate contentKey="sicoApp.cliente.direccion">Direccion</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('numero')}>
                  <Translate contentKey="sicoApp.cliente.numero">Numero</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('telefono')}>
                  <Translate contentKey="sicoApp.cliente.telefono">Telefono</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('mail')}>
                  <Translate contentKey="sicoApp.cliente.mail">Mail</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('sexo')}>
                  <Translate contentKey="sicoApp.cliente.sexo">Sexo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('salary')}>
                  <Translate contentKey="sicoApp.cliente.salary">Salary</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('scoringCredit')}>
                  <Translate contentKey="sicoApp.cliente.scoringCredit">Scoring Credit</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sicoApp.cliente.department">Department</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clienteList.map((cliente, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cliente.id}`} color="link" size="sm">
                      {cliente.id}
                    </Button>
                  </td>
                  <td>{cliente.firstName}</td>
                  <td>{cliente.lastName}</td>
                  <td>{cliente.dni}</td>
                  <td>{cliente.cuit}</td>
                  <td>
                    <TextFormat type="date" value={cliente.fechaNacimiento} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.numero}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.mail}</td>
                  <td>
                    <Translate contentKey={`sicoApp.SEXO.${cliente.sexo}`} />
                  </td>
                  <td>{cliente.salary}</td>
                  <td>{cliente.scoringCredit}</td>
                  <td>
                    {cliente.department ? <Link to={`department/${cliente.department.id}`}>{cliente.department.departmentName}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cliente.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cliente.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cliente.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ cliente }: IRootState) => ({
  clienteList: cliente.entities,
  totalItems: cliente.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cliente);
