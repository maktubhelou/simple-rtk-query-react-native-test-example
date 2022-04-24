import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetch from 'cross-fetch';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    // fetchFn: fetch,
  }),
  keepUnusedDataFor: process.env.NODE_ENV !== 'test' ? 60 : 0,
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
