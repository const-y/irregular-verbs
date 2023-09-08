import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreContextProvider } from './context/storeContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  );
});
