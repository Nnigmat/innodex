import { NavLink, LinkProps } from 'react-router-dom';

type NavItemProps = LinkProps & {
  active?: boolean;
};

export function NavItem({ to, active, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={`Link YandexHeader-NavLink ${
        active && 'YandexHeader-NavLink_active'
      }`}
    >
      {children}
    </NavLink>
  );
}
