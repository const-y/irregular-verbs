import { createContext } from 'react';
import Store from '../store/store';

export const StoreContext = createContext();

export function StoreContextProvider({ children }) {
  return (
    <StoreContext.Provider value={new Store()}>
      {children}
    </StoreContext.Provider>
  );
}
