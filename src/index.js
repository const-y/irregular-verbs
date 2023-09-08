import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreContextProvider } from './context/storeContext';
import './index.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
);
