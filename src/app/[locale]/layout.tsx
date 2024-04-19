import './globals.css'
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
  const initTheme = () => {
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }
  return (
    <html lang={locale} className={`${myFont.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(${initTheme})();` }} />
      </head>
      <body className="bg-white dark:bg-[#0d1426]">
        <RootProvider locale={locale}>
          <Navigation />

          <main className="main md:px-4">{children}</main>
        </RootProvider>
      </body>
    </html>
  )
}
