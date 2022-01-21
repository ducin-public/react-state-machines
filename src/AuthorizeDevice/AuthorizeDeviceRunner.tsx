import React, { useState } from 'react';

import { Button } from 'ui';
import { AuthorizeDeviceProcess } from './AuthorizeDeviceProcess'

export function AuthorizeDeviceRunner() {
  const [isRunning, setRunning] = useState(false)
  
  return (<>
      <div>
        { isRunning ? <AuthorizeDeviceProcess
          onSuccess={() => alert('success')}
          onLogout={() => alert('alert')}
        /> : <Button
          data-testid="btn-authorize-device"
          variant="PRIMARY"
          onClick={() => setRunning(true)}
        >authorize device</Button> }
      </div>
    </>
  );
}
