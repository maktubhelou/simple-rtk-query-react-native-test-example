/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from './App';
import { renderWithProviders } from '../test-utils';

describe('App', () => {
  it('matches snapshot', async () => {
    const component = <App />;
    const { store, toJSON } = renderWithProviders(component);

    expect(toJSON()).toMatchSnapshot();
    expect(store?.getState()).toMatchSnapshot();
  });
});
