'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import {
  ConnectWallet,
  WalletInstance,
  useConnectionStatus,
  useWalletContext,
} from '@thirdweb-dev/react'
import { HeaderWrap } from './styles'
import { useCallback } from 'react'

export default function Header() {
  const connectionStatus = useConnectionStatus()
  const { isAutoConnecting } = useWalletContext()

  // eslint-disable-next-line no-console
  console.log('connect status', connectionStatus, isAutoConnecting)

  const onConnect = useCallback((wallet: WalletInstance) => {
    // eslint-disable-next-line no-console
    console.log(wallet)
    toast.success('Successed connect to wallet', {
      transition: Bounce,
    })
  }, [])

  return (
    <HeaderWrap className="header">
      <div className="right">
        <ConnectWallet
          className="connect-wallet-button"
          modalSize="wide"
          btnTitle="Login"
          modalTitle="Sample Modal"
          modalTitleIconUrl="https://polygon.miracleplay.gg/static/media/miracle-wallet-logo.fc4f85e929ed4f42ffba971f031e0c0b.svg"
          welcomeScreen={{
            title: 'welcome title',
            subtitle: 'welcom sub title',
          }}
          onConnect={onConnect}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} bodyClassName={'toastify-body'} />
    </HeaderWrap>
  )
}
