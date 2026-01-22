import App from './App';
import { it, expect } from 'vitest';
import { render } from '@/test/test-uitls';

it('renders without crashing', async () => {
  const { getByText } = await render(<App />);

  const title = getByText('Учим неправильные глаголы');

  await expect.element(title).toBeInTheDocument();
});
