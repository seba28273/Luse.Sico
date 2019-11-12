import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const PrestamosMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.prestamos.main')} id="prestamos-menu">
      <DropdownItem tag={Link} to="/entity/recaudador">
          <FontAwesomeIcon icon="asterisk" fixedWidth />
          &nbsp;
          <Translate contentKey="global.menu.entities.recaudador" />
      </DropdownItem>
      <DropdownItem tag={Link} to="/entity/cuotasvencidas">
          <FontAwesomeIcon icon="asterisk" fixedWidth />
          &nbsp;
          <Translate contentKey="global.menu.entities.recaudadorcuotasvencidas" />
      </DropdownItem>
      <DropdownItem tag={Link} to="/entity/transferencia">
          <FontAwesomeIcon icon="asterisk" fixedWidth />
          &nbsp;
          <Translate contentKey="global.menu.entities.transferencias" />
      </DropdownItem>

  </NavDropdown>
);
