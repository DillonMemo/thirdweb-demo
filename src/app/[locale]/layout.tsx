import './globals.css'
import Header from '@/components/header'
import { LocaleType } from '@/i18n'
import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import RootProvider from '@/lib'
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard-std',
})

export const metadata: Metadata = {
  title: 'Estack Demo',
  description: 'This Estack rendering page',
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
        <RootProvider locale={locale}>
          {/* <Header /> */}
          <Navigation />

          {children}
        </RootProvider>
      </body>
    </html>
  )
}
