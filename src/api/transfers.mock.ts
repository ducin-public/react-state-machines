import { rest } from 'msw';

import { API_URL } from './config';
import { Transfer } from './transfers';

import mockJSON from './transfers.mock.json';

export const transfersJSON: Transfer[] = mockJSON;

export const transfersMockHandlers = [
  rest.get<never, never, Transfer[]>(`${API_URL}/account/transfers`, async (req, res, ctx) => {
    return res(
      ctx.json(transfersJSON),
    )
  }),
]

export const transfersMockHandlersWithSpy = (spy: jest.Mock) => [
  rest.get<never, never, Transfer[]>(`${API_URL}/account/transfers`, async (req, res, ctx) => {
    // msw tworząc request ustawia niedeterministyczne id (uuid), które z oczywistyczh
    // względów nie współpracuje ze snapshotami.
    req.id = 'mock-ID';
    spy(req)

    return res(
      ctx.json(transfersJSON),
    )
  }),
]
