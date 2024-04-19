'use client'

import { useTranslations } from 'next-intl'

export default function Slider() {
  const translate = useTranslations()

  console.warn('lang', translate('test'))

  return (
    <div className="grid grid-cols-[20rem_minmax(20rem,_1fr)_20rem] gap-5 md:grid-cols-1 md:gap-4">
      {/** @note Skeleton */}
      <aside className="block w-full md:order-2">
        <div
          role="status"
          className="sticky top-0 flex w-full animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mt-6 flex w-full">
            <div className="h-40 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 flex w-full">
            <div className="h-16 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </aside>

      <div className="block w-full md:order-1">
        <div
          role="status"
          className="flex w-full animate-pulse flex-col items-center space-y-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-6 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
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
          className="sticky top-0 flex w-full animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </aside>
    </div>
  )
}
