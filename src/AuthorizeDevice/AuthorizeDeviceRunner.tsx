import React, { useState } from 'react';

import { Button } from 'ui';
import { AuthorizeDeviceProcessUnion } from './AuthorizeDeviceProcessUnion'

export function AuthorizeDeviceRunner() {
  const [isRunning, setRunning] = useState(false)
  
  return (<>
      <div>
        { isRunning ? <AuthorizeDeviceProcessUnion
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
