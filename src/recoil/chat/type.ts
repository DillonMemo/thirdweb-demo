import { Timestamp } from 'firebase/firestore'

export type ChatStateType = {
  id: string
  timestamp?: Timestamp
  nickname: string
  message: string
}
