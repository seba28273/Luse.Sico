import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {Translate, ICrudGetAllAction, TextFormat} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transferencia.reducer';
import {EstadoTransferencia, ITransferencia} from 'app/shared/model/transferencia.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {Moment} from "moment";

export interface ITransferenciaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Transferencia extends React.Component<ITransferenciaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { transferenciaList, match } = this.props;
    return (
      <div>
        <h2 id="transferencia-heading">
          <Translate contentKey="sicoApp.transferencia.home.title">Transferencias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sicoApp.transferencia.home.createLabel">Create new Transferencia</Translate>
          </Link>
        </h2>
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
                  <th className="hand" onClick={this.sort('estado')}>
                      <Translate contentKey="sicoApp.transferencia.estado">Estado</Translate><FontAwesomeIcon icon="sort" />
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
                        <Translate contentKey={`sicoApp.EstadoTransferencia.${transferencia.estado}`} />
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
      </div>
    );
  }
}

const mapStateToProps = ({ transferencia }: IRootState) => ({
  transferenciaList: transferencia.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transferencia);
