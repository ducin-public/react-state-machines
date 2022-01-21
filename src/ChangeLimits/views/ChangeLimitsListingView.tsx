import React from 'react';

import { changeLimitsVerificationMethodLabel, LimitsSettings } from 'api/limits';

import { Typography, Button, FormatMoney } from 'ui';
import { Row, Cell, Grid } from './styled';

interface ChangeLimitsListingViewProps {
  settings: LimitsSettings
  onChangeDailyLimit: () => void
  onChangeMonthlyLimit: () => void
  onChangeVerificationMethod: () => void
}

export const ChangeLimitsListingView: React.FC<ChangeLimitsListingViewProps> = (props) => {
  const {
    settings: {
      dailyLimit, availableDailyAmount,
      monthlyLimit, availableMonthlyAmount,
      verificationMethod
    }, onChangeDailyLimit, onChangeMonthlyLimit, onChangeVerificationMethod
  } = props
  return <Grid>
    <Row>
      <Cell>
        <Typography variant="h3" noMargin>Limit type</Typography>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>Current</Typography>
      </Cell>
      <Cell>
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
      <Cell variant="action">
        <Button
          data-testid="btn-change-daily-limit"
          variant="SECONDARY"
          onClick={onChangeDailyLimit}
        >Change</Button>
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
      <Cell variant="action">
        <Button
          data-testid="btn-change-monthly-limit"
          variant="SECONDARY"
          onClick={onChangeMonthlyLimit}
        >Change</Button>
      </Cell>
      <Cell variant="amount">
        <Typography variant="body" noMargin bold><FormatMoney amount={availableMonthlyAmount} /></Typography>
      </Cell>
    </Row>
    <hr />
    <Row>
      <Cell>
        <Typography variant="body" noMargin>Payment Verification Method</Typography>
      </Cell>
      <Cell variant="amount">
        <Typography variant="body" noMargin bold>{changeLimitsVerificationMethodLabel[verificationMethod]}</Typography>
      </Cell>
      <Cell variant="action">
        <Button
          data-testid="btn-change-verification-method"
          variant="SECONDARY"
          onClick={onChangeVerificationMethod}
        >Change</Button>
      </Cell>
    </Row>
  </Grid>
}
