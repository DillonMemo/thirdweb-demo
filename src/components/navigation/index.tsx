'use client'

import 'react-toastify/dist/ReactToastify.css'
// import CustomConnectWallet from '../CustomConnectWallet.component'
import CustomConnectWallet from '../CustomConnectWallet.component'
import Image from 'next/image'
import Language from '../../../public/svgs/Language'
import Link from 'next/link'
import { LocaleType } from '@/i18n'
import Logo from '../../../public/images/logo.png'
import { Navigate } from './styles'
import NavigationButton from '../NavigationButton.component'
import { ToastContainer } from 'react-toastify'
import { createThirdwebClient } from 'thirdweb'
import { useCallback } from 'react'
import { useLocale } from 'next-intl'
import useSetAccount from '@/hooks/useSetAccount'

export default function Navigation() {
  const locale = useLocale() as LocaleType
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || '',
  })

  useSetAccount({ client })

  const onToggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = document.querySelector('.hamburger')
    const menu = document.querySelector('.nav-menu')

    if (target instanceof HTMLDivElement && menu instanceof HTMLDivElement) {
      if (target.classList.contains('is-opened')) {
        target.classList.remove('is-opened')
        menu.classList.remove('show-menu')
      } else {
        target.classList.add('is-opened')
        menu.classList.add('show-menu')
      }
    }
  }, [])

  return (
    <Navigate>
      <nav className="nav container">
        <div className="nav-logo">
          <Link href={'/'} locale={locale} className="logo">
            <Image src={Logo} alt="logo-image" width={150} />
          </Link>
        </div>

        <div className="nav-menu">
          <div className="nav-mobile-profile">
            <div className="nav-mobile-header">header container</div>
            <div>
              <CustomConnectWallet
                client={client}
                locale={locale}
                connectButton={{ className: 'connect-wallet-button' }}
                detailsButton={{ className: 'detail-wallet-button' }}
              />
            </div>
            <div>register</div>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Home
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Matches
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Tournaments
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Teams
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Watchlist
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Leaderboards
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton fontWeight={300} color="var(--text-color)">
                  Rewards
                </NavigationButton>
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-pc-profile">
          <div className="translate-wrap">
            <Language width="1rem" height="1rem" />
            <span>{locale === 'ja' ? '日本語' : 'English'}</span>
          </div>
          <div className="profile-wrap">
            <CustomConnectWallet
              client={client}
              locale={locale}
              connectButton={{ className: 'connect-wallet-button' }}
              detailsButton={{ className: 'detail-wallet-button' }}
            />
          </div>
        </div>
        <div className="nav-toggle hamburger" onClick={onToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <ToastContainer position="top-right" autoClose={3000} bodyClassName={'toastify-body'} />
    </Navigate>
  )
}
