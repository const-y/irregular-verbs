import { render } from 'vitest-browser-react';
import React, { type PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreContext } from '../context/storeContext';
import { RootStore } from '@/store/RootStore';

const queryClient = new QueryClient();

const TestProvider: React.FC<PropsWithChildren<{ store?: RootStore }>> = ({
  children,
  store = new RootStore(() => 0),
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: { store?: RootStore },
) => {
  return render(ui, {
    wrapper: (props) => (
      <TestProvider store={options?.store}>{props.children}</TestProvider>
    ),
    ...options,
  });
};

export { customRender as render };
