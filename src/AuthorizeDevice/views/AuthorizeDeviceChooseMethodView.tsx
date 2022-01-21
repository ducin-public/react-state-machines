import { Button, ButtonList, Typography } from "ui"

interface AuthorizeDeviceChooseMethodViewProps {
  onAllowDeviceOnce: () => void
  onAddDeviceToTrusted: () => void
  onLogout: () => void
}

export const AuthorizeDeviceChooseMethodView = (props: AuthorizeDeviceChooseMethodViewProps) => {
  const { onAllowDeviceOnce, onAddDeviceToTrusted, onLogout } = props
  return <>
    <Typography variant="h2">Untrusted device</Typography>
    <Typography variant="body">According to the <a href="https://en.wikipedia.org/wiki/Payment_Services_Directive">PSD2 directive</a>, a two-step authentication is required.</Typography>
    <Typography variant="body">Apart from submitting a login with a password, you shall either verify your device by an SMS code only once or verify it and save it as trusted for future logins.</Typography>
    <Typography variant="body">Choose what you prefer.</Typography>
    <ButtonList align="center">
      <Button
        data-testid="btn-choose-add-device"
        variant="PRIMARY"
        onClick={onAddDeviceToTrusted}
      >save device as trusted</Button>
      <Button
        data-testid="btn-choose-allow-once"
        variant="PRIMARY"
        onClick={onAllowDeviceOnce}
      >allow device once</Button>
      <Button
        data-testid="btn-choose-logout"
        variant="SECONDARY"
        onClick={onLogout}
      >log out</Button>
    </ButtonList>
  </>
}
