import React, { useState } from 'react';

import { Money } from 'api/types';
import { LimitsSettings } from 'api/limits';

import { Button, TextField, ButtonList } from 'ui';

interface ChangeLimitsAmountFormViewProps {
  limitType: "DAILY" | "MONTHLY"
  settings: LimitsSettings
  onApply: (limit: Money) => void
  onCancel: () => void
}

export const ChangeLimitsAmountFormView: React.FC<ChangeLimitsAmountFormViewProps> = (props) => {
  const { settings, limitType, onApply, onCancel } = props
  const initialLimitValue = limitType === "DAILY" ? settings.dailyLimit : settings.monthlyLimit
  const [newLimit, setNewLimit] = useState(initialLimitValue)
  const limitLabel = limitType === "DAILY"
    ? "Daily expenses limit"
    : "Monthly expenses limit"


  return <>
    <div>
      <TextField
        id="input-change-limit-amount"
        label={limitLabel}
        defaultValue={newLimit + ''}
        onChange={e => setNewLimit(parseFloat(e))}
      />
      <ButtonList align="center">
        <Button
          data-testid="btn-apply"
          variant="PRIMARY"
          onClick={() => onApply(newLimit)}
        >Apply</Button>
        <Button
          data-testid="btn-cancel"
          variant="SECONDARY"
          onClick={onCancel}
        >Cancel</Button>
      </ButtonList>
    </div>
  </>
}
