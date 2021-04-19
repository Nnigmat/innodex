import { ReactNode } from 'react';
import './List.css';

export function List({ children }: { children: ReactNode }) {
  return <div className="List">{children}</div>;
}
