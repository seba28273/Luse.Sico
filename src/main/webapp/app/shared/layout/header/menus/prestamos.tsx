import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const PrestamosMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.prestamos.main')} id="prestamos-menu">
    <DropdownItem tag={Link} to="/entity/credit-detalle">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.prestamos.creditDetalle" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/credit">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.prestamos.credit" />
    </DropdownItem>
      <DropdownItem tag={Link} to="/entity/requestcredit">
          <FontAwesomeIcon icon="asterisk" fixedWidth />
          &nbsp;
          <Translate contentKey="global.menu.prestamos.requestcredit" />
      </DropdownItem>
  </NavDropdown>
);
