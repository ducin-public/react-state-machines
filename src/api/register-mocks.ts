import { setupWorker } from 'msw';
import { limitsMockHandlers } from './limit.mock';
import { tokenMockHandlers } from './token.mock';

export const mockTokenAPI = () => {
  const worker = setupWorker(
    ...tokenMockHandlers,
    ...limitsMockHandlers,
  )
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}

