import { render } from 'vitest-browser-react';
import React, { type PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreContext } from '../context/storeContext';
import Store from '../store/store';

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
        enabled: false,
      },
    },
  });
};

const TestProvider: React.FC<PropsWithChildren<{ store?: Store }>> = ({
  children,
  store = new Store(),
}) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: { store?: Store }) => {
  return render(ui, {
    wrapper: (props) => (
      <TestProvider store={options?.store}>{props.children}</TestProvider>
    ),
    ...options,
  });
};

export { customRender as render };
