import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col, Input } from 'reactstrap';
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
import { getEntitiesByDate, updateEntityWithTranferencia } from './recaudador.reducer';
import { IRecaudador } from 'app/shared/model/recaudador.model';
// tslint:disable-next-line:no-unused-variable

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IRecaudadorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IRecaudadorState = IPaginationBaseState;

const previousMonth = (): string => {
    const now: Date = new Date();
    const fromDate =
        now.getMonth() === 0
            ? new Date(now.getFullYear() - 1, 11, now.getDate())
            : new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return fromDate.toISOString().slice(0, 10);
};

const today = (): string => {
    const day: Date = new Date();
    day.setDate(day.getDate() + 1);
    const toDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return toDate.toISOString().slice(0, 10);
};

export interface IRecaudadorState extends IPaginationBaseState {
    fromDate: string;
    toDate: string;
}

export class Recaudador extends React.Component<IRecaudadorProps, IRecaudadorState> {
  state: IRecaudadorState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
      fromDate: previousMonth(),
      toDate: today()
  };

  componentDidMount() {
    this.getEntitiesByDate();
  }

    onChangeFromDate = evt => {
        this.setState(
            {
                fromDate: evt.target.value
            },
            () => this.getEntitiesByDate()
        );
    };
    onChangeToDate = evt => {
        this.setState(
            {
                toDate: evt.target.value
            },
            () => this.getEntitiesByDate()
        );
    };
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
    this.getEntitiesByDate();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

    getEntitiesByDate = () => {
    const { activePage, itemsPerPage, sort, order, fromDate, toDate } = this.state;
    this.props.getEntitiesByDate(activePage - 1, itemsPerPage, `${sort},${order}`, fromDate, toDate);
  };

    toggleTransferido = recaudador => () => {
        this.props.updateEntityWithTranferencia({
            ...recaudador,
            transferido: !recaudador.transferido
        });
    };
  render() {
    const { recaudadorList, match, totalItems } = this.props;
    const lblSaldo = this.props.recaudadorList && this.props.recaudadorList.length > 0 ? this.props.recaudadorList[0].saldo : '$0';
    const { fromDate, toDate } = this.state;
    return (
      <div>
        <h2 id="recaudador-heading">
          <Translate contentKey="sicoApp.recaudador.home.title">Recaudadores</Translate>
         {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="sicoApp.recaudador.home.createLabel">Create new Recaudador</Translate>
          </Link>*/}
        </h2>
          <span>
          <Translate contentKey="audits.filter.from">from</Translate>
        </span>
          <Input type="date" value={fromDate} onChange={this.onChangeFromDate} name="fromDate" id="fromDate" />
          <span>
          <Translate contentKey="audits.filter.to">to</Translate>
        </span>
          <Input type="date" value={toDate} onChange={this.onChangeToDate} name="toDate" id="toDate" />
          <Badge color="info">{'Saldo Cta Bancaria: $' + lblSaldo}</Badge>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('activo')}>
                  <Translate contentKey="sicoApp.recaudador.activo">Activo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                  <th className="hand" onClick={this.sort('transferido')}>
                      <Translate contentKey="sicoApp.recaudador.transferido">Transferido</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                <th className="hand" onClick={this.sort('cantCuotas')}>
                  <Translate contentKey="sicoApp.recaudador.cantCuotas">Cant Cuotas</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*<th className="hand" onClick={this.sort('cantidadRenegociado')}>
                  <Translate contentKey="sicoApp.recaudador.cantidadRenegociado">Cantidad Renegociado</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('capitalPrestamo')}>
                  <Translate contentKey="sicoApp.recaudador.capitalPrestamo">Capital Prestamo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cuotaCobrada')}>
                  <Translate contentKey="sicoApp.recaudador.cuotaCobrada">Cuota Cobrada</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cuotaPura')}>
                  <Translate contentKey="sicoApp.recaudador.cuotaPura">Cuota Pura</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*<th className="hand" onClick={this.sort('cuotaRecuperoCapital')}>
                  <Translate contentKey="sicoApp.recaudador.cuotaRecuperoCapital">Cuota Recupero Capital</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('diaHoraEjecucion')}>
                  <Translate contentKey="sicoApp.recaudador.diaHoraEjecucion">Dia Hora Ejecucion</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*<th className="hand" onClick={this.sort('esPersonal')}>
                  <Translate contentKey="sicoApp.recaudador.esPersonal">Es Personal</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('excluirFindeSemanas')}>
                  <Translate contentKey="sicoApp.recaudador.excluirFindeSemanas">Excluir Finde Semanas</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>*/}
               {/* <th className="hand" onClick={this.sort('fechaCreacion')}>
                  <Translate contentKey="sicoApp.recaudador.fechaCreacion">Fecha Creacion</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('fechaInicio')}>
                  <Translate contentKey="sicoApp.recaudador.fechaInicio">Fecha Inicio</Translate> <FontAwesomeIcon icon="sort" />
                </th>
              {/*  <th className="hand" onClick={this.sort('fechaVencimiento')}>
                  <Translate contentKey="sicoApp.recaudador.fechaVencimiento">Fecha Vencimiento</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
               {/* <th className="hand" onClick={this.sort('incobrable')}>
                  <Translate contentKey="sicoApp.recaudador.incobrable">Incobrable</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('interesesCuota')}>
                  <Translate contentKey="sicoApp.recaudador.interesesCuota">Intereses Cuota</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('interesesPrestamos')}>
                  <Translate contentKey="sicoApp.recaudador.interesesPrestamos">Intereses Prestamos</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('monto')}>
                  <Translate contentKey="sicoApp.recaudador.monto">Monto</Translate> <FontAwesomeIcon icon="sort" />
                </th>
               {/* <th className="hand" onClick={this.sort('observaciones')}>
                  <Translate contentKey="sicoApp.recaudador.observaciones">Observaciones</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
               {/* <th className="hand" onClick={this.sort('pagoManual')}>
                  <Translate contentKey="sicoApp.recaudador.pagoManual">Pago Manual</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th className="hand" onClick={this.sort('periodicidad')}>
                  <Translate contentKey="sicoApp.recaudador.periodicidad">Periodicidad</Translate> <FontAwesomeIcon icon="sort" />
                </th>
               {/* <th className="hand" onClick={this.sort('porcParticipacion')}>
                  <Translate contentKey="sicoApp.recaudador.porcParticipacion">Porc Participacion</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>*/}
               {/* <th className="hand" onClick={this.sort('tipoCobro')}>
                  <Translate contentKey="sicoApp.recaudador.tipoCobro">Tipo Cobro</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
               {/* <th className="hand" onClick={this.sort('idCliente')}>
                  <Translate contentKey="sicoApp.recaudador.idCliente">Id Cliente</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th />
              </tr>
            </thead>
            <tbody>
              {recaudadorList.map((recaudador, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${recaudador.id}`} color="link" size="sm">
                      {recaudador.id}
                    </Button>
                  </td>
                {/*  <td>{recaudador.activo ? 'true' : 'false'}</td>*/}
                <td>
                    {recaudador.activo ? (
                        <div>
                            <Badge color="success">SI</Badge>
                        </div>

                    ) : (
                        <div>
                            <Badge color="danger">NO</Badge>
                        </div>

                    )}
                </td>
                    <td>
                        {recaudador.transferido ? (
                            <Button color="success" disabled={false}>
                                Transferido
                            </Button>
                        ) : (
                            <Button color="info" onClick={this.toggleTransferido(recaudador)}>
                                Pendiente
                            </Button>
                        )}
                    </td>
                  <td>{recaudador.cantCuotas}</td>
                  {/*<td>{recaudador.cantidadRenegociado}</td>*/}
                  <td>{recaudador.capitalPrestamo}</td>
                  <td>{recaudador.cuotaCobrada}</td>
                  <td>{recaudador.cuotaPura}</td>
                 {/* <td>{recaudador.cuotaRecuperoCapital}</td>*/}
                  <td>{recaudador.diaHoraEjecucion}</td>
                 {/* <td>{recaudador.esPersonal ? 'true' : 'false'}</td>
                  <td>{recaudador.excluirFindeSemanas ? 'true' : 'false'}</td>*/}
                 {/* <td>
                    <TextFormat type="date" value={recaudador.fechaCreacion} format={APP_DATE_FORMAT} />
                  </td>*/}
                  <td>
                    <TextFormat type="date" value={recaudador.fechaInicio} format={APP_DATE_FORMAT} />
                  </td>
                  {/*<td>
                    <TextFormat type="date" value={recaudador.fechaVencimiento} format={APP_DATE_FORMAT} />
                  </td>*/}
                 {/* <td>{recaudador.incobrable ? 'true' : 'false'}</td>*/}
                  <td>{recaudador.interesesCuota}</td>
                  <td>{recaudador.interesesPrestamos}</td>
                  <td>{recaudador.monto}</td>
                  {/*<td>{recaudador.observaciones}</td>*/}
                 {/* <td>{recaudador.pagoManual}</td>*/}
                  <td>
                    <Translate contentKey={`sicoApp.Periodicidad.${recaudador.periodicidad}`} />
                  </td>
                  {/*<td>{recaudador.porcParticipacion}</td>*/}
                 {/* <td>
                    <Translate contentKey={`sicoApp.TipoCobro.${recaudador.tipoCobro}`} />
                  </td>*/}
                  {/*<td>{recaudador.idCliente}</td>*/}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${recaudador.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {/*<Button tag={Link} to={`${match.url}/${recaudador.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recaudador.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ recaudador }: IRootState) => ({
  recaudadorList: recaudador.entities,
  totalItems: recaudador.totalItems
});

const mapDispatchToProps = {
    getEntitiesByDate , updateEntityWithTranferencia
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recaudador);
