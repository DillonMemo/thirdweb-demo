'use client'

import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  en,
  metamaskWallet,
  rainbowWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import { LocaleType } from '@/i18n'

export default function ThirdProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: LocaleType
}) {
  const thirdLocale = locale === 'ko' ? en() : en()
  return (
    <ThirdwebProvider
      activeChain={'ethereum'}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || ''}
      locale={thirdLocale}
      supportedWallets={[
        embeddedWallet({ recommended: true }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        rainbowWallet(),
      ]}>
      {children}
    </ThirdwebProvider>
  )
}
