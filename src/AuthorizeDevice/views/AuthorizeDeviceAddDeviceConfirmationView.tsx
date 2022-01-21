import { Button, ButtonList, Typography } from "ui"

interface AuthorizeDeviceAddDeviceConfirmationViewProps {
  deviceName: string
  onClose: () => void
}

export const AuthorizeDeviceAddDeviceConfirmationView = (props: AuthorizeDeviceAddDeviceConfirmationViewProps) => {
  const { deviceName, onClose } = props

  return <>
    <Typography variant="h2">Device saved as trusted</Typography>
    <Typography variant="body">On the next login from <em>{deviceName}</em> device we won't bother you, cheers!</Typography>
    <ButtonList align="center">
      <Button
        data-testid="btn-close"
        variant="SECONDARY"
        onClick={onClose}
      >continue</Button>
    </ButtonList>
  </>
}
