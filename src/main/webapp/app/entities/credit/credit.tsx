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
import { getEntities } from './credit.reducer';
import { ICredit } from 'app/shared/model/credit.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICreditProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICreditState = IPaginationBaseState;

export class Credit extends React.Component<ICreditProps, ICreditState> {
  state: ICreditState = {
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
    const { creditList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="credit-heading">
          <Translate contentKey="sicoApp.credit.home.title">Credits</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sicoApp.credit.home.createLabel">Create new Credit</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('periodicidad')}>
                  <Translate contentKey="sicoApp.credit.periodicidad">Periodicidad</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('diaHoraEjecucion')}>
                  <Translate contentKey="sicoApp.credit.diaHoraEjecucion">Dia Hora Ejecucion</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*<th className="hand" onClick={this.sort('tipoCobro')}>
                  <Translate contentKey="sicoApp.credit.tipoCobro">Tipo Cobro</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('monto')}>
                  <Translate contentKey="sicoApp.credit.monto">Monto</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={this.sort('observaciones')}>
                  <Translate contentKey="sicoApp.credit.observaciones">Observaciones</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('activo')}>
                  <Translate contentKey="sicoApp.credit.activo">Activo</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('capitalPrestamo')}>
                  <Translate contentKey="sicoApp.credit.capitalPrestamo">Capital Prestamo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cantCuotas')}>
                  <Translate contentKey="sicoApp.credit.cantCuotas">Cant Cuotas</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cuotaCobrada')}>
                  <Translate contentKey="sicoApp.credit.cuotaCobrada">Cuota Cobrada</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={this.sort('fechaCreacion')}>
                  <Translate contentKey="sicoApp.credit.fechaCreacion">Fecha Creacion</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fechaInicio')}>
                  <Translate contentKey="sicoApp.credit.fechaInicio">Fecha Inicio</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('fechaVencimiento')}>
                  <Translate contentKey="sicoApp.credit.fechaVencimiento">Fecha Vencimiento</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*<th className="hand" onClick={this.sort('excluirFindeSemanas')}>
                  <Translate contentKey="sicoApp.credit.excluirFindeSemanas">Excluir Finde Semanas</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('porcParticipacion')}>
                  <Translate contentKey="sicoApp.credit.porcParticipacion">Porc Participacion</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}

                {/*<th className="hand" onClick={this.sort('interesesPrestamos')}>
                  <Translate contentKey="sicoApp.credit.interesesPrestamos">Intereses Prestamos</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cuotaPura')}>
                  <Translate contentKey="sicoApp.credit.cuotaPura">Cuota Pura</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('interesesCuota')}>
                  <Translate contentKey="sicoApp.credit.interesesCuota">Intereses Cuota</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cuotaRecuperoCapital')}>
                  <Translate contentKey="sicoApp.credit.cuotaRecuperoCapital">Cuota Recupero Capital</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cantidadRenegociado')}>
                  <Translate contentKey="sicoApp.credit.cantidadRenegociado">Cantidad Renegociado</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('incobrable')}>
                  <Translate contentKey="sicoApp.credit.incobrable">Incobrable</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('pagoManual')}>
                  <Translate contentKey="sicoApp.credit.pagoManual">Pago Manual</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('esPersonal')}>
                  <Translate contentKey="sicoApp.credit.esPersonal">Es Personal</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th />
              </tr>
            </thead>
            <tbody>
              {creditList.map((credit, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${credit.id}`} color="link" size="sm">
                      {credit.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`sicoApp.Periodicidad.${credit.periodicidad}`} />
                  </td>
                  <td>{credit.diaHoraEjecucion}</td>
                  {/*<td>
                    <Translate contentKey={`sicoApp.TipoCobro.${credit.tipoCobro}`} />
                  </td>*/}
                  <td>{credit.capitalPrestamo}</td>
                  <td>{credit.monto}</td>
                  {/*   <td>{credit.observaciones}</td>
                  <td>{credit.activo ? 'true' : 'false'}</td>*/}
                  <td>{credit.cantCuotas}</td>
                  <td>{credit.cuotaCobrada}</td>
                  {/* <td>
                    <TextFormat type="date" value={credit.fechaCreacion} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={credit.fechaInicio} format={APP_DATE_FORMAT} />
                  </td>*/}
                  <td>
                    <TextFormat type="date" value={credit.fechaVencimiento} format={APP_DATE_FORMAT} />
                  </td>
                  {/*<td>{credit.excluirFindeSemanas ? 'true' : 'false'}</td>
                  <td>{credit.porcParticipacion}</td>*/}

                  {/*<td>{credit.interesesPrestamos}</td>
                  <td>{credit.cuotaPura}</td>
                  <td>{credit.interesesCuota}</td>
                  <td>{credit.cuotaRecuperoCapital}</td>
                  <td>{credit.cantidadRenegociado}</td>
                  <td>{credit.incobrable ? 'true' : 'false'}</td>
                  <td>{credit.pagoManual ? 'true' : 'false'}</td>
                  <td>{credit.esPersonal ? 'true' : 'false'}</td>*/}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${credit.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {/*<Button tag={Link} to={`${match.url}/${credit.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${credit.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>*/}
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

const mapStateToProps = ({ credit }: IRootState) => ({
  creditList: credit.entities,
  totalItems: credit.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Credit);
