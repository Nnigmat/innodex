import { ReactNode } from 'react';

import { ListHeader } from './ListHeader';

import './List.css';

export function List({ children }: { children: ReactNode }) {
  return (
    <div className="List">
      {children && <ListHeader />}
      {children}
    </div>
  );
}
