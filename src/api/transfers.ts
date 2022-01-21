import axios from 'axios'
import { API_URL } from "./config"
import { Money } from './types'

export interface Transfer {
  id: string;
  amount: Money;
  title: string;
  payerAccount: string;
  beneficiaryAccount: string;
  beneficiaryAddress: string;
  scheduledAt: string;
}

export const getTransfers = async () => {
  const response = await axios.get<Transfer[]>(`${API_URL}/account/transfers`)
  return response.data
}
