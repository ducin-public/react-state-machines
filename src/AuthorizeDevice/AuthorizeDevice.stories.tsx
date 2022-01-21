import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { AuthorizeDeviceProcess } from './AuthorizeDeviceProcess'
import { tokenMockHandlers } from 'api/token.mock';

import { Button, Panel } from 'ui/';

export default {
  title: 'Authorize Device/Process',
  parameters: {
    msw: tokenMockHandlers
  },
} as Meta;

const notify = action('notify')

type AuthorizeDeviceProcessComponent = React.FC<{
  onSuccess: () => void
  onLogout: () => void
}>

// story factory (HOC)
const generateInline = (Component: AuthorizeDeviceProcessComponent) => {
  return () => {
    const [status, setStatus] = useState<"CLEAN" | "RUNNING" | "SUCCESS" | "LOGGED_OUT">("CLEAN")
    const start = () => { setStatus("RUNNING") }

    const successFn = () => {
      setStatus("SUCCESS")
      notify('succeeded')
    }

    const logoutFn = () => {
      setStatus("LOGGED_OUT")
      notify('logged out')
    }

    return <Panel>
      { (status === "SUCCESS") && <div>authorization succeeded</div> }
      { (status === "LOGGED_OUT") && <div>logged out</div> }
      { (status !== "RUNNING") && <Button
          data-testid="btn-authorize-device"
          variant="PRIMARY"
          onClick={start}
        >start the process</Button>
      }
      { (status === "RUNNING") && <Component
        onSuccess={successFn}
        onLogout={logoutFn}
      /> }
    </Panel>
  }
}

export const _AuthorizeDeviceProcess = generateInline(AuthorizeDeviceProcess)
