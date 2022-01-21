import { rest } from 'msw';

import { API_URL } from "./config";
import { Employee } from "api/employees";

import mockJSON from "./employees.mock.json"
export const employeesJSON = mockJSON as Employee[]

export const employeesMockHandlers = [
  rest.get<never, never, Employee[]>(`${API_URL}/employees`, async (req, res, ctx) => {
    return res(
      ctx.json(employeesJSON),
    )
  }),
]
