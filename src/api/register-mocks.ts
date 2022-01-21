import { setupWorker } from 'msw';
import { employeesMockHandlers } from './employees.mock';
import { limitsMockHandlers } from './limit.mock';
import { tokenMockHandlers } from './token.mock';
import { transfersMockHandlers } from './transfers.mock';

export const mockTokenAPI = () => {
  const worker = setupWorker(
    ...employeesMockHandlers,
    ...limitsMockHandlers,
    ...tokenMockHandlers,
    ...transfersMockHandlers,
  )
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}

