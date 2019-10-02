import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
  actionLogin: Function;
  handleLoginFacebook: Function;
  handleLoginGoogle: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  handleSubmitFacebook = (email, id, name, pictureurl) => {
    const { handleLoginFacebook } = this.props;
    handleLoginFacebook(email, id, name, pictureurl);
  };

  handleSubmitGoogle = (email, id, name, pictureurl) => {
    const { handleLoginGoogle } = this.props;
    handleLoginGoogle(email, id, name, pictureurl);
  };

  render() {
    const { loginError, handleClose, handleSubmitFacebook, handleSubmitGoogle } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" toggle={handleClose}>
            <Translate contentKey="login.title">Sign in</Translate>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <Translate contentKey="login.messages.error.authentication">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label={translate('global.form.username')}
                  placeholder={translate('global.form.username.placeholder')}
                  required
                  errorMessage="Username cannot be empty!"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  label={translate('login.form.password')}
                  placeholder={translate('login.form.password.placeholder')}
                  required
                  errorMessage="Password cannot be empty!"
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">Remember me</Translate>
                  </Label>
                </AvGroup>
              </Col>
             {/* <Col md="12">
                <AvGroup>
                  <div className="mt-1">
                    &nbsp;
                    <Facebook showModal={false} loginError={loginError} actionLogin={this.handleSubmitFacebook} handleClose={handleClose} />
                  </div>

                  <div className="mt-1">
                    &nbsp;
                    <GLogin showModal={false} loginError={loginError} handleClose={handleClose} actionLogin={this.handleSubmitGoogle} />
                  </div>
                </AvGroup>
              </Col>*/}
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <Link to="/reset/request">
                <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
              </Link>
            </Alert>
            <Alert color="warning">
              <span>
                <Translate contentKey="global.messages.info.register.noaccount">You don't have an account yet?</Translate>
              </span>{' '}
              <Link to="/register">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
            <Button color="primary" type="submit">
              <Translate contentKey="login.form.button">Sign in</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
