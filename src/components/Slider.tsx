'use client'

import Chat from './Chat.component'
import Series from './Series.component'

export default function Slider() {
  return (
    <div className="grid grid-cols-[20rem_minmax(20rem,_1fr)_20rem] gap-5 md:grid-cols-1 md:gap-4">
      {/** @note Skeleton */}
      <aside
        role="status"
        className="sticky top-0 block h-screen w-full md:relative md:top-auto md:order-2 md:h-auto">
        <div className="flex w-full animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mt-6 flex w-full">
            <div className="h-40 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 flex w-full">
            <div className="h-16 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        <Chat />
      </aside>

      <div role="status" className="block w-full md:order-1">
        <Series />
      </div>

      <aside
        role="status"
        className="sticky top-0 block h-screen w-full md:relative md:top-auto md:order-3 md:h-auto">
        <div className=" flex w-full animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </aside>
    </div>
  )
}
