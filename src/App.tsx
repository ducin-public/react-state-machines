import React from 'react';

import { AuthorizeDeviceRunner } from 'AuthorizeDevice/AuthorizeDeviceRunner'
import { ChangeLimitsRunner } from 'ChangeLimits/ChangeLimitsRunner'

import './App.css';

function App() {
  return (<>
      <AuthorizeDeviceRunner />
      <ChangeLimitsRunner />
    </>
  );
}

export default App;
