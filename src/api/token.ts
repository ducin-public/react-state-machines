import axios from 'axios';
import { API_URL } from './config';

export interface TokenInstruction {
  instruction: string
  tokenId: string
}

export const getTokenInstruction = async () => {
  const response = await axios.post<TokenInstruction>(`${API_URL}/banking/token`)
  return response.data
}

export interface TokenConfirmation {
  tokenId: string
  tokenCode: string
}

export const sendTokenCode = async (params: TokenConfirmation) => {
  const response = await axios.post<void>(`${API_URL}/banking/token/${params.tokenId}`, params)
  return response.data
}
