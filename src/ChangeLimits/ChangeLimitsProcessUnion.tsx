import React, { useEffect, useState } from 'react';

import {
  ChangeLimitsAmountFormView,
  ChangeLimitsListingView,
  ChangeLimitsVerificationMethodFormView,
  ChangeLimitsTokenView,
} from 'ChangeLimits/views'
import { sendTokenCode } from 'api/token'
import { getLimits, sendLimitsUpdate, VerificationMethod } from 'api/limits';
import { Money } from 'api/types';

import { Loader } from "ui"
import { ChangeLimitsState } from './types';
import { assertState } from "../lib/state-members";

const useChangeLimits = (props: ChangeLimitsProcessProps) => {
  const { onSuccess, onCancel } = props

  // loading is a state. loading=false & state.type="SOMETHING" is going back to primitive obsession
  // so we're dropping a standalone loading:boolean cell
  // const [isLoading, setLoading] = useState(false)

  const [state, setState] = useState<ChangeLimitsState>({
    type: "LOADING",
  })

  const loadListing = async () => {
    getLimits()
      .then(settings => setState({
        type: "LISTING",
        settings,
      }))
  }

  useEffect(() => {
    loadListing()
  }, [])

  const modifyDailyLimit = () => {
    assertState(state, "LISTING")
    setState({
      type: "DAILY_AMOUNT_FORM",
      settings: state.settings,
    })
  }

  const modifyMonthlyLimit = () => {
    assertState(state, "LISTING")
    setState({
      type: "MONTHLY_AMOUNT_FORM",
      settings: state.settings,
    })
  }

  const applyDailyLimit = async (newLimit: Money) => {
    assertState(state, "DAILY_AMOUNT_FORM")

    setState({ type: "LOADING" })
    const response = await sendLimitsUpdate({
      dailyLimit: newLimit
    })

    setState({
      type: "TOKEN",
      // 🤔 wprawdzie zmieniamy stan po drodze (loading powyżej) ale stan sprzed zmiany został "domknięty" (closure trzyma go w zmiennej `state`)
      // więc state.settings ma poprawną wartość. ALE jeśli nie lubimy "stale closures" które podnoszą poziom trudności - możemy zdestrukturyzować stan i użyć prostej zmiennej
      settings: { ...state.settings, ...response.settings },
      ...response.token,
    })
  }

  const applyMonthlyLimit = async (newLimit: Money) => {
    assertState(state, "MONTHLY_AMOUNT_FORM")

    setState({ type: "LOADING" })
    const response = await sendLimitsUpdate({
      monthlyLimit: newLimit
    })

    setState({
      type: "TOKEN",
      // 🤔 wprawdzie zmieniamy stan po drodze (loading powyżej) ale stan sprzed zmiany został "domknięty" (closure trzyma go w zmiennej `state`)
      // więc state.settings ma poprawną wartość. ALE jeśli nie lubimy "stale closures" które podnoszą poziom trudności - możemy zdestrukturyzować stan i użyć prostej zmiennej
      settings: { ...state.settings, ...response.settings },
      ...response.token,
    })
  }

  const modifyVerificationMethod = () => {
    assertState(state, "LISTING")

    setState({
      type: "VERIFICATION_METHOD_FORM",
      settings: state.settings,
    })
  }

  const applyVerificationMethod = async (newMethod: VerificationMethod) => {
    assertState(state, "VERIFICATION_METHOD_FORM")

    setState({ type: "LOADING" })
    const response = await sendLimitsUpdate({
      verificationMethod: newMethod
    })

    setState({
      type: "TOKEN",
      settings: { ...state.settings, ...response.settings },
      ...response.token,
    })
  }

  const resetToken = async () => {
    // TODO dla uczestników: osobno trzeba obsłużyć reset-token dla zmiany limitu dziennego, osobno miesięcznego, i osobno dla zmiany settings
    // bo API takie jest niemiłe, że albo przyjmuje { dailyLimit: 1234 } albo { verificationMethod: "SMS-CODE" }
    // a tutaj mamy wspólne
    // a no i kiedy jest reset, to oznacza, że poprzedni request porzucamy, a robimy nowy. Czyli żądanie zmiany wysyłamy jeszcze raz.
    throw new Error("BROKEN!")
    // if (state.type !== "TOKEN" && state.type !== "TOKEN_INVALID"){
    //   throw new Error(`Invalid State: ${state}`)
    // }
    // setState({ type: "LOADING" })
    // const tokenInstruction = await sendLimitsUpdate()
    // setState({ ...state, ...tokenInstruction, type: "TOKEN" })
  }

  const cancel = async () => {
    onCancel()
    await loadListing()
  }

  const submitToken = async (password: string) => {
    // make sure we're in an appropriate state so that TS can destructure state object
    // cheap solution:
    if (state.type !== "TOKEN" && state.type !== "TOKEN_INVALID") {
      throw new Error(`Invalid State: ${state}`)
    }
    // more consistent solution:
    assertState(state, "TOKEN", "TOKEN_INVALID");

    setState({ type: "LOADING" })
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      onSuccess()
      setState({ type: "SUCCESS" })
      await loadListing()
    } catch (e: unknown) {
      setState({ ...state, type: "TOKEN_INVALID" })
    }
  }

  return {
    state,
    modifyDailyLimit,
    modifyMonthlyLimit,
    modifyVerificationMethod,
    applyDailyLimit,
    applyMonthlyLimit,
    applyVerificationMethod,
    resetToken,
    cancel,
    submitToken,
  }
}

interface ChangeLimitsProcessProps {
  onSuccess: () => void
  onCancel: () => void
}

export const ChangeLimitsProcess: React.FC<ChangeLimitsProcessProps> = (props) => {
  const { onSuccess, onCancel } = props

  const {
    state,
    modifyDailyLimit, modifyMonthlyLimit, modifyVerificationMethod,
    applyDailyLimit, applyMonthlyLimit, applyVerificationMethod,
    cancel, resetToken, submitToken,
  } = useChangeLimits(props)

  switch (state.type) {
    case "LOADING":
      return <Loader />

    case "LISTING":
      return <ChangeLimitsListingView
        settings={state.settings}
        onChangeDailyLimit={modifyDailyLimit}
        onChangeMonthlyLimit={modifyMonthlyLimit}
        onChangeVerificationMethod={modifyVerificationMethod}
      />

    case "DAILY_AMOUNT_FORM":
      return <ChangeLimitsAmountFormView
        limitType="DAILY"
        settings={state.settings}
        onApply={applyDailyLimit}
        onCancel={cancel}
      />

    case "MONTHLY_AMOUNT_FORM":
      return <ChangeLimitsAmountFormView
        limitType="MONTHLY"
        settings={state.settings}
        onApply={applyMonthlyLimit}
        onCancel={cancel}
      />

    case "VERIFICATION_METHOD_FORM":
      return <ChangeLimitsVerificationMethodFormView
        settings={state.settings}
        onApply={applyVerificationMethod}
        onCancel={cancel}
      />

    case "TOKEN":
      return <ChangeLimitsTokenView
        settings={state.settings}
        onSubmit={submitToken}
        onReset={resetToken}
        onCancel={cancel}
        instruction={state.instruction}
        error={false}
      />

    case "TOKEN_INVALID":
      return <ChangeLimitsTokenView
        settings={state.settings}
        onSubmit={submitToken}
        onReset={resetToken}
        onCancel={cancel}
        instruction={state.instruction}
        error={true}
      />

    case "SUCCESS":
      return null

    default:
      const leftover: never = state
      return null
  }
}
