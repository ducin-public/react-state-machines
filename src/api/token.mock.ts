import { rest } from 'msw';
import { setupWorker } from 'msw';

import { BASE_URL } from './config';

import { TokenConfirmation, TokenInstruction } from "api/token";

/* eslint-disable @typescript-eslint/no-unused-vars */

const delayTime = () => 500 * (1 + Math.random())

const errorResponse = {
  id: '1111-2222-3333-4444',
  code: 'INVALID_TOKEN',
  message: `Invalid confirmation token!`
}

// this type is expected by msw, otherwise we'd pass void to emphasize lack of content
type EMPTY_STRING = string

export const tokenMockHandlers = [
  rest.post<EMPTY_STRING, TokenInstruction>(`${BASE_URL}/banking/token`, async (req, res, ctx) => {
    return res(
      ctx.delay(delayTime()),
      ctx.json({
        instruction: `Enter SMS token (${new Date().toISOString()})`,
        tokenId: "1111-2222-3333-4444"
      }),
    )
  }),
  rest.post<TokenConfirmation, EMPTY_STRING>(`${BASE_URL}/banking/token/:tokenId`, async (req, res, ctx) => {
    const { tokenId } = req.params

    if (req.body.tokenCode.length !== 4){
      return res(
        ctx.delay(delayTime()),
        ctx.status(401),
        ctx.json(errorResponse as any),
      )
    }

    return res(
      ctx.json(''),
    )
  }),
]
