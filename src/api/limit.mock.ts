import { rest } from 'msw';

import { API_URL } from './config';

import { LimitsSettings, SendLimitsUpdateResponse, VerificationMethod } from 'api/limits';

export const limitsState = {
  dailyLimit: 789,
  availableDailyAmount: 123,
  monthlyLimit: 5000,
  availableMonthlyAmount: 4334,
  verificationMethod: "SMS-CODE" as VerificationMethod
}

export const limitsMockHandlers = [
  rest.get<{}, {}, LimitsSettings>(`${API_URL}/banking/limits`, async (req, res, ctx) => {
    return res(
      ctx.json(limitsState),
    )
  }),
  rest.post<{}, {}, SendLimitsUpdateResponse>(`${API_URL}/banking/limits`, async (req, res, ctx) => {
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

export const limitsSettingsMockHandlersWithSpy = (spy: jest.Mock) => [
  rest.get<{}, {}, LimitsSettings>(`${API_URL}/banking/limits`, async (req, res, ctx) => {
    // msw tworząc request ustawia niedeterministyczne id (uuid), które z oczywistyczh
    // względów nie współpracuje ze snapshotami.
    req.id = 'mock-ID';
    spy(req)

    return res(
      ctx.json(limitsState),
    )
  }),
]

export const sendLimitsUpdateMockHandlersWithSpy = (spy: jest.Mock) => [
  rest.post<{}, {}, SendLimitsUpdateResponse>(`${API_URL}/banking/limits`, async (req, res, ctx) => {
    // msw tworząc request ustawia niedeterministyczne id (uuid), które z oczywistyczh
    // względów nie współpracuje ze snapshotami.
    req.id = 'mock-ID';
    spy(req)

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
