import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transferencia.reducer';
import { ITransferencia } from 'app/shared/model/transferencia.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransferenciaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TransferenciaDetail extends React.Component<ITransferenciaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { transferenciaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="sicoApp.transferencia.detail.title">Token</Translate> [<b>{transferenciaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="transferenciaName">
                <Translate contentKey="sicoApp.transferencia.transferencia">Token</Translate>
              </span>
            </dt>
            <dd>{transferenciaEntity.nrotransferencia}</dd>
          </dl>
          <Button tag={Link} to="/entity/transferencia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/transferencia/${transferenciaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ transferencia }: IRootState) => ({
  transferenciaEntity: transferencia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferenciaDetail);
