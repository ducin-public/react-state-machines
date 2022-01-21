import React, { useState } from 'react';

import { Button, Panel } from 'ui';
import { AuthorizeDeviceProcessUnion } from './AuthorizeDeviceProcessUnion'

export function AuthorizeDeviceRunner() {
  const [status, setStatus] = useState<"CLEAN" | "RUNNING" | "SUCCESS" | "LOGGED_OUT">("CLEAN")
  const start = () => { setStatus("RUNNING") }

  const successFn = () => setStatus("SUCCESS")
  const logoutFn = () => setStatus("LOGGED_OUT")

  return <Panel>
    { (status === "SUCCESS") && <div>authorization succeeded</div> }
    { (status === "LOGGED_OUT") && <div>logged out</div> }
    {!(status === "RUNNING")
    ? <Button
        data-testid="btn-authorize-device"
        variant="PRIMARY"
        onClick={start}
      >authorize device</Button>
    : <AuthorizeDeviceProcessUnion
        onSuccess={successFn}
        onLogout={logoutFn}
      />}
  </Panel>
}
