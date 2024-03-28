import { Fragment } from 'react'
import Header from '@/components/header'
import Slider from '@/components/Slider'
import styles from './page.module.css'

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <Slider />
      </main>
    </Fragment>
  )
}
