import { rest } from 'msw';

import { API_URL } from "./config";

export const logsMockHandlers = [
  rest.post<never>(`${API_URL}/logs`, async (req, res, ctx) => {
    return res()
  }),
]
