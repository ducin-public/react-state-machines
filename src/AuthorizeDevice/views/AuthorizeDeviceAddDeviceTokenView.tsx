import { useState } from "react"

import { Button, ButtonList, TextField, Typography } from "ui"

interface AuthorizeDeviceAddDeviceTokenViewProps {
  deviceName: string
  instruction: string
  onSubmit: (password: string) => void
  onReset: () => void
  onCancel: () => void
  error: boolean
}

export const AuthorizeDeviceAddDeviceTokenView = (props: AuthorizeDeviceAddDeviceTokenViewProps) => {
  const { deviceName, instruction, onSubmit, onReset, onCancel, error } = props
  const [password, setPassword] = useState('')

  return <>
    <Typography variant="h2">Save this device as trusted</Typography>
    <Typography variant="body">Just one more second and "{deviceName}" device will be saved as trusted.</Typography>
    <Typography variant="body">Once you do that, you won't need to authorize this device anymore.</Typography>
    <TextField
      type="password"
      id="input-add-device-password"
      label={instruction}
      layoutDirection="vertical"
      defaultValue={password}
      onChange={setPassword}
      error={error ? "Invalid token" : undefined}
    />
    <ButtonList align="center">
      <Button
        data-testid="btn-token-submit"
        variant="PRIMARY"
        onClick={() => onSubmit(password)}
      >submit</Button>
      <Button
        data-testid="btn-token-reset"
        variant="SECONDARY"
        onClick={onReset}
      >reset token</Button>
      <Button
        data-testid="btn-token-cancel"
        variant="SECONDARY"
        onClick={onCancel}
      >cancel</Button>
    </ButtonList>
  </>
}
