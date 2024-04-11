'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'
import CustomConnectWallet from '../CustomConnectWallet.component'
import Image from 'next/image'
import Language from '../../../public/svgs/Language'
import Link from 'next/link'
import { LocaleType } from '@/i18n'
import Logo from '../../../public/images/logo.png'
import { Navigate } from './styles'
import NavigationButton from '../NavigationButton.component'
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

  const onLogoClick = useCallback(() => {
    const close = document.querySelector('.hamburger.is-opened')
    close instanceof HTMLDivElement && close.click()
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
            <div className="nav-mobile-header">
              <div className="nav-logo">
                <Link href={'/'} locale={locale} className="logo" onClick={onLogoClick}>
                  <Image src={Logo} alt="logo-image" width={150} />
                </Link>
              </div>
              <div className="close"></div>
            </div>
            <div className="nav-mobile-account">
              <CustomConnectWallet
                client={client}
                locale={locale}
                connectButton={{ className: 'connect-wallet-button' }}
                detailsButton={{ className: 'detail-wallet-button' }}
              />
            </div>
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
          <div className="nav-mobile-services">
            <div className="translate-mobile-wrap">
              <Language width="1.5rem" height="1.5rem" />
              <span>{locale === 'ja' ? '日本語' : 'English'}</span>
            </div>
          </div>
        </div>

        <div className="nav-pc-profile">
          <div className="translate-pc-wrap">
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        bodyClassName={'toastify-body'}
        transition={Bounce}
      />
    </Navigate>
  )
}
