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
import { getCuotasByDate } from 'app/entities/recaudador-detalle/recaudador-detalle.reducer';
import { IRecaudadorDetalle } from 'app/shared/model/recaudador-detalle.model';

// tslint:disable-next-line:no-unused-variable

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { RecaudadorDetalle } from 'app/entities/recaudador-detalle/recaudador-detalle';

export interface IRecaudadorDetalleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IRecaudadorDetalleState = IPaginationBaseState;

const today = (): string => {
    const day: Date = new Date();
    day.setDate(day.getDate() + 1);
    const toDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return toDate.toISOString().slice(0, 10);
};

export interface IRecaudadorDetalleState extends IPaginationBaseState {
    fromDate: string;
}

export class Recaudadorcuotasvencidas extends React.Component<IRecaudadorDetalleProps, IRecaudadorDetalleState> {
  state: IRecaudadorDetalleState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
      fromDate: today()
  };

  componentDidMount() {
    this.getCuotasByDate();
  }

    onChangeFromDate = evt => {
        this.setState(
            {
                fromDate: evt.target.value
            },
            () => this.getCuotasByDate()
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
    this.getCuotasByDate();
  }

    getCuotasByDate = () => {
    const { fromDate } = this.state;
    this.props.getCuotasByDate(fromDate);
  };

  render() {
    const { recaudadorList, match, totalItems } = this.props;
    const { fromDate } = this.state;
    return (
      <div>
        <h2 id="recaudador-heading">
          <Translate contentKey="sicoApp.recaudador.home.mantenimiento">Mantenimiento de Cuotas</Translate>
         {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="sicoApp.recaudador.home.createLabel">Create new Recaudador</Translate>
          </Link>*/}
        </h2>
          <span>
          <Translate contentKey="audits.filter.from">from</Translate>
        </span>
          <Input type="date" value={fromDate} onChange={this.onChangeFromDate} name="fromDate" id="fromDate" />

        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('ejecutada')}>
                  <Translate contentKey="sicoApp.recaudadordetalle.ejecutada">Ejecutada</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                  <th className="hand" onClick={this.sort('Cliente')}>
                      <Translate contentKey="sicoApp.recaudadordetalle.cliente">Cliente</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                <th className="hand" onClick={this.sort('cantCuotas')}>
                  <Translate contentKey="sicoApp.recaudadordetalle.cantCuotas">Cant Cuotas</Translate> <FontAwesomeIcon icon="sort" />
                </th>

                <th className="hand" onClick={this.sort('Vencida')}>
                  <Translate contentKey="sicoApp.recaudador.vencida">Estado Cuota</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                  <th className="hand" onClick={this.sort('estadocuota')}>
                      <Translate contentKey="sicoApp.recaudador.estadocuota">Estado Cuota Cliente</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                <th className="hand" onClick={this.sort('nroCuota')}>
                  <Translate contentKey="sicoApp.recaudador.nrocuota">Nro Cuota</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('reintentos')}>
                  <Translate contentKey="sicoApp.recaudador.reintentos">Reintentos</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fechaProgramada')}>
                  <Translate contentKey="sicoApp.recaudador.fechaProgramada">Fecha Pago Cuota</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                  <th className="hand" onClick={this.sort('observaciones')}>
                      <Translate contentKey="sicoApp.recaudador.observaciones">Observaciones</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
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
                <td>
                    {recaudador.ejecutada ? (
                        <div>
                            <Badge color="success">SI</Badge>
                        </div>

                    ) : (
                        <div>
                            <Badge color="danger">NO</Badge>
                        </div>

                    )}
                </td>
                <td>{recaudador.nombre}</td>
                <td>{recaudador.cantCuotas}</td>
                <td>
                    {recaudador.vencida === 'NORMAL'? (
                        <div>
                            <Badge color="success">NORMAL</Badge>
                        </div>

                    ) : recaudador.vencida === 'POR VENCER'? (
                            <div>
                                <Badge color="warning">POR VENCER</Badge>
                            </div>

                        ):(
                        <div>
                            <Badge color="danger">VENCIDA</Badge>
                        </div>

                    )}
                </td>
                <td>{recaudador.estadocuota}</td>
                <td>
                    {recaudador.vencida === 'PAGADA'? (
                        <div>
                            <Badge color="success">PAGADA</Badge>
                        </div>

                    ) : recaudador.vencida === 'SIN ENVIAR'? (
                        <div>
                            <Badge color="info">SIN ENVIAR</Badge>
                        </div>

                    ): recaudador.vencida === 'PENDIENTE'? (
                        <div>
                            <Badge color="info">PENDIENTE</Badge>
                        </div>

                    ):(
                        <div>
                            <Badge color="danger">NO PAGADA</Badge>
                        </div>

                    )}
                </td>
                <td>{recaudador.reintentos}</td>
                <td>
                    <TextFormat type="date" value={recaudador.fechaProgramada} format={APP_DATE_FORMAT} />
                </td>
                <td>{recaudador.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recaudadorDetalle }: IRootState) => ({
  recaudadorList: recaudadorDetalle.entities,
  totalItems: recaudadorDetalle.totalItems
});

const mapDispatchToProps = {
    getCuotasByDate
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recaudadorcuotasvencidas);
