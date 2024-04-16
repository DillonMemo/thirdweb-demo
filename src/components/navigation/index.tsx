'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'
import { useCallback, useEffect } from 'react'
import CustomConnectWallet from '../CustomConnectWallet.component'
import Image from 'next/image'
import Language from '../../../public/svgs/Language'
import Link from 'next/link'
import { LocaleType } from '@/i18n'
// import Logo from '../../../public/images/logo.png'
import { Navigate } from './styles'
import NavigationButton from '../NavigationButton.component'
import { createThirdwebClient } from 'thirdweb'
import { useLocale } from 'next-intl'
import useSetAccount from '@/hooks/useSetAccount'

const temp = {
  page1: 'TEST1',
  page2: 'TEST2',
  page3: 'TEST3',
  page4: 'TEST4',
  page5: 'TEST5',
  page6: 'TEST6',
  page7: 'TEST7',
}
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

  const onThemeToggle = useCallback(() => {
    console.log('theme toggle!!')
  }, [])

  useEffect(() => {
    /** {@link https://flowbite.com/docs/customize/dark-mode/} */
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

    console.log('1', localStorage.theme)
  }, [])

  return (
    <Navigate>
      <nav className="nav">
        <div className="nav-logo">
          <Link href={'/'} locale={locale} className="logo">
            {/** @example */}
            <Image
              src="https://marineinsurer.co.uk/wp-content/uploads/2020/05/logo-dummy.png"
              alt="logo-image"
              width={150}
              height={80}
              style={{ background: 'white' }}
            />
            {/* <Image src={Logo} alt="logo-image" width={150} /> */}
          </Link>
        </div>

        <div className="nav-menu">
          <div className="nav-mobile-profile">
            <div className="nav-mobile-header">
              <div className="nav-logo">
                <Link href={'/'} locale={locale} className="logo" onClick={onLogoClick}>
                  {/** @example */}
                  <Image
                    src="https://marineinsurer.co.uk/wp-content/uploads/2020/05/logo-dummy.png"
                    alt="logo-image"
                    width={150}
                    height={80}
                    style={{ background: 'white' }}
                  />
                  {/* <Image src={Logo} alt="logo-image" width={150} /> */}
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
                <NavigationButton>
                  {/* Home */}
                  {temp.page1}
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton>
                  {/* Matches */}
                  {temp.page2}
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton>
                  {/* Tournaments */}
                  {temp.page3}
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton>
                  {/* Teams */}
                  {temp.page4}
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton>
                  {/* Watchlist */}
                  {temp.page5}
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton>
                  {/* Leaderboards */}
                  {temp.page6}
                </NavigationButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <NavigationButton>
                  {/* Rewards */}
                  {temp.page7}
                </NavigationButton>
              </Link>
            </li>
          </ul>
          <div className="nav-mobile-services">
            <div className="translate-mobile-wrap text-gray-900 dark:text-white">
              <Language width="1.5rem" height="1.5rem" />
              <span>{locale === 'ja' ? '日本語' : 'English'}</span>
            </div>
          </div>
        </div>

        <div className="nav-pc-profile">
          <div className="translate-pc-wrap text-gray-900 dark:text-white">
            <Language width="1.25rem" height="1.25rem" />
            <span>{locale === 'ja' ? '日本語' : 'English'}</span>
          </div>
          <div>
            <button
              id="theme-toggle"
              type="button"
              className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              onClick={onThemeToggle}>
              <svg
                id="theme-toggle-dark-icon"
                className="hidden h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                className="hidden h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"></path>
              </svg>
            </button>
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
          <div className="bar bg-gray-900 dark:bg-white"></div>
          <div className="bar bg-gray-900 dark:bg-white"></div>
          <div className="bar bg-gray-900 dark:bg-white"></div>
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
