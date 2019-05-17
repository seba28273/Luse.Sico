import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClienteDetail extends React.Component<IClienteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clienteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="sicoApp.cliente.detail.title">Cliente</Translate> [<b>{clienteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">
                <Translate contentKey="sicoApp.cliente.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="sicoApp.cliente.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.lastName}</dd>
            <dt>
              <span id="telefono">
                <Translate contentKey="sicoApp.cliente.telefono">Telefono</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.telefono}</dd>
            <dt>
              <span id="mail">
                <Translate contentKey="sicoApp.cliente.mail">Mail</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.mail}</dd>
            <dt>
              <span id="sexo">
                <Translate contentKey="sicoApp.cliente.sexo">Sexo</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.sexo}</dd>
            <dt>
              <span id="salary">
                <Translate contentKey="sicoApp.cliente.salary">Salary</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.salary}</dd>
            <dt>
              <span id="scoringCredit">
                <Translate contentKey="sicoApp.cliente.scoringCredit">Scoring Credit</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.scoringCredit}</dd>
            <dt>
              <Translate contentKey="sicoApp.cliente.department">Department</Translate>
            </dt>
            <dd>{clienteEntity.department ? clienteEntity.department.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/cliente" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/cliente/${clienteEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ cliente }: IRootState) => ({
  clienteEntity: cliente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteDetail);
