import { Header } from './styles'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Navigation() {
  const locale = useLocale()
  return (
    <Header>
      <nav className="nav container">
        <Link href={'/sub'} locale={locale}>
          LOGO
        </Link>
      </nav>
    </Header>
  )
}
