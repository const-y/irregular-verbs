import { render } from 'vitest-browser-react';
import AlertBox from './AlertBox';
import { it, expect } from 'vitest';

it('renders correctly', async () => {
  const page = await render(
    <AlertBox translate="встречать" success={false} error="" />,
  );

  expect(page).toMatchSnapshot();
});
