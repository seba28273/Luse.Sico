import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Badge, Input } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Translate,
    ICrudGetAllAction,
    TextFormat,
    getSortState,
    IPaginationBaseState,
    getPaginationItemsNumber,
    JhiPagination
} from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transferencia.reducer';
import { EstadoTransferencia, ITransferencia } from 'app/shared/model/transferencia.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Moment } from 'moment';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { IRecaudadorProps, IRecaudadorState } from 'app/entities/recaudador/recaudador';
import { getEntitiesByDate } from 'app/entities/transferencia/transferencia.reducer';

export interface ITransferenciaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITransferenciaState = IPaginationBaseState;

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

export class Transferencia extends React.Component<ITransferenciaProps, ITransferenciaState> {
    state: ITransferenciaState = {
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
        this.getEntities();
        this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
    }

    getEntitiesByDate = () => {
        const { activePage, itemsPerPage, sort, order, fromDate, toDate } = this.state;
        this.props.getEntitiesByDate(activePage - 1, itemsPerPage, `${sort},${order}`, fromDate, toDate);
    };

    handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

    getEntities = () => {
        const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
    };

    render() {
    const { transferenciaList, match, totalItems } = this.props;
    const { fromDate, toDate } = this.state;
    return (
      <div>
        <h2 id="transferencia-heading">
          <Translate contentKey="sicoApp.transferencia.home.title">Transferencias</Translate>

        </h2>
          <span>
          <Translate contentKey="audits.filter.from">from</Translate>
        </span>
          <Input type="date" value={fromDate} onChange={this.onChangeFromDate} name="fromDate" id="fromDate" />
          <span>
          <Translate contentKey="audits.filter.to">to</Translate>
        </span>
          <Input type="date" value={toDate} onChange={this.onChangeToDate} name="toDate" id="toDate" />
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                  <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate><FontAwesomeIcon icon="sort" />
                </th>
                  <th className="hand" onClick={this.sort('transferencia')}>
                  <Translate contentKey="sicoApp.transferencia.transferencia">Transferencia</Translate><FontAwesomeIcon icon="sort" />
                </th>
                  <th className="hand" onClick={this.sort('fecha')}>
                      <Translate contentKey="sicoApp.transferencia.fecha">Fecha</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('nrocuenta')}>
                      <Translate contentKey="sicoApp.transferencia.nrocuenta">Nro Cuenta</Translate><FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('cuitdestinatario')}>
                      <Translate contentKey="sicoApp.transferencia.cuitdestinatario">Cuit Destinatario</Translate><FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('nombre')}>
                      <Translate contentKey="sicoApp.transferencia.nombre">Cliente Acreditado</Translate><FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('nrocbu')}>
                      <Translate contentKey="sicoApp.transferencia.nrocbu">Nro Cbu</Translate><FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('monto')}>
                      <Translate contentKey="sicoApp.transferencia.monto">Monto</Translate><FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('status')}>
                      <Translate contentKey="sicoApp.transferencia.status">Status</Translate><FontAwesomeIcon icon="sort" />
                  </th>

                <th />
              </tr>
            </thead>
            <tbody>
              {transferenciaList.map((transferencia, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${transferencia.id}`} color="link" size="sm">
                      {transferencia.id}
                    </Button>
                  </td>

                  <td>{transferencia.nrotransferencia}</td>
                    <td>
                        <TextFormat type="date" value={transferencia.fecha} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{transferencia.nrocuenta}</td>
                    <td>{transferencia.cuitdestinatario}</td>
                    <td>{transferencia.nombre}</td>
                    <td>{transferencia.nrocbu}</td>
                    <td>{transferencia.monto}</td>
                    <td>
                        {transferencia.status === 'COMPLETA'? (
                            <div>
                                <Badge color="success">COMPLETA</Badge>
                            </div>

                        ) : (
                            <div>
                                <Badge color="danger">CANCELADA</Badge>
                            </div>

                        )}
                    </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${transferencia.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
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

const mapStateToProps = ({ transferencia }: IRootState) => ({
  transferenciaList: transferencia.entities,
    totalItems: transferencia.totalItems
});

const mapDispatchToProps = {
  getEntities, getEntitiesByDate
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transferencia);
