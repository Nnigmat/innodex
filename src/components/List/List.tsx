import { ReactNode } from 'react';

import { ListHeader } from './ListHeader';

import './List.css';

export function List({
  children,
  isBuy,
}: {
  children: ReactNode;
  isBuy?: boolean;
}) {
  return (
    <div className="List">
      {children && <ListHeader isBuy={isBuy} />}
      {children}
    </div>
  );
}
