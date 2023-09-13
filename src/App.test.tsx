import React from 'react';
import App from './App';
import { StoreContextProvider } from './context/storeContext';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders without crashing', () => {
  const { getByText } = render(
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  );

  expect(getByText('Учим неправильные глаголы')).toBeInTheDocument();
});
