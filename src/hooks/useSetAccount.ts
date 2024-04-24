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
  // disconnected: 연결 안됨 | connecting : 연결중 | connected: 연결완료 (로그인 완료)
  const connectionStatus = useActiveWalletConnectionStatus()
  const activeWallet = useActiveWallet()

  useEffect(() => {
    if (activeWallet) {
      setAccount((prev) => ({ ...prev, wallet: activeWallet }))
    }
  }, [activeWallet])

  // useEffect(() => {

  // if (connectionStatus === 'disconnected') {
  // const controller = new AbortController()

  // const fetch = async () => {
  //   try {
  //     const getEmail = async () => await getUserEmail({ client })
  //     const email = await getEmail()
  //     setAccount((prev) => ({
  //       ...prev,
  //       ...(email && { email: email, nickname: email.split('@')[0] }),
  //     }))
  //   } catch (error: any) {
  //     error.name === 'AbortError'
  //       ? console.error('Fetch aborted')
  //       : console.error('Fetch error:', error)
  //   }
  // }

  // fetch()

  // return () => controller.abort()
  //   console.log('effect disconnected')
  // } else if (connectionStatus === 'connecting') {
  //   console.log('effect connecting')
  // } else if (connectionStatus === 'connected') {
  //   console.log('effect connected')
  // }
  // }, [connectionStatus])

  useEffect(() => {
    if (connectionStatus === 'connected') {
      const controller = new AbortController()

      const fetch = async () => {
        try {
          const getEmail = async () => await getUserEmail({ client })
          const email = await getEmail()
          setAccount((prev) => ({
            ...prev,
            connectionStatus,
            ...(email && { email, nickname: email.split('@')[0] }),
          }))
        } catch (error: any) {
          error.name === 'AbortError'
            ? console.error('Fetch aborted')
            : console.error('Fetch error:', error)
        }
      }

      fetch()

      return () => controller.abort()
      // const parse = JSON.parse(connectedAccount)
      // setAccount((prev) => ({ ...prev, connectionStatus, ...parse }))
    } else {
      setAccount((prev) => ({
        ...prev,
        connectionStatus,
        email: undefined,
        nickname: undefined,
        wallet: undefined,
      }))

      return () => {}
    }
  }, [connectionStatus])
}
