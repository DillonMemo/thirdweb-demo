'use client'

import { ThirdwebProvider } from 'thirdweb/react'

export default function ThirdProvider({ children }: { children: React.ReactNode }) {
  return <ThirdwebProvider key={'third-provider-v5'}>{children}</ThirdwebProvider>
}
