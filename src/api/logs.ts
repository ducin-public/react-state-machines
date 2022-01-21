import axios from 'axios';

import { API_URL } from './config';

export type LogLevel = "INFO" | "DEBUG" | "ERROR" | "WARN";

export const sendLog = async (level: LogLevel, content: string, data: any) => {
  const response = await axios.post<void>(`${API_URL}/logs`, { level, content, /* data*/ account: "ACCOUNT" })
  return response.data
}
