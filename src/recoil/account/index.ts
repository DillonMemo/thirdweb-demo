import { AccountStateType } from './type'
import { atom } from 'recoil'

export const accountState = atom<AccountStateType>({
  key: 'account',
  default: {
    connectionStatus: 'disconnected',
    userSeq: undefined,
    email: undefined,
    nickName: undefined,
    profileUrl: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    wallet: undefined,
  },
})
