import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Panel, Typography } from 'ui';

import { ChangeLimitsProcess } from './ChangeLimitsProcessUnion';

export const StatusWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  right: 0;
  padding: 0;
`;

export const ChangeLimitsRunner: React.FC = () => {
  const [status, setStatus] = useState<"CLEAN" | "RUNNING" | "SUCCESS" | "FAIL">("CLEAN")
  const start = () => { setStatus("RUNNING") }

  const successFn = () => setStatus("SUCCESS")
  const cancelFn = () => setStatus("FAIL")

  // Clear status on first render
  useEffect(() => start(), []);

  return <>
    <div>
      <Typography variant='h1'>Expenses Limits</Typography>
      <Panel>
        <ChangeLimitsProcess
          onSuccess={successFn}
          onCancel={cancelFn}
        />
      </Panel>
    </div>
  </>
}
