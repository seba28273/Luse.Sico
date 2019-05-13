import React from 'react';
import FacebookLogin from 'react-facebook-login';
import UserManagment, { getUser, getUsers } from '../administration/user-management/user-management.reducer';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleClose: Function;
  handleLogin: Function;
  actionLogin: Function;
  redirectToReferrer: boolean;
}

class Facebook extends React.Component<ILoginModalProps> {
  responseFacebook(response) {
    const { actionLogin } = this.props;
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
        cssClass={'btnFacebook '}
        callback={e => this.responseFacebook(e)}
      />
    );
  }
}
export default Facebook;
