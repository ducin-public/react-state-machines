# React State Machines

Implement the device authorization process using state machines.

## setup

- mock API
  - based on [`msw`](https://mswjs.io/)
  - setup in `index.tsx` (for app, see `mockTokenAPI()`) and in each story (for storybook, *msw addon*)
  - HTTP calls defined in `api/token.mock.ts` and `api/limit.mock.ts`
  - for clarity, 4-character tokens are considered valid, and all the rest is invalid
- real HTTP API
  - in case of real HTTP, you might need to use [`itcorpo-api`](https://github.com/ducin-public/itcorpo-api) (`git clone`, `npm i`, `npm start`)
- `jest` tests
  - in case of trouble, run `npm run jest:cache` to clear local `jest` cache, that might help

## "Authorize Device" process

The entire process has 2 callbacks: `onSuccess` and `onLogout`. They're called, when the process finishes successfully or is interrupted, respectively.

1. first, _choose the method_ of authorizing the device (choose method view displayed)
    - if _log out_ chosen, then process finishes and calls `onLogout`
    - if _allow device once_ chosen, proceed with "allow device" branch
    - if _save device as trusted_ chosen, proceed with "add to trusted" branch
2. allow device
    - `HTTP POST /banking/token` request sent
    - when response received, allow once token view displayed and the user is asked to enter sms code
    - when cancelling, go back to the first screen (choose method view)
    - when submitting a token, `HTTP POST /banking/token/:tokenId` request is sent
        - invalid token submitted -> display the form again with input error (`TextField.error:boolean` prop)
        - valid token submitted -> finish the process and call `onSuccess`
3. add to trusted
    - display the "add device form" view, ask for device name, the user needs to claim ownership
    - `HTTP POST /banking/token` request sent
    - when response received, add device token view displayed and the user is asked to enter sms code
    - when cancelling, go back to the first screen (choose method view)
    - when resetting token, send the `HTTP POST /banking/token` request once again
    - when submitting a token, `HTTP POST /banking/token/:tokenId` request is sent
        - invalid token submitted -> display the form again with input error (`TextField.error:boolean` prop)
        - valid token submitted -> finish the process and call, proceed to "add device confirmation" view
    - display "add device confirmation" view, request the user to click the confirmation button

## "Change Limits" process

The entire process has 2 callbacks: `onSuccess` and `onCancel`. They're called, when the process finishes successfully or is interrupted, respectively.

1. First, the _Limits Listing_ view is displayed, along with current values
   - the user may choose to change the daily limit, the monthly limit, or payment verification method
2. Changing daily or montly expenses limit
   - the user is asked to define the new limit (daily or monthly, depending on what was clicked)
   - `HTTP POST /banking/limits` request sent
   - the response is used to display the new limits settings and the user is asked to enter sms code
   - when cancelling, go back to the first screen (limits listing view)
   - when resetting token, send the `HTTP POST /banking/token` request once again
   - when submitting a token, `HTTP POST /banking/token/:tokenId` request is sent
        - invalid token submitted -> display the form again with input error (`TextField.error:boolean` prop)
        - valid token submitted -> finish the process and call, go back to "limits listing" view
3. Changing payment verification method
   - all steps are same as in changing expenses limits with the only difference: changing "verification method" instead of "expenses limit"

