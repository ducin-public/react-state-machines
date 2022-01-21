import React, { useState } from 'react';

import { changeLimitsVerificationMethodLabel, LimitsSettings } from 'api/limits';

import { Button, ButtonList, Typography, FormatMoney, TextField } from 'ui';
import { Grid, Row, Cell } from './styled';

interface ChangeLimitsTokenViewProps {
  settings: LimitsSettings
  instruction: string
  onSubmit: (password: string) => void
  onReset: () => void
  onCancel: () => void
  error: boolean
}

export const ChangeLimitsTokenView: React.FC<ChangeLimitsTokenViewProps> = (props) => {
  const {
    settings: {
      dailyLimit, availableDailyAmount,
      monthlyLimit, availableMonthlyAmount,
      verificationMethod
    }, instruction, onSubmit, onReset, onCancel, error
  } = props
  const [password, setPassword] = useState('')

  return <>
    <Grid>
    <Row>
      <Cell>
        <Typography variant="h3" noMargin>Limit type</Typography>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>New Limit</Typography>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>Available</Typography>
      </Cell>
    </Row>
      <Row>
        <Cell>
          <Typography variant="body" noMargin>Daily expenses limit</Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={dailyLimit} /></Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={availableDailyAmount} /></Typography>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Typography variant="body" noMargin>Monthly expenses limit</Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={monthlyLimit} /></Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={availableMonthlyAmount} /></Typography>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Typography variant="body" noMargin>Payment Verification Method</Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold>{changeLimitsVerificationMethodLabel[verificationMethod]}</Typography>
        </Cell>
      </Row>
    </Grid>
    <hr />
    <TextField
      type="password"
      id="input-change-limit-password"
      label={instruction}
      defaultValue={password}
      layoutDirection="vertical"
      onChange={setPassword}
      error={error ? "Invalid token" : undefined}
    />
    <ButtonList align="center">
      <Button
        data-testid="btn-token-submit"
        variant="PRIMARY"
        onClick={() => onSubmit(password)}
      >Apply</Button>
      <Button
        data-testid="btn-token-reset"
        variant="SECONDARY"
        onClick={onReset}
      >Send new code</Button>
      <Button
        data-testid="btn-token-cancel"
        variant="SECONDARY"
        onClick={onCancel}
      >Cancel</Button>
    </ButtonList>
  </>
}
