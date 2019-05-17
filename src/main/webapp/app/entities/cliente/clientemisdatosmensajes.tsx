import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';
import { Translate, getUrlParameter } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { IClienteUpdateProps } from 'app/entities/cliente/clientemisdatos';
import { activateAction, reset } from 'app/modules/account/activate/activate.reducer';

export interface IActivateProps extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {}

export class Clientemisdatosmensajes extends React.Component<IActivateProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    const key = getUrlParameter('key', this.props.location.search);
    this.props.activateAction(key);
  }

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>
              <Translate contentKey="actualization.title">Actualizacion de Tus Datos</Translate>
            </h1>
            <Alert color="success">
              <Translate contentKey="actualization.messages.success">
                <strong>Sus Datos fueron actualizados con exito</strong> Please
              </Translate>
            </Alert>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = ({ activate }: IRootState) => ({
  activationSuccess: activate.activationSuccess,
  activationFailure: activate.activationFailure
});

const mapDispatchToProps = { activateAction, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clientemisdatosmensajes);
