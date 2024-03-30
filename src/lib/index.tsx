import { NextIntlClientProvider, useMessages } from 'next-intl'
import { LocaleType } from '@/i18n'
import RecoilProvider from './recoil.provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import StyledComponentsRegistry from './styledComponent.provider'
import ThirdProvider from './Thirdweb.provider'

export default function RootProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: LocaleType
}) {
  const messages = useMessages()
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThirdProvider locale={locale}>
        <RecoilProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </RecoilProvider>
      </ThirdProvider>
      <SpeedInsights />
    </NextIntlClientProvider>
  )
}
