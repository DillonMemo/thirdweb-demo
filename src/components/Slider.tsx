'use client'

import { useTranslations } from 'next-intl'

export default function Slider() {
  const translate = useTranslations()

  console.warn('lang', translate('test'))

  return (
    <section>
      <h1>Hello Slider</h1>
    </section>
  )
}
