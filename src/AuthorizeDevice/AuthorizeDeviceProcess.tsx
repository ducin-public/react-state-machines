import React, { useState } from "react"

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'AuthorizeDevice/views'
import { getTokenInstruction, sendTokenCode, TokenInstruction, TokenConfirmation } from 'api/token'

import { Loader } from "ui"
import { assertState } from "../lib/state-members"

interface AuthorizeDeviceProcessProps {
  onSuccess: () => void
  onLogout: () => void
}

export const AuthorizeDeviceProcess = (props: AuthorizeDeviceProcessProps) => {
  const { onSuccess, onLogout } = props

  return <AuthorizeDeviceChooseMethodView
    onAddDeviceToTrusted={() => alert('onAddDeviceToTrusted')}
    onAllowDeviceOnce={() => alert('onAllowDeviceOnce')}
    onLogout={() => alert('onLogout')}
  />
}
