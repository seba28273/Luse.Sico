import React from 'react';
import FacebookLogin from 'react-facebook-login';
import UserManagment, { getUser, getUsers } from '../administration/user-management/user-management.reducer';
//import * as env from 'environment';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleClose: Function;
  handleLogin: Function;
  actionLogin: Function;
  redirectToReferrer: boolean;
}

//const { CLAVE_FACEBOOK } = env[process.env.NODE_ENV];

class Facebook extends React.Component<ILoginModalProps> {
  responseFacebook(response) {
    const { actionLogin } = this.props;
    //console.log(response);
    //guardo en una variable de entorno el usuario que se logueo con facebook
    sessionStorage.setItem('UserLogin', JSON.stringify(response));
    actionLogin(response.email, response.id, response.name, response.picture.data.url);
  }

  render() {
    return (
      <FacebookLogin
        appId="865287290471934"
        autoLoad={false}
        fields="name,email,picture"
        textButton={'Ingresar Con Facebook'}
        size={'small'}
        scope={'public_profile'}
        cssClass={'btnFacebook'}
        callback={e => this.responseFacebook(e)}
      />
    );
  }
}
export default Facebook;
