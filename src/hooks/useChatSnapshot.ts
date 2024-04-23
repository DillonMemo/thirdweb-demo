import { collection, onSnapshot } from 'firebase/firestore'
import { ChatStateType } from '@/recoil/chat/type'
import { chatState } from '@/recoil/chat'
import { db } from '@/config/firebase'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function useChatSnapshot() {
  const setChats = useSetRecoilState(chatState)

  const snap = onSnapshot(
    collection(db, 'chats'),
    { includeMetadataChanges: true },
    (querySnapshot) => {
      const list: ChatStateType[] = []
      querySnapshot.docChanges().forEach(function (change) {
        let data = change.doc.data() as ChatStateType
        data = { ...data, id: change.doc.id }
        list.push(data)
      })
      setChats(list)
    }
  )
  return () => snap()
}
