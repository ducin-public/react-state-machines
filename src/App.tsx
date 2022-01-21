import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthorizeDeviceRunner } from 'AuthorizeDevice/AuthorizeDeviceRunner'
import { ChangeLimitsRunner } from 'ChangeLimits/ChangeLimitsRunner'

import './App.css';
import { Navigation } from 'Navigation';
import { Welcome } from 'Welcome';

function App() {
  return (<>
    <Navigation />
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/authorize-device" element={<AuthorizeDeviceRunner />} />
      <Route path="/change-limits" element={<ChangeLimitsRunner />} />
    </Routes>
  </>);
}

export default App;
