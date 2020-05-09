import React from 'react';
import renderer from 'react-test-renderer';
import AlertBox from './AlertBox';

it('renders correctly', () => {
  const tree = renderer
    .create(<AlertBox sampler={['meet', 'met', 'met', 'встречать']}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});