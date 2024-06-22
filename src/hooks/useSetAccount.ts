import { useActiveWallet, useActiveWalletConnectionStatus, useDisconnect } from 'thirdweb/react'
import { AccountStateType } from '@/recoil/account/type'
import AuthService from '@/service/auth/auth.service'
import { ThirdwebClient } from 'thirdweb'
import { accountState } from '@/recoil/account'
import { createHmac } from 'crypto'
import { getUserEmail } from 'thirdweb/wallets/embedded'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'

interface HookProps {
  client: ThirdwebClient
}

export default function useSetAccount({ client }: HookProps) {
  const setAccount = useSetRecoilState(accountState)
  // disconnected: 연결 안됨 | connecting : 연결중 | connected: 연결완료 (로그인 완료)
  const connectionStatus = useActiveWalletConnectionStatus()
  const activeWallet = useActiveWallet()
  const { disconnect } = useDisconnect()

  const { mutate: signIn } = useMutation({
    mutationFn: (props: { walletAddress: string; verifyValue: string }) =>
      AuthService.signIn(props.walletAddress, props.verifyValue),
    onError:
      /** @todo 실패시 account정보과 서드웹SDK의 로그인 상태를 로그아웃으로 변경 해야함. */
      () => {
        console.error('[Error] Sign in')
        activeWallet && disconnect(activeWallet)
      },
    onSuccess: (response) => {
      setAccount((prev) => ({
        ...prev,
        ...response,
      }))
    },
  })

  useEffect(() => {
    if (connectionStatus === 'connected' && activeWallet) {
      const controller = new AbortController()

      const fetch = async () => {
        try {
          const getEmail = async () => await getUserEmail({ client })
          const email = await getEmail()
          const address = activeWallet.getAccount()?.address

          if (!email) throw new SyntaxError('not found email')
          if (!address) throw new SyntaxError('not found address')

          const hash = createHmac('sha256', process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY || '')
            .update(email)
            .digest('hex')

          signIn({ walletAddress: address, verifyValue: hash })

          setAccount((prev) => ({
            ...prev,
            ...(email && { email }),
            wallet: activeWallet,
            connectionStatus,
          }))
        } catch (error: any) {
          error.name === 'AbortError'
            ? console.error('Fetch aborted')
            : console.error('Fetch error:', error)
        }
      }

      fetch()

      return () => controller.abort()
    } else if (connectionStatus === 'disconnected') {
      // Clear
      const initialize: AccountStateType = {
        connectionStatus,
        userSeq: undefined,
        email: undefined,
        nickName: undefined,
        profileUrl: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        wallet: undefined,
      }
      setAccount(initialize)
    } else {
      setAccount((prev) => ({
        ...prev,
        connectionStatus,
      }))

      return () => {}
    }
  }, [connectionStatus, activeWallet])
}

export const accountRefresh = async (
  account: AccountStateType,
  message: {
    token_expired: string
    token_refresh: string
  }
) => {
  try {
    if (account.refreshToken) {
      const { accessToken, refreshToken } = await AuthService.refreshToken(account.refreshToken)
      if (accessToken) {
        toast.info(message.token_refresh)
        return { accessToken, refreshToken }
      } else {
        throw new SyntaxError()
      }
    } else {
      throw new SyntaxError()
    }
  } catch (error) {
    toast.error(message.token_expired)
    account.wallet && account.wallet.disconnect()
    return false
  }
}
