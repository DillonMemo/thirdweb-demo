'use client'

import { useTranslations } from 'next-intl'

export default function Slider() {
  const translate = useTranslations()

  console.warn('lang', translate('test'))

  return (
    <section className="px-4 pt-5">
      {/** @note Skeleton */}
      <div className="block max-w-xs rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div role="status" className="animate-pulse">
          <div className="flex w-full items-center">
            <div className="dark:gray-700 h-4 w-full rounded bg-gray-400"></div>
          </div>
          <div className="mt-6 flex w-full">
            <div className="dark:gray-700 h-40 w-full rounded bg-gray-400"></div>
          </div>
          <div className="mt-3 flex w-full">
            <div className="dark:gray-700 h-16 w-full rounded bg-gray-400"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
