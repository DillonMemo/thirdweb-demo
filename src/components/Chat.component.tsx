import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ChatStateType } from '@/recoil/chat/type'
import { accountState } from '@/recoil/account'
import { chatState } from '@/recoil/chat'
import dayjs from 'dayjs'
import { db } from '@/config/firebase'
import { every } from 'lodash'
import { useTranslations } from 'next-intl'

export default function Chat() {
  const translate = useTranslations()
  const [chats, setChats] = useRecoilState(chatState)
  const account = useRecoilValue(accountState)

  const onKeydownAddChat = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      try {
        const { keyCode, key, target } = e
        if (keyCode === 13 && key === 'Enter' && target instanceof HTMLInputElement) {
          const value = target.value
          target.value = ''
          await addDoc(collection(db, 'chats'), {
            nickname: (account.nickname || '***').trim(),
            message: value,
            timestamp: dayjs().toDate(),
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        const chatRef = document.querySelector('#chat-ref')
        chatRef instanceof HTMLDivElement && (chatRef.scrollTop = chatRef.scrollHeight)
      }
    },
    [account]
  )

  const onClickAddChat = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault()
        const inputNode = document.querySelector('#chat')
        if (inputNode instanceof HTMLInputElement && inputNode.value) {
          const value = inputNode.value
          inputNode.value = ''
          await addDoc(collection(db, 'chats'), {
            nickname: (account.nickname || '***').trim(),
            message: value,
            timestamp: dayjs().toDate(),
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        const chatRef = document.querySelector('#chat-ref')
        chatRef instanceof HTMLDivElement && (chatRef.scrollTop = chatRef.scrollHeight)
      }
    },
    [account]
  )

  useEffect(
    /**
     * @description 채팅 데이터 실시간 수신 대기
     */
    () => {
      const collectionRef = query(collection(db, 'chats'), orderBy('timestamp', 'asc'))
      const unsubscribe = onSnapshot(
        collectionRef,
        { includeMetadataChanges: true },
        (querySnapshot) => {
          const itemsArr: ChatStateType[] = []
          querySnapshot.forEach((doc) => {
            itemsArr.push({ ...(doc.data() as ChatStateType), id: doc.id })
          })

          setChats(itemsArr)
        }
      )

      return () => unsubscribe()
    },
    []
  )

  useEffect(
    /**
     * @description 계정이 연결중인 상태일때 채팅 스크롤 맨밑으로 이동
     */
    () => {
      if (account.connectionStatus === 'connected') {
        const chatRef = document.querySelector('#chat-ref')
        chatRef instanceof HTMLDivElement && (chatRef.scrollTop = chatRef.scrollHeight)
      }
    },
    [account.connectionStatus]
  )

  if (account.connectionStatus === 'connecting')
    return (
      <div className="mt-4 block h-[30rem] w-full animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
        <div className="flex h-full w-full flex-1 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    )
  if (!every([account.nickname, account.wallet]))
    return (
      <div className="mt-4 block h-[30rem] w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200 px-3 py-2 dark:bg-gray-700">
          {translate('need_signin')}
        </div>
      </div>
    )

  return (
    <div className="mt-4 flex h-[30rem] w-full flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
      <div
        id="chat-ref"
        className="scrollbar-hidden flex w-full flex-1 flex-col flex-nowrap gap-3 overflow-y-auto rounded-lg rounded-b-none">
        {chats.map((chat, index) => (
          <div
            key={`chat-${index}`}
            className="flex w-full flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-2 dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {chat.nickname.slice(0, chat.nickname.length / 2) + '***'}
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {chat.timestamp && dayjs(chat.timestamp.toMillis()).format('hh:mm A')}
              </span>
            </div>
            <p className="pb-1 pt-2 text-sm font-normal text-gray-900 dark:text-white">
              {chat.message}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full rounded-lg bg-gray-200 px-3 py-2 dark:bg-gray-700">
        <div className="flex items-center ">
          <input
            type="text"
            id="chat"
            placeholder="Your Message"
            className="mr-4 block w-full resize-none rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            onKeyDown={onKeydownAddChat}
          />
          <button
            type="submit"
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={onClickAddChat}>
            <svg
              className="h-5 w-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20">
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  )
}
