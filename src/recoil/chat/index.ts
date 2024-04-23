import { ChatStateType } from './type'
import { atom } from 'recoil'

export const chatState = atom<ChatStateType[]>({
  key: 'chatState',
  default: [],
})
