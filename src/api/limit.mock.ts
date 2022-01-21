import { rest } from 'msw';

import { BASE_URL } from './config';

import { LimitsSettings, SendLimitsUpdateResponse, VerificationMethod } from 'api/limits';

export const limitsState = {
  dailyLimit: 789,
  availableDailyAmount: 123,
  monthlyLimit: 5000,
  availableMonthlyAmount: 4334,
  verificationMethod: "SMS-CODE" as VerificationMethod
}

export const limitsMockHandlers = [
  rest.get<{}, LimitsSettings>(`${BASE_URL}/banking/limits`, async (req, res, ctx) => {
    return res(
      ctx.json(limitsState),
    )
  }),
  rest.post<{}, SendLimitsUpdateResponse>(`${BASE_URL}/banking/limits`, async (req, res, ctx) => {
    return res(
      ctx.json({
        token: {
          instruction: "Enter SMS code",
          tokenId: "1111-2222-3333-4444",
        },
        settings: limitsState,
      }),
    )
  }),
]
