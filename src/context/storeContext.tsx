import { type ReactNode, createContext, useContext } from 'react';
import Store from '@/store/store';

interface StoreContextProviderProps {
  children: ReactNode;
}

export const StoreContext = createContext<Store | null>(null);

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  return (
    <StoreContext.Provider value={new Store()}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(
      'To use useStoreContext hook you have to wrap the component to the store context provider',
    );
  }

  return store;
}
