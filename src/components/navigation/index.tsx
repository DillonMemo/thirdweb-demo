'use client'

import CommonButton from '../CommonButton.component'
import Image from 'next/image'
import Language from '../../../public/svgs/Language'
import Link from 'next/link'
import Logo from '../../../public/images/logo.png'
import { Navigate } from './styles'
import { useCallback } from 'react'
import { useLocale } from 'next-intl'

export default function Navigation() {
  const locale = useLocale()

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
            <div>login</div>
            <div>register</div>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                <CommonButton fontSize={'1rem'} fontWeight={300} color="var(--text-color)">
                  HOME
                </CommonButton>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                MATCHES
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                TOURNAMENTS
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                TEAMS
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                WATCHLIST
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                LEADERBOARDS
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sub" className="nav-link">
                REWARDS
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-pc-profile">
          <div className="translate-wrap">
            <Language width="1.25rem" height="1.25rem" />
            <span>English</span>
          </div>
          <div className="profile-wrap">
            <CommonButton isBorder>Login</CommonButton>
          </div>
        </div>
        <div className="nav-toggle hamburger" onClick={onToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </Navigate>
  )
}
