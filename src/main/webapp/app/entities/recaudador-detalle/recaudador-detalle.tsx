import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './recaudador-detalle.reducer';
import { IRecaudadorDetalle } from 'app/shared/model/recaudador-detalle.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecaudadorDetalleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class RecaudadorDetalle extends React.Component<IRecaudadorDetalleProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { recaudadorDetalleList, match } = this.props;
    return (
      <div>
        <h2 id="recaudador-detalle-heading">
          <Translate contentKey="sicoApp.recaudadorDetalle.home.title">Recaudador Detalles</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="sicoApp.recaudadorDetalle.home.createLabel">Create new Recaudador Detalle</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.ejecutada">Ejecutada</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.fechaEjecucion">Fecha Ejecucion</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.fechaProgramada">Fecha Programada</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.nroCuota">Nro Cuota</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.observaciones">Observaciones</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.reintentos">Reintentos</Translate>
                </th>
                <th>
                  <Translate contentKey="sicoApp.recaudadorDetalle.recaudador">Recaudador</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recaudadorDetalleList.map((recaudadorDetalle, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${recaudadorDetalle.id}`} color="link" size="sm">
                      {recaudadorDetalle.id}
                    </Button>
                  </td>
                  <td>{recaudadorDetalle.ejecutada}</td>
                  <td>
                    <TextFormat type="date" value={recaudadorDetalle.fechaEjecucion} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={recaudadorDetalle.fechaProgramada} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{recaudadorDetalle.nroCuota}</td>
                  <td>{recaudadorDetalle.observaciones}</td>
                  <td>{recaudadorDetalle.reintentos}</td>
                  <td>
                    {recaudadorDetalle.recaudador ? (
                      <Link to={`recaudador/${recaudadorDetalle.recaudador.id}`}>{recaudadorDetalle.recaudador.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${recaudadorDetalle.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recaudadorDetalle.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recaudadorDetalle.id}/delete`} color="danger" size="sm">
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
      </div>
    );
  }
}

const mapStateToProps = ({ recaudadorDetalle }: IRootState) => ({
  recaudadorDetalleList: recaudadorDetalle.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecaudadorDetalle);
