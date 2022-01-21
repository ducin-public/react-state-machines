import React, { useState } from 'react';

import { VerificationMethod, changeLimitsVerificationMethodLabel, LimitsSettings } from 'api/limits';

import { Button, ButtonList, Typography, DropdownField } from 'ui';

interface ChangeLimitsVerificationMethodFormViewProps {
  settings: LimitsSettings
  onApply: (method: VerificationMethod) => void
  onCancel: () => void
}

export const ChangeLimitsVerificationMethodFormView: React.FC<ChangeLimitsVerificationMethodFormViewProps> = (props) => {
  const { settings: { verificationMethod }, onApply, onCancel } = props
  const [currentMethod, setCurrentMethod] = useState(verificationMethod)

  return <>
    <div>
      <DropdownField
        id="input-change-verification-method"
        label='Payment Verification Method'
        defaultValue={currentMethod}
        items={changeLimitsVerificationMethodLabel}
        includeEmpty={false}
        onChange={method => setCurrentMethod(method as VerificationMethod)}
      />
      <Typography variant="body">Make your choice wisely.</Typography>
      <ButtonList align="center">
        <Button
          data-testid="btn-apply"
          variant="PRIMARY"
          onClick={() => onApply(currentMethod)}
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
