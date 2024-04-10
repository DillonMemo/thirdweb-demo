import { useActiveWallet, useActiveWalletConnectionStatus } from 'thirdweb/react'
import { ThirdwebClient } from 'thirdweb'
import { accountState } from '@/recoil/account'
import { getUserEmail } from 'thirdweb/wallets/embedded'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

interface HookProps {
  client: ThirdwebClient
}
export default function useSetAccount({ client }: HookProps) {
  const setAccount = useSetRecoilState(accountState)
  const connectionStatus = useActiveWalletConnectionStatus()
  const activeWallet = useActiveWallet()

  useEffect(() => {
    if (activeWallet) {
      setAccount((prev) => ({ ...prev, wallet: activeWallet }))
    }
  }, [activeWallet])

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      const controller = new AbortController()

      const fetch = async () => {
        try {
          const getEmail = async () => await getUserEmail({ client })
          const email = await getEmail()
          setAccount((prev) => ({
            ...prev,
            ...(email && { email: email, nickname: email.split('@')[0] }),
          }))
        } catch (error: any) {
          error.name === 'AbortError'
            ? console.error('Fetch aborted')
            : console.error('Fetch error:', error)
        }
      }

      fetch()

      return () => controller.abort()
    }
  }, [connectionStatus])
}
