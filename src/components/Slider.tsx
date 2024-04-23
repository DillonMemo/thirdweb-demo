'use client'

import { chatState } from '@/recoil/chat'
import { useRecoilState } from 'recoil'
// import { useTranslations } from 'next-intl'

export default function Slider() {
  const [chats, setChats] = useRecoilState(chatState)
  // const translate = useTranslations()

  // const snap = onSnapshot(
  //   collection(db, 'chats'),
  //   { includeMetadataChanges: true },
  //   (querySnapshot) => {
  //     const list: ChatStateType[] = []
  //     querySnapshot.docChanges().forEach(function (change) {
  //       let data = change.doc.data() as ChatStateType
  //       data = { ...data, id: change.doc.id }
  //       list.push(data)
  //     })
  //     setChats(list)
  //   }
  // )

  // console.warn('lang', translate('test'))
  // const result = useChatSnapshot()
  console.log('✅', chats)
  return (
    <div className="grid grid-cols-[20rem_minmax(20rem,_1fr)_20rem] gap-5 md:grid-cols-1 md:gap-4">
      {/** @note Skeleton */}
      <aside className="sticky top-0 block h-screen w-full md:order-2">
        <div
          role="status"
          className="flex w-full animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mt-6 flex w-full">
            <div className="h-40 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 flex w-full">
            <div className="h-16 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        <div className="mt-4 flex h-96 w-full flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
          <div className="w-full  flex-1 overflow-y-auto rounded-lg rounded-b-none bg-gray-200 p-3 dark:bg-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eius sequi, accusantium
            quod excepturi beatae architecto et facere voluptate repellendus ut corrupti animi fugit
            laudantium? Ad soluta illo debitis? Obcaecati?
          </div>
          <form
            action=""
            method=""
            className="rounded-lg rounded-t-none bg-gray-200 px-3 py-2 dark:bg-gray-700">
            <label htmlFor="chat" className="sr-only">
              Your Message
            </label>
            <div className="flex items-center ">
              <textarea
                id="chat"
                cols={30}
                rows={1}
                className="mr-4 block w-full resize-none rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"></textarea>
              <button
                type="submit"
                className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
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
          </form>
        </div>
      </aside>

      <div className="block w-full md:order-1">
        <div
          role="status"
          className="flex w-full animate-pulse flex-col items-center space-y-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-6 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
          <div className="flex w-full items-center justify-between">
            <div>
              <div className="mb-2.5 h-2.5 w-36 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-52 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          </div>

          {Array(30)
            .fill(undefined)
            .map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex w-full items-center justify-between pt-4">
                <div>
                  <div className="mb-2.5 h-2.5 w-36 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2 w-52 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
            ))}
        </div>
      </div>

      <aside className="block w-full md:order-3">
        <div
          role="status"
          className="sticky top-0 flex w-full animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </aside>
    </div>
  )
}
