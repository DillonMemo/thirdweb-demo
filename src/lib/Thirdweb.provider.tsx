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
  // miracle
  // 885bb1b67b54dfabfd55159c13b2e753
  // private1
  // 843cd941d7dd2a2650e7f718a003a524
  return (
    <ThirdwebProvider
      activeChain={'ethereum'}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || ''}
      locale={thirdLocale}
      supportedWallets={[
        embeddedWallet(),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        rainbowWallet(),
      ]}>
      {children}
    </ThirdwebProvider>
  )
}
