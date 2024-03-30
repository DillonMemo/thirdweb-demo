'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import {
  ConnectWallet,
  WalletInstance,
  useConnectionStatus,
  useWalletContext,
} from '@thirdweb-dev/react'
import { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { throttle } from 'lodash'

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
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('header')
      if (!(header instanceof HTMLElement)) return
      const currentScrollTop = window.scrollY

      if (currentScrollTop > 0) {
        !header.classList.contains('shrink') && header.classList.add('shrink')
      } else {
        header.classList.contains('shrink') && header.classList.remove('shrink')
      }
    }

    const throttleOnScroll = throttle(onScroll, 300)
    window.addEventListener('scroll', throttleOnScroll)

    return () => window.removeEventListener('scroll', throttleOnScroll)
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

export const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  color: #fff;
  z-index: 1000;
  height: 6rem;
  line-height: 6rem;
  overflow: hidden;
  -webkit-transition: height 0.3s;
  -moz-transition: height 0.3s;
  transition: height 0.3s;
  text-align: center;

  &.shrink {
    height: 4rem;
    line-height: 4rem;
  }

  .right {
    height: 100%;
    padding: 0 1.5rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    .connect-wallet-button {
      font-size: 1rem;
      color: #ffffff;
      background-color: transparent;
      border: 2px solid #ffffff;

      width: fit-content;
      min-width: fit-content !important;
      height: 2.5rem;
      line-height: 1rem;
      padding: 0 1.5rem;

      transition: border-color 0.3s ease, color 0.3s ease !important;

      &.tw-connected-wallet {
        height: 2.75rem;
        img {
          width: 1.5rem !important;
          height: 1.5rem !important;
        }
        > div {
          gap: 0.1875rem !important;
          .tw-connected-wallet__address {
            font-size: 0.75rem;
          }
          .tw-connected-wallet__balance {
            font-size: 0.625rem;
            color: lightgray;
          }
        }
      }
      &:hover,
      &:focus {
        border-color: lightgray;
        color: lightgray;
      }
      svg {
        circle {
          stroke: #ffffff;
        }
      }
    }
  }
`
