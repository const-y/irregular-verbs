import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreContextProvider } from './context/storeContext';

const domNode = document.getElementById('root');

if (domNode === null) {
  throw new Error('Element root is not found');
}

const root = createRoot(domNode);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </QueryClientProvider>,
);
