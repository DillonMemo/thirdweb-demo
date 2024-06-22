import { Timestamp } from 'firebase/firestore'

export type ChatStateType = {
  id: string
  timestamp?: Timestamp
  nickName: string
  message: string
}
