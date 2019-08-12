import React from 'react';
import GoogleLogin from 'react-google-login';
import { containerSize } from 'react-jhipster';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
  actionLogin: Function;
}
class GLogin extends React.Component<ILoginModalProps> {
  responseGoogle(Response) {
    sessionStorage.setItem('UserLogin', JSON.stringify(Response));
    const { actionLogin } = this.props;
    actionLogin(Response.profileObj.email, Response.profileObj.googleId, Response.profileObj.givenName, Response.profileObj.imageUrl);
  }

  responseGoogleerror(Response) {
    console.log(Response);
  }
  render() {
    return (
      <GoogleLogin
        clientId="664274078948-r0am5isbv34m1j98e9sdcd4an2qfo8at.apps.googleusercontent.com"
        autoLoad={false}
        onSuccess={e => this.responseGoogle(e)}
        onFailure={e => this.responseGoogleerror(e)}
        className="btnGoogle"
        buttonText={'Ingresar con Google'}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}
export default GLogin;
