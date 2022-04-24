import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import { Home } from './Home.screen';
import { server } from '../test/server';
import { rest } from 'msw';

describe('Home', () => {
  it('renders "Bulbasaur"', async () => {
    const component = <Home />;
    const { findByText } = renderWithProviders(component);

    await findByText('Loading...');

    const bulbasaur = await findByText('Bulbasaur');
    expect(bulbasaur).toBeTruthy();
  });

  it('handles error response', async () => {
    server.use(
      rest.get(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur',
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );

    const component = <Home />;
    const { findByText } = renderWithProviders(component);
    const errorText = await findByText('Oh no, there was an error!');

    expect(errorText).toBeTruthy();
  });
});
