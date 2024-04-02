'use client'

import Link from 'next/link'
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
        <Link href={'/sub'} locale={locale} className="nav-logo">
          LOGO
        </Link>

        <div className="nav-menu">
          <div className="nav-mobile-profile">
            <div>
              <span>login</span>
              <span>register</span>
            </div>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Page1
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Page2
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Page3
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Page4
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Page5
              </Link>
            </li>
          </ul>
          {/* <div className="nav-close">&#x2715;</div> */}
        </div>

        <div className="nav-pc-profile">
          <div>
            <span>login</span>
            <span>register</span>
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
