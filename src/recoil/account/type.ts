import { Wallet } from 'thirdweb/wallets'

export type AccountStateType = {
  email?: string
  nickname?: string
  wallet?: Wallet
}
