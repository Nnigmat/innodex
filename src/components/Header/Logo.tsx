import { Logoaas } from '@yandex/ui/Header/desktop';
import { NavLink } from 'react-router-dom';

import logoSrc from '../../assets/logo.svg';

export function Logo() {
  return (
    <NavLink to="/innodex/" className="Header-Logo">
      <img src={logoSrc} alt="logo" className="Header-Logo-Icon" />
      <Logoaas circle name="InnoDEX" />
    </NavLink>
  );
}
