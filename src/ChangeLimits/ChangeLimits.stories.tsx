import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { ChangeLimitsProcess } from './ChangeLimitsProcess';
import { limitsMockHandlers } from 'api/limit.mock';
import { tokenMockHandlers } from 'api/token.mock';

export default {
  title: 'Change Limits/Process',
  parameters: {
    msw: [...tokenMockHandlers, ...limitsMockHandlers]
  },
  argTypes: {}
} as Meta;

const notify = action('notify')

export const _ChangeLimitsProcessMachine = () => {
  const successFn = () => {
    notify('succeeded')
  }

  const cancelFn = () => {
    notify('cancelled')
  }

  return <ChangeLimitsProcess
    onSuccess={successFn}
    onCancel={cancelFn}
  />
}
