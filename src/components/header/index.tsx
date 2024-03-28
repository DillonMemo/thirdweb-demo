'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useCallback, useEffect } from 'react'
import { useConnectionStatus, useWalletContext } from '@thirdweb-dev/react'
import styled from 'styled-components'
import { throttle } from 'lodash'

export default function Header() {
  const connectionStatus = useConnectionStatus()
  const { isAutoConnecting } = useWalletContext()
  console.log('connect status', connectionStatus, isAutoConnecting)

  const onConnect = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      toast('🦄 Wow so easy!', {
        position: 'top-right',
        transition: Bounce,
      })
    } catch (error) {
      toast.error('failed to connect')
      console.error('%c failed to connect', error)
    }
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
      <div>
        <button onClick={onConnect}>START</button>
      </div>
      <ToastContainer position="top-left" autoClose={3000} />
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

  h1 {
  }
`
