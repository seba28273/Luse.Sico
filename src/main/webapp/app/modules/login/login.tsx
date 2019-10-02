import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { loginfacebook, logingoogle, login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoginState {
  showModal: boolean;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    showModal: this.props.showModal
  };

  componentDidUpdate(prevProps: ILoginProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ showModal: this.props.showModal });
    }
  }

  handleLoginFacebook = (email, id, username, picture) => {
    this.props.loginfacebook(email, id, username, picture);
  };

  handleLoginGoogle = (email, id, username, picture) => {
    this.props.logingoogle(email, id, username, picture);
  };

  handleLogin = (username, password, rememberMe = false) => {
    this.props.login(username, password, rememberMe);
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { location, isAuthenticated } = this.props;
    const { from } = location.state || { from: { pathname: '/', search: location.search } };
    const { showModal } = this.state;
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
        <LoginModal
            showModal={showModal}
            loginError={this.props.loginError}
            handleLogin={this.handleLogin}
            handleClose={this.handleClose}
            handleLoginFacebook={this.handleLoginFacebook}
            handleLoginGoogle={this.handleLoginGoogle}
        />
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin
});

const mapDispatchToProps = {
  login,
  loginfacebook,
  logingoogle
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
