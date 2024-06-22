import { ConnectionStatus, Wallet } from 'thirdweb/wallets'
import { SignInResponse } from '@/service/auth/auth.service'

export type AccountStateType = {
  connectionStatus: ConnectionStatus
  email?: string
  wallet?: Wallet
} & Partial<SignInResponse>
