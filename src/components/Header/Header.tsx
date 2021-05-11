import React from 'react';
import { useLocation } from 'react-router-dom';

import { Header as HeaderInner, HeaderNav } from '@yandex/ui/Header/desktop';

import { Logo } from './Logo';
import { NavItem } from './NavItem';

import './Header.css';

export function Header(props) {
  const location = useLocation();

  return (
    <HeaderInner logo={<Logo />}>
      <HeaderNav>
        <NavItem
          to="/innodex/buy"
          active={Boolean(location.pathname.match('/innodex/buy'))}
        >
          Buy
        </NavItem>
        <NavItem
          to="/innodex/sell"
          active={Boolean(location.pathname.match('/innodex/sell'))}
        >
          Sell
        </NavItem>
        {props.account}
      </HeaderNav>
    </HeaderInner>
  );
}
