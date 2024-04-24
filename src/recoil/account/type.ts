import { ConnectionStatus, Wallet } from 'thirdweb/wallets'

export type AccountStateType = {
  connectionStatus: ConnectionStatus
  email?: string
  nickname?: string
  wallet?: Wallet
}
