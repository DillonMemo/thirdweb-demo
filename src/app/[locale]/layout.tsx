import './globals.css'
import { LocaleType } from '@/i18n'
import type { Metadata } from 'next'
import RootProvider from '@/lib'
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard-std',
})

export const metadata: Metadata = {
  title: 'Miracle Demo',
  description: 'ThirdWeb Demo',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: LocaleType }
}>) {
  return (
    <html lang={locale} className={`${myFont.variable}`}>
      <body>
        <RootProvider locale={locale}>{children}</RootProvider>
      </body>
    </html>
  )
}
