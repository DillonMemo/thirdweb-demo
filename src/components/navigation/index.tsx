'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'
import CustomConnectWallet from '../CustomConnectWallet.component'
import Image from 'next/image'
import Language from '../../../public/svgs/Language'
import Link from 'next/link'
import { LocaleType } from '@/i18n'
// import Logo from '../../../public/images/logo.png'
import { Navigate } from './styles'
import NavigationButton from '../NavigationButton.component'
import ThemeToggle from './ThemeToggle.component'
import { createThirdwebClient } from 'thirdweb'
import { useCallback } from 'react'
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

  return (
    <Navigate className="custom-box-shadow dark:custom-box-shadow bg-[#ffffff] dark:bg-[#0d1426]">
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

        <div className="nav-menu md:bg-white dark:md:border-r-[#333b45] dark:md:bg-[#0d1426]">
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
              <div className="close dark:custom"></div>
            </div>
            <div className="nav-mobile-account dark:md:border-b-[#333b45]">
              <div className="flex flex-1 items-center justify-center py-4">
                <CustomConnectWallet
                  client={client}
                  locale={locale}
                  connectButton={{ className: 'connect-wallet-button' }}
                  detailsButton={{ className: 'detail-wallet-button' }}
                />
              </div>
              <div className="flex items-center px-3 dark:md:border-l-[#333b45]">
                <ThemeToggle />
              </div>
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

        <div className="nav-pc-profile dark:custom">
          <div className="translate-pc-wrap text-gray-900 dark:text-white">
            <Language width="1.25rem" height="1.25rem" />
            <span>{locale === 'ja' ? '日本語' : 'English'}</span>
          </div>
          <div>
            <ThemeToggle />
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
