import { AccountStateType } from './type'
import { atom } from 'recoil'

export const accountState = atom<AccountStateType>({
  key: 'account',
  default: {
    connectionStatus: 'disconnected',
    email: undefined,
    nickname: undefined,
    wallet: undefined,
  },
})
