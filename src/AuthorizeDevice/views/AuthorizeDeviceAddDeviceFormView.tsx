import { useState } from "react"

import { Button, CheckboxField, TextField, ButtonList, Typography } from "ui"

interface AuthorizeDeviceAddDeviceFormViewProps {
  onSubmit: (deviceName: string) => void
}

export const AuthorizeDeviceAddDeviceFormView = (props: AuthorizeDeviceAddDeviceFormViewProps) => {
  const { onSubmit } = props
  const [deviceName, setDeviceName] = useState('My tiny computer')
  const [checked, setChecked] = useState(false)

  return <>
    <Typography variant="h2">Save this device as trusteed</Typography>
    <Typography variant="body">We need a little bit more data from you...</Typography>
    <TextField
      id="input-add-device-name"
      label="Device name"
      layoutDirection="vertical"
      defaultValue={deviceName}
      onChange={setDeviceName}
    />
    <CheckboxField
      id="checkbox-add-device-confirmation"
      label='I claim this is my own device'
      defaultChecked={checked}
      onChange={setChecked}
    />
    <ButtonList align="center">
      <Button
        data-testid="btn-add-device-name-submit"
        variant="PRIMARY"
        onClick={() => onSubmit(deviceName)}
        disabled={!checked}
      >save device as trusted</Button>
    </ButtonList>
  </>
}
