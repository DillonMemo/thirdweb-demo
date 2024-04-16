'use client'

import { useTranslations } from 'next-intl'

export default function Slider() {
  const translate = useTranslations()

  console.warn('lang', translate('test'))

  return (
    <section className="pt-5">
      {/** @note Skeleton */}
      <div className="block max-w-xs rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <div role="status" className="animate-pulse space-y-8">
          <div className="flex w-full items-center">
            <div className="dark:gray-700 h-2.5 w-full rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
