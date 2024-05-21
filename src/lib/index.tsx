import { NextIntlClientProvider, useMessages } from 'next-intl'
import ApolloProvider from './apollo.provider'
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
      <ApolloProvider>
        <ThirdProvider>
          <RecoilProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </RecoilProvider>
        </ThirdProvider>
        <SpeedInsights />
      </ApolloProvider>
    </NextIntlClientProvider>
  )
}
