import { render } from '@/test/test-uitls';
import AlertBox from './AlertBox';
import { it, expect } from 'vitest';

it('renders correctly', async () => {
  const page = await render(<AlertBox />);

  expect(page).toMatchSnapshot();
});
