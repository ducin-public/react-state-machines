import { useState } from "react"

import { Button, ButtonList, TextField, Typography } from "ui"

interface AuthorizeDeviceAllowOnceTokenViewProps {
  instruction: string
  onSubmit: (password: string) => void
  onCancel: () => void
  error: boolean
}

export const AuthorizeDeviceAllowOnceTokenView = (props: AuthorizeDeviceAllowOnceTokenViewProps) => {
  const { instruction, onSubmit, onCancel, error } = props
  const [password, setPassword] = useState('')

  return <>
    <Typography variant="h2">Allow device once</Typography>
    <Typography variant="body">Enter the SMS token you should have just received.</Typography>
    <TextField
      type="password"
      id="input-allow-once-password"
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
        data-testid="btn-token-cancel"
        variant="SECONDARY"
        onClick={onCancel}
      >cancel</Button>
    </ButtonList>
  </>
}
