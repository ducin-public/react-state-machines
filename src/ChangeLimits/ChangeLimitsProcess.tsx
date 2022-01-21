import React, { useEffect, useState } from 'react';

import {
  ChangeLimitsAmountFormView,
  ChangeLimitsListingView,
  ChangeLimitsVerificationMethodFormView,
  ChangeLimitsTokenView,
} from 'ChangeLimits/views'
import { sendTokenCode } from 'api/token'
import { getLimits, sendLimitsUpdate, VerificationMethod, LimitsSettings, SendLimitsUpdateResponse } from 'api/limits';
import { Money } from 'api/types';

import { Loader } from "ui"
import { assertState } from "../lib/state-members";
import { limitsState } from 'api/limit.mock';

interface ChangeLimitsProcessProps {
  onSuccess: () => void
  onCancel: () => void
}

export const ChangeLimitsProcess: React.FC<ChangeLimitsProcessProps> = (props) => {
  const { onSuccess, onCancel } = props

  const mockSettings = limitsState

  return <ChangeLimitsListingView
    settings={mockSettings}
    onChangeDailyLimit={() => alert('onChangeDailyLimit')}
    onChangeMonthlyLimit={() => alert('onChangeMonthlyLimit')}
    onChangeVerificationMethod={() => alert('onChangeVerificationMethod')}
  />
}
