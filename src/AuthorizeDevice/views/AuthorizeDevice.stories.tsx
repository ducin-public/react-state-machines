import React from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from '.'

export default {
  title: 'Authorize Device/Views',
  argTypes: {
    addDeviceToTrusted: { action: 'addDeviceToTrusted' },
    allowDeviceOnce: { action: 'allowDeviceOnce' },
  }
} as Meta;

export const ChooseMethod = () =>
  <AuthorizeDeviceChooseMethodView
    onAddDeviceToTrusted={action('addDeviceToTrusted')}
    onAllowDeviceOnce={action('onAllowDeviceOnce')}
    onLogout={action('onLogout')}
  />

export const AddDeviceForm = () =>
  <AuthorizeDeviceAddDeviceFormView
    onSubmit={action('submit')}
  />

export const AllowOnceToken = () =>
  <AuthorizeDeviceAllowOnceTokenView
    instruction="Wpisz hasło SMS"
    onSubmit={action('submit')}
    onCancel={action('cancel')}
    error={false}
  />

export const AddDeviceToken = () =>
  <AuthorizeDeviceAddDeviceTokenView
    deviceName="Mój maczek"
    instruction="Wpisz hasło SMS"
    onSubmit={action('submit')}
    onReset={action('reset')}
    onCancel={action('cancel')}
    error={false}
  />

export const AddDeviceConfirmation = () =>
  <AuthorizeDeviceAddDeviceConfirmationView
    deviceName="Mój maczek"
    onClose={action('close')}
  />
