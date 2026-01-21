import App from './App';
import { StoreContextProvider } from './context/storeContext';
import { render } from 'vitest-browser-react';
import { it, expect } from 'vitest';

it('renders without crashing', async () => {
  const { getByText } = await render(
    <StoreContextProvider>
      <App />
    </StoreContextProvider>,
  );

  const title = getByText('Учим неправильные глаголы');

  await expect.element(title).toBeInTheDocument();
});
