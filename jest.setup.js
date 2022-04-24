// src/setupTests.js
import { fetch, Headers, Request, Response } from 'cross-fetch';
import AbortController from 'abort-controller';
import { server } from './src/test/server';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;
// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = '15000';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
