import { render } from '@testing-library/react';
import AlertBox from './AlertBox';
import React from 'react';

it('renders correctly', () => {
  const tree = render(
    <AlertBox translate="встречать" success={false} error="" />,
  );

  expect(tree).toMatchSnapshot();
});
